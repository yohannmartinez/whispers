import { supabase } from "../../supabase/client";
import type { User } from "@supabase/supabase-js";

/**
 * Sync user table from session
 * @param user user to create/update
 */
export const syncUserProfile = async (user: User) => {
  const { id, email, user_metadata } = user;

  const full_name = user_metadata?.full_name ?? user_metadata?.name ?? "";

  const avatar_url =
    user_metadata?.avatar_url ?? user_metadata?.picture ?? null;

  const { error: upsertError } = await supabase.from("users").upsert(
    {
      id,
      email,
      full_name,
      avatar_url,
    },
    { onConflict: "id" }
  );

  if (upsertError) {
    console.error("upsert user error:", upsertError);
  }
};
