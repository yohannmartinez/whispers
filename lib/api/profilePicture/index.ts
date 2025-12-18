import type * as ImagePicker from "expo-image-picker";
import { supabase } from "../../supabase/client";
import { ProfilePicture } from "../../types/profile";

/**
 * Get all profile pictures for a given profile id.
 * @param profileId ID of the profile the pictures belong to.
 * @returns A promise that resolve the pictures
 */
export async function getProfilePictures(
  profileId: string
): Promise<ProfilePicture[] | null> {
  const { data, error } = await supabase
    .from("profilePictures")
    .select("*")
    .eq("profileId", profileId);

  if (error) {
    console.error("Error retrieving profile pictures:", error);
    throw error;
  }

  return data as ProfilePicture[] | null;
}

/**
 * Upload picture in storage from a given user id.
 * @param profileId ID of the profile the image belong to.
 * @param asset The image
 * @returns A promise that resolve into the path and the public url
 */
export async function uploadProfilePictureToPublicBucket({
  profileId,
  asset,
}: {
  profileId: string;
  asset: ImagePicker.ImagePickerAsset;
}): Promise<{ path: string; publicUrl: string }> {
  const ext =
    asset.mimeType?.split("/")[1] ?? asset.fileName?.split(".").pop() ?? "jpg";

  const fileName = `${Date.now()}.${ext}`;
  const path = `profiles/${profileId}/${fileName}`;

  const formData = new FormData();
  formData.append("file", {
    uri: asset.uri,
    name: fileName,
    type: asset.mimeType ?? "image/jpeg",
  } as any);

  const { data, error } = await supabase.storage
    .from("profile-pictures")
    .upload(path, formData, {
      contentType: asset.mimeType ?? "image/jpeg",
      upsert: true,
    });

  if (error) throw error;

  const { data: pub } = supabase.storage
    .from("profile-pictures")
    .getPublicUrl(data.path);

  return { path: data.path, publicUrl: pub.publicUrl };
}

/**
 * Delete a profile picture from storage.
 * @param path Full path of the image in the bucket (ex: profiles/{profileId}/{filename})
 */
export async function deleteProfilePictureFromPublicBucket(
  path: string
): Promise<void> {
  const { error } = await supabase.storage
    .from("profile-pictures")
    .remove([path]);

  if (error) {
    console.error("Error deleting profile picture:", error);
    throw error;
  }
}

/**
 * Add a picture to the profile picture table
 * @param profileId ID of the profile the image belong to.
 * @param imageUrl Url of the image
 * @param IsPrimary Image should be the primary one of the profile
 * @returns A promise that resolve into the profile picture or null if there is an error
 */
export async function addProfilePicture(
  profileId: string,
  imageUrl: string,
  isPrimary: boolean
): Promise<ProfilePicture | null> {
  if (isPrimary) {
    const { error: unsetError } = await supabase
      .from("profilePictures")
      .update({ isPrimary: false })
      .eq("profileId", profileId)
      .eq("isPrimary", true);

    if (unsetError) throw unsetError;
  }

  const { data, error } = await supabase
    .from("profilePictures")
    .insert({ profileId, imageUrl, isPrimary })
    .select("*")
    .single();

  if (error) throw error;

  return data as ProfilePicture;
}

/**
 * Delete a profile picture and ensure a new primary one exists if needed
 * @param profileId ID of the profile the image belong to.
 * @param pictureId Id of the image to delete
 * @returns A promise that resolve into void
 */
export async function deleteProfilePicture(
  pictureId: string,
  profileId: string
): Promise<void> {
  const { data: picture, error: fetchError } = await supabase
    .from("profilePictures")
    .select("*")
    .eq("id", pictureId)
    .single();

  if (fetchError) throw fetchError;

  const { error: deleteError } = await supabase
    .from("profilePictures")
    .delete()
    .eq("id", pictureId);

  if (deleteError) throw deleteError;

  if (picture.isPrimary) {
    const { data: remaining } = await supabase
      .from("profilePictures")
      .select("id")
      .eq("profileId", profileId)
      .limit(1)
      .maybeSingle();

    if (remaining) {
      await supabase
        .from("profilePictures")
        .update({ isPrimary: true })
        .eq("id", remaining.id);
    }
  }
}

/**
 * Update profile picture to set a new favorite one
 * @param profileId ID of the profile the image belong to.
 * @param pictureId Id of the image to set as favorite
 */
export async function setNewFavoriteProfilePicture(
  pictureId: string,
  profileId: string
): Promise<void> {
  const { error: resetError } = await supabase
    .from("profilePictures")
    .update({ isPrimary: false })
    .eq("profileId", profileId);

  if (resetError) {
    console.error("Error resetting primary pictures:", resetError);
    throw resetError;
  }

  const { error: setError } = await supabase
    .from("profilePictures")
    .update({ isPrimary: true })
    .eq("id", pictureId)
    .eq("profileId", profileId);

  if (setError) {
    console.error("Error setting new primary picture:", setError);
    throw setError;
  }
}
