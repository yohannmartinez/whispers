import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { useAuth } from "../lib/contexts/auth";

export default function LoginScreen() {
  const { signInWithGoogle, signInWithApple, isReady, session } = useAuth();
  const [loadingProvider, setLoadingProvider] = useState<
    null | "google" | "apple"
  >(null);

  if (!isReady || session) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
      </View>
    );
  }

  const handleGoogle = async () => {
    setLoadingProvider("google");
    try {
      await signInWithGoogle();
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleApple = async () => {
    setLoadingProvider("apple");
    try {
      await signInWithApple();
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Pressable
        onPress={handleGoogle}
        disabled={loadingProvider !== null}
        className="bg-blue-500 px-6 py-3 rounded-lg w-full max-w-xs mb-4"
      >
        {loadingProvider === "google" ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-semibold">
            Continuer avec Google
          </Text>
        )}
      </Pressable>

      <Pressable
        onPress={handleApple}
        disabled={loadingProvider !== null}
        className="bg-black px-6 py-3 rounded-lg w-full max-w-xs mb-4"
      >
        {loadingProvider === "apple" ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-semibold">
            Continuer avec Apple
          </Text>
        )}
      </Pressable>
    </View>
  );
}
