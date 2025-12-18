import { Redirect, Stack, useSegments } from "expo-router";
import { useProfile } from "../../lib/hooks/api/profile";
import { useAuth } from "../../lib/hooks/auth";
import LoadingScreen from "../../lib/components/ui/loading/loadingScreen";

export default function ProtectedLayout() {
  const segments = useSegments();
  const { session } = useAuth();

  const {
    data: profile,
    isLoading: profileLoading,
    error: profileFetchError,
  } = useProfile(session?.user.id);

  if (profileLoading || !profile || profileFetchError) return <LoadingScreen />;

  const isOnUnboardingPage =
    segments.includes("(unboarding)") && segments.includes("unboarding");

  if (!profile.isUnboarded && !isOnUnboardingPage) {
    return <Redirect href="/(protected)/(unboarding)/unboarding" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    />
  );
}
