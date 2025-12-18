import Text from "../../../../ui/text";
import DateInput from "../../../../ui/dateInput";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import GlassButton from "../../../../ui/glass/button";
import { useState } from "react";
import { Profile } from "../../../../../types/profile";
import { useUpdateProfile } from "../../../../../hooks/api/profile";
import { LoadingSpinner } from "../../../../ui/loading/loadingSpinner";
import { useTranslation } from "react-i18next";

export default function BirthDateStep({
  setStep,
  profile,
}: {
  setStep: (step: number) => void;
  profile: Profile;
}) {
  const { t } = useTranslation();
  const [birthdate, setBirthdate] = useState<string | null>(
    profile.birthdate || null
  );
  const [canGoNextStep, setCanGoNextStep] = useState(false);
  const updateProfile = useUpdateProfile();
  const [loading, setLoading] = useState(false);

  const handleSaveBirthDate = async () => {
    if (canGoNextStep && birthdate) {
      try {
        setLoading(true);

        await updateProfile.mutateAsync({
          id: profile.id,
          birthdate,
        });

        setStep(1);
      } catch (e) {
        console.error("[Unboarding] Error updating birthdate:", e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View className="flex flex-col justify-between items-center p-6 flex-1 w-full">
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={Keyboard.dismiss}
      ></Pressable>
      <View className="justify-start items-center gap-4 mt-10">
        <Text
          size="2xl"
          className="font-medium text-white text-center max-w-[350px]"
        >
          {t("unboarding.birthday.title")}
        </Text>
        <Text
          size="sm"
          className="font-base text-[#888] text-center max-w-[320px]"
        >
          {t("unboarding.birthday.description")}
        </Text>
      </View>
      <View className="px-10 w-full mb-10">
        <DateInput
          defaultValue={birthdate || undefined}
          onComplete={(e) => {
            Keyboard.dismiss();
          }}
          maxYear={new Date().getFullYear()}
          onChange={(value, isValid) => {
            const formattedDate = `${value.year}-${value.month.padStart(
              2,
              "0"
            )}-${value.day.padStart(2, "0")}`;
            setBirthdate(formattedDate);
            setCanGoNextStep(isValid);
          }}
        />
      </View>
      <GlassButton
        disabled={!canGoNextStep}
        onPress={() => handleSaveBirthDate()}
        className="w-full"
      >
        <View className="flex items-center justify-center py-6">
          <Text className="text-white font-[600]">
            {loading ? <LoadingSpinner /> : t("unboarding.actions.continue")}
          </Text>
        </View>
      </GlassButton>
    </View>
  );
}
