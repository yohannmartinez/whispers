import { supabase } from "../../supabase/client";
import { Profile } from "../../types/profile";

/**
 * Retrieve profile by ID.
 * @param profileId ID of the profile to retrieve.
 * @returns Profile object or null if not found.
 */
export async function getProfile(profileId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", profileId)
    .maybeSingle();

  if (error) {
    console.error("Error retrieving profile:", error);
    throw error;
  }

  return data as Profile | null;
}

/**
 * Update profile by ID.
 * @param profileId ID of the profile to update.
 * @param payload Partial profile data to update.
 * @returns Updated Profile object or null if not found.
 */
export async function updateProfile(
  profileId: string,
  payload: Partial<Profile>
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", profileId)
    .select("*")
    .maybeSingle();

  if (error) {
    console.error("Error updating profile:", error);
    throw error;
  }

  return data as Profile | null;
}
