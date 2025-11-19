import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import type { Session } from "@supabase/supabase-js";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const redirectUrl = "whispers-app://login";

type AuthContextValue = {
  session: Session | null;
  isReady: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let hasInitial = false;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (!isMounted) return;

      console.log("onAuthStateChange:", event, newSession?.user?.email);
      setSession(newSession);

      if (!hasInitial) {
        hasInitial = true;
        setIsReady(true);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const oauthFlow = async (provider: "google" | "apple") => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl,
        skipBrowserRedirect: true,
      },
    });

    if (error) {
      console.error(`signInWithOAuth ${provider} error:`, error);
      throw error;
    }

    const res = await WebBrowser.openAuthSessionAsync(
      data?.url ?? "",
      redirectUrl
    );

    console.log(`openAuthSessionAsync (${provider}):`, res);

    if (res.type === "success" && res.url) {
      const hash = res.url.split("#")[1] ?? "";
      const params = new URLSearchParams(hash);

      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token") ?? undefined;

      if (access_token) {
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

  const signInWithGoogle = () => oauthFlow("google");
  const signInWithApple = () => oauthFlow("apple");

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ session, isReady, signInWithGoogle, signInWithApple, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
