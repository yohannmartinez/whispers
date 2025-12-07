import { supabase } from "../../supabase/client";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

/**
 * Handle oauth for given provider
 * @param provider define with wich provider your gonna make your oauth flow
 */
export const oauthFlow = async (provider: "google" | "apple") => {
  const redirectUrl = "whispers-app://login";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    throw error;
  }

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectUrl
  );

  if (res.type === "success" && res.url) {
    const hash = res.url.split("#")[1] ?? "";
    const params = new URLSearchParams(hash);

    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (access_token && refresh_token) {
      const { error: sessionError } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (sessionError) {
        console.error("setSession error:", sessionError);
        throw sessionError;
      }
    }
  }
};
