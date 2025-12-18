import { supabase } from "../../supabase/client";
import { ProfilePreferences } from "../../types/profile";

/**
 * Retrieve profile preferences by ID.
 * @param profileId ID of the profile.
 * @returns Profile preferences object or null if not found.
 */
export async function getProfilePreferences(
  profileId: string
): Promise<ProfilePreferences | null> {
  const { data, error } = await supabase
    .from("profilePreferences")
    .select("*")
    .eq("profileId", profileId)
    .maybeSingle();

  if (error) {
    console.error("Error retrieving profile preferences:", error);
    throw error;
  }

  return data as ProfilePreferences | null;
}

/**
 * Update profile preferences by ID.
 * @param profileId ID of the profile.
 * @param payload Partial profile preferences data to update.
 * @returns Profile preferences object or null if not found.
 */
export async function updateProfilePreferences(
  profileId: string,
  payload: Partial<ProfilePreferences>
): Promise<ProfilePreferences | null> {
  const { data, error } = await supabase
    .from("profilePreferences")
    .update({
      profileId,
      updatedAt: new Date().toISOString(),
      ...payload,
    })
    .eq("profileId", profileId)
    .select("*")
    .maybeSingle();

  if (error || !data) {
    console.error("Error updating profile preferences:", error);
    throw error;
  }

  return data as ProfilePreferences | null;
}
