import { Slot, Redirect, useSegments } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { AuthProvider } from "../lib/contexts/auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "../lib/hooks/auth";
import "../global.css";
import "../lib/i18n";
import "../lib/mapbox/client";
import "react-native-gesture-handler";
import "expo-router/entry";

const client = new QueryClient();

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

  const isProtectedRoute = segments[0] === "(protected)";
  const isUnauthenticatedRoute = segments[0] === "(unauth)";

  if (!session && !isUnauthenticatedRoute) {
    return <Redirect href="/(unauth)/login" />;
  }

  if (session && !isProtectedRoute) {
    return <Redirect href="/(protected)" />;
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <QueryClientProvider client={client}>
        <AuthProvider>
          <SafeAreaProvider>
            <AuthGate />
          </SafeAreaProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
