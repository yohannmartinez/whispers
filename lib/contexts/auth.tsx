import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import type { Session } from "@supabase/supabase-js";
import { AuthContextValue, OAUTH_PROVIDERS } from "../types/auth";
import { oauthFlow } from "../helpers/auth/oAuth";
import { syncUserProfile } from "../helpers/auth/syncUserProfile";

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

      setSession(newSession);

      if (
        (event === "SIGNED_IN" || event === "USER_UPDATED") &&
        newSession?.user
      ) {
        syncUserProfile(newSession.user).catch((err) => {
          console.error("syncUserProfile error:", err);
        });
      }

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

  const signInWithGoogle = () => oauthFlow(OAUTH_PROVIDERS.GOOGLE);
  const signInWithApple = () => oauthFlow(OAUTH_PROVIDERS.APPLE);

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
