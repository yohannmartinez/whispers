import { View } from "react-native";
import Text from "../../../../ui/text";
import GlassButton from "../../../../ui/glass/button";
import { LoadingSpinner } from "../../../../ui/loading/loadingSpinner";
import { Profile } from "../../../../../types/profile";
import { useEffect, useState } from "react";
import { useUpdateProfile } from "../../../../../hooks/api/profile";
import { router } from "expo-router";
import {
  canAskForForegroundPermissionsAgain,
  enableForegroundPermissionsAccess,
  isForegroundLocalisationAccessEnabled,
} from "../../../../../helpers/permissions/localisationPermissions";
import {
  enablePushNotificationsAccess,
  isPushNotificationAccessEnabled,
} from "../../../../../helpers/permissions/pushNotificationsPermissions";
import { useTranslation } from "react-i18next";

export default function AgePreferenceStep({ profile }: { profile: Profile }) {
  const { t } = useTranslation();
  const updateProfile = useUpdateProfile();
  const [loading, setLoading] = useState(false);
  const [canFinish, setCanFinish] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const askPermissions = async () => {
      try {
        const hasLocation = await isForegroundLocalisationAccessEnabled();

        if (!hasLocation) {
          const canAskLocation = await canAskForForegroundPermissionsAgain();

          if (canAskLocation) {
            await enableForegroundPermissionsAccess();
          }
        }

        const hasNotifications = await isPushNotificationAccessEnabled();

        if (!hasNotifications) {
          await enablePushNotificationsAccess();
        }
      } catch (error) {
        console.error("[Unboarding] Permission error:", error);
      } finally {
        if (isMounted) {
          setCanFinish(true);
        }
      }
    };

    askPermissions();

    return () => {
      isMounted = false;
    };
  }, []);

  const finishUnboarding = async () => {
    setLoading(true);

    try {
      await updateProfile.mutateAsync({
        id: profile.id,
        isUnboarded: true,
      });

      router.push("/(protected)/");
    } catch (e) {
      console.error("[Unboarding] Error updating gender:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex flex-col justify-between items-center p-6 flex-1 w-full">
      <View className="justify-center flex-1 items-center gap-4 mt-10">
        <Text
          size="2xl"
          className="font-medium text-white text-center max-w-[350px]"
        >
          {t("unboarding.autorisations.title")}
        </Text>
        <Text
          size="sm"
          className="font-base text-[#888] text-center max-w-[320px]"
        >
          {t("unboarding.autorisations.description")}
        </Text>
      </View>
      <View className="w-full">
        <View className="mb-10 mx-10 flex gap-4 items-center justify-center"></View>
      </View>
      <View className="flex flex-row justify-between w-full gap-4">
        <GlassButton
          onPress={() => finishUnboarding()}
          className="flex-1"
          disabled={!canFinish}
        >
          <View className="flex items-center justify-center py-6">
            <Text className="text-white font-[600]">
              {loading ? <LoadingSpinner /> : t("unboarding.actions.continue")}
            </Text>
          </View>
        </GlassButton>
      </View>
    </View>
  );
}
