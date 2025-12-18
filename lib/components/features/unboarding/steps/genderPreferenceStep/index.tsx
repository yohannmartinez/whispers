import Text from "../../../../ui/text";
import { View } from "react-native";
import GlassButton from "../../../../ui/glass/button";
import { useState } from "react";
import { Profile, ProfilePreferences } from "../../../../../types/profile";
import { LoadingSpinner } from "../../../../ui/loading/loadingSpinner";
import { Gender, GENDERS } from "../../../../../types/gender";
import Octicons from "@expo/vector-icons/Octicons";
import Option from "../../../../ui/option";
import { useTranslation } from "react-i18next";
import { useUpdateProfilePreferences } from "../../../../../hooks/api/profilePreferences";

export default function GenderPreferenceStep({
  setStep,
  profile,
  profilePreferences,
}: {
  setStep: (step: number) => void;
  profile: Profile;
  profilePreferences: ProfilePreferences | null;
}) {
  const { t } = useTranslation();
  const [gender, setGender] = useState<Gender[]>(
    profilePreferences?.gender || []
  );
  const updateProfilePreferences = useUpdateProfilePreferences();
  const [loading, setLoading] = useState(false);
  const hasChoosed = gender.length > 0;

  const options = [
    { value: GENDERS.MALE, label: t(`global.genders.${GENDERS.MALE}`) },
    { value: GENDERS.FEMALE, label: t(`global.genders.${GENDERS.FEMALE}`) },
    {
      value: GENDERS.NON_BINARY,
      label: t(`global.genders.${GENDERS.NON_BINARY}`),
    },
  ];

  const handleSavePreferences = async () => {
    if (hasChoosed) {
      try {
        setLoading(true);

        await updateProfilePreferences.mutateAsync({
          profileId: profile.id,
          gender,
        });

        setStep(4);
      } catch (e) {
        console.error("[Unboarding] Error updating gender:", e);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGenderChange = (value: Gender) => {
    gender.includes(value)
      ? setGender([...gender].filter((el) => el !== value))
      : setGender([...gender, value]);
  };

  return (
    <View className="flex flex-col justify-between items-center p-6 flex-1 w-full">
      <View className="justify-start items-center gap-4 mt-10">
        <Text
          size="2xl"
          className="font-medium text-white text-center max-w-[350px]"
        >
          {t("unboarding.genderPreference.title")}
        </Text>
        <Text
          size="sm"
          className="font-base text-[#888] text-center max-w-[320px]"
        >
          {t("unboarding.genderPreference.description")}
        </Text>
      </View>
      <View className="w-full mb-10 flex gap-4">
        {options.map((option) => (
          <Option
            key={option.value}
            option={option}
            isSelected={gender.includes(option.value)}
            onPress={() => handleGenderChange(option.value)}
            className=""
          />
        ))}
      </View>
      <View className="flex flex-row justify-between w-full gap-4">
        <GlassButton onPress={() => setStep(2)}>
          <View className="flex items-center justify-center py-6 aspect-square">
            <Octicons name="chevron-left" color="white" size={19} />
          </View>
        </GlassButton>
        <GlassButton
          onPress={() => handleSavePreferences()}
          className="flex-1"
          disabled={!hasChoosed}
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
