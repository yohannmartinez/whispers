import { View, Text, Pressable } from "react-native";
import { useAuth } from "../../lib/contexts/auth";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const { signOut } = useAuth();
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl mb-4">{t("welcome")}</Text>
      <Pressable onPress={signOut} className="bg-red-500 px-4 py-2 rounded">
        <Text className="text-white">{t("logout")}</Text>
      </Pressable>
    </View>
  );
}
