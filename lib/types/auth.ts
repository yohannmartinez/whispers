import { Session } from "@supabase/supabase-js";

export type AuthContextValue = {
  session: Session | null;
  isReady: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
};

/**
 * Enumeration of possible providers for oauth flow
 */
export const OAUTH_PROVIDERS = {
  GOOGLE: "google",
  APPLE: "apple",
} as const;

/**
 * Union type derived from EPISODE_STATUS values, used for strict typing.
 */
export type OAuthProviders =
  (typeof OAUTH_PROVIDERS)[keyof typeof OAUTH_PROVIDERS];
