import Text from "../../../../ui/text";
import { View } from "react-native";
import GlassButton from "../../../../ui/glass/button";
import { useState } from "react";
import { Profile } from "../../../../../types/profile";
import { useUpdateProfile } from "../../../../../hooks/api/profile";
import { LoadingSpinner } from "../../../../ui/loading/loadingSpinner";
import { Gender, GENDERS } from "../../../../../types/gender";
import Octicons from "@expo/vector-icons/Octicons";
import Option from "../../../../ui/option";
import { useTranslation } from "react-i18next";

export default function ProfileGenderStep({
  setStep,
  profile,
}: {
  setStep: (step: number) => void;
  profile: Profile;
}) {
  const { t } = useTranslation();
  const [gender, setGender] = useState<Gender | null>(profile.gender || null);
  const [canGoNextStep, setCanGoNextStep] = useState(
    profile.gender ? true : false
  );
  const updateProfile = useUpdateProfile();
  const [loading, setLoading] = useState(false);

  const options = [
    { value: GENDERS.MALE, label: t(`global.genders.${GENDERS.MALE}`) },
    { value: GENDERS.FEMALE, label: t(`global.genders.${GENDERS.FEMALE}`) },
    {
      value: GENDERS.NON_BINARY,
      label: t(`global.genders.${GENDERS.NON_BINARY}`),
    },
  ];

  const handleSaveGender = async () => {
    if (canGoNextStep && gender) {
      try {
        setLoading(true);

        await updateProfile.mutateAsync({
          id: profile.id,
          gender,
        });

        setStep(2);
      } catch (e) {
        console.error("[Unboarding] Error updating gender:", e);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGenderChange = (value: Gender) => {
    setGender(value);
    setCanGoNextStep(true);
  };

  return (
    <View className="flex flex-col justify-between items-center p-6 flex-1 w-full">
      <View className="justify-start items-center gap-4 mt-10">
        <Text
          size="2xl"
          className="font-medium text-white text-center max-w-[350px]"
        >
          {t("unboarding.profileGender.title")}
        </Text>
        <Text
          size="sm"
          className="font-base text-[#888] text-center max-w-[320px]"
        >
          {t("unboarding.profileGender.description")}
        </Text>
      </View>
      <View className="w-full mb-10 flex gap-4">
        {options.map((option) => (
          <Option
            key={option.value}
            option={option}
            isSelected={gender === option.value}
            onPress={() => handleGenderChange(option.value)}
            className=""
          />
        ))}
      </View>
      <View className="flex flex-row justify-between w-full gap-4">
        <GlassButton onPress={() => setStep(0)}>
          <View className="flex items-center justify-center py-6 aspect-square">
            <Octicons name="chevron-left" color="white" size={19} />
          </View>
        </GlassButton>
        <GlassButton
          disabled={!gender}
          onPress={() => handleSaveGender()}
          className="flex-1"
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
