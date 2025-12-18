import { View, Text, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import {
  enableForegroundPermissionsAccess,
  isForegroundLocalisationAccessEnabled,
} from "../../lib/helpers/permissions/localisationPermissions";
import {
  enableGalleryAccess,
  isGalleryAccessEnabled,
} from "../../lib/helpers/permissions/galleryPermissions";
import {
  enablePushNotificationsAccess,
  isPushNotificationAccessEnabled,
} from "../../lib/helpers/permissions/pushNotificationsPermissions";
import { router } from "expo-router";
import { useAuth } from "../../lib/hooks/auth";

export default function HomeScreen() {
  const { signOut, session } = useAuth();
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl mb-4">{t("welcome")}</Text>

      <Pressable
        onPress={async () => router.push("/map")}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        <Text className="text-white">go sur la map</Text>
      </Pressable>

      <Pressable
        onPress={async () => console.log("session:", session)}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        <Text className="text-white">log session</Text>
      </Pressable>

      <Pressable
        onPress={() => enableGalleryAccess()}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        <Text className="text-white">autoriser gallerie</Text>
      </Pressable>

      <Pressable
        onPress={async () => console.log(await isGalleryAccessEnabled())}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        <Text className="text-white">test gallerie</Text>
      </Pressable>

      <Pressable
        onPress={() => enablePushNotificationsAccess()}
        className="bg-green-500 px-4 py-2 rounded"
      >
        <Text className="text-white">autoriser notif</Text>
      </Pressable>

      <Pressable
        onPress={async () =>
          console.log(await isPushNotificationAccessEnabled())
        }
        className="bg-green-500 px-4 py-2 rounded"
      >
        <Text className="text-white">test notif</Text>
      </Pressable>

      <Pressable
        onPress={() => enableForegroundPermissionsAccess()}
        className="bg-red-500 px-4 py-2 rounded"
      >
        <Text className="text-white">autoriser localisation</Text>
      </Pressable>

      <Pressable
        onPress={async () =>
          console.log(await isForegroundLocalisationAccessEnabled())
        }
        className="bg-red-500 px-4 py-2 rounded"
      >
        <Text className="text-white">test localisation</Text>
      </Pressable>

      <Pressable onPress={signOut} className="bg-red-500 px-4 py-2 rounded">
        <Text className="text-white">{t("logout")}</Text>
      </Pressable>
    </View>
  );
}
