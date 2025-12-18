import { supabase } from "../../supabase/client";
import type { User } from "@supabase/supabase-js";
import { splitName } from "../profile/name";
import { RELATION_TYPES } from "../../types/relationType";

/**
 * Sync user table from session
 * @param user user to create/update
 */
export const syncUserProfile = async (user: User) => {
  const { id, email, user_metadata } = user;

  const fullName =
    user_metadata?.full_name ??
    user_metadata?.name ??
    `${user_metadata?.given_name ?? ""} ${
      user_metadata?.family_name ?? ""
    }`.trim();

  const { firstname, lastname } = splitName(fullName);
  const now = new Date().toISOString();

  const { error: upsertProfileError } = await supabase.from("profiles").upsert(
    {
      id,
      email,
      firstname,
      lastname,
      bio: "",
      isIncognito: false,
      lastActiveAt: now,
      updatedAt: now,
    },
    {
      onConflict: "id",
      ignoreDuplicates: true,
    }
  );

  if (upsertProfileError) {
    console.error("upsert profile error:", upsertProfileError);
  }

  const { error: upsertPreferencesError } = await supabase
    .from("profilePreferences")
    .upsert(
      {
        profileId: id,
        minAge: 18,
        maxAge: 99,
        createdAt: now,
        updatedAt: now,
        relationType: [RELATION_TYPES.CASUAL, RELATION_TYPES.SERIOUS],
        gender: [],
      },
      {
        onConflict: "profileId",
        ignoreDuplicates: true,
      }
    );

  if (upsertPreferencesError) {
    console.error("upsert profile preferences error:", upsertPreferencesError);
  }
};
