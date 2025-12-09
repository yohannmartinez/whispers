import { supabase } from "../../supabase/client";
import type { User } from "@supabase/supabase-js";
import { splitName } from "../profile/name";

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

  const { error: upsertError } = await supabase.from("profiles").upsert(
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
    }
  );

  if (upsertError) {
    console.error("upsert user error:", upsertError);
  }
};
