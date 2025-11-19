import { View, Text, Pressable } from "react-native";
import { useAuth } from "../../lib/contexts/auth";

export default function HomeScreen() {
  const { signOut } = useAuth();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl mb-4">Accueil (logué)</Text>
      <Pressable onPress={signOut} className="bg-red-500 px-4 py-2 rounded">
        <Text className="text-white">Se déconnecter</Text>
      </Pressable>
    </View>
  );
}
