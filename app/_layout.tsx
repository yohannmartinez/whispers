import { Slot, Redirect, useSegments } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import "../global.css";
import { AuthProvider, useAuth } from "../lib/contexts/auth";

function AuthGate() {
  const { session, isReady } = useAuth();
  const segments = useSegments();

  if (!isReady) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
      </View>
    );
  }

  const inTabsGroup = segments[0] === "(tabs)";
  const inLogin = segments[0] === "login";

  if (!session && !inLogin) {
    return <Redirect href="/login" />;
  }

  if (session && !inTabsGroup) {
    return <Redirect href="/(tabs)" />;
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}
