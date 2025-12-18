import Text from "../../../../ui/text";
import { View } from "react-native";
import GlassButton from "../../../../ui/glass/button";
import { useState } from "react";
import { Profile, ProfilePreferences } from "../../../../../types/profile";
import { LoadingSpinner } from "../../../../ui/loading/loadingSpinner";
import Octicons from "@expo/vector-icons/Octicons";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useUpdateProfilePreferences } from "../../../../../hooks/api/profilePreferences";
import { useTranslation } from "react-i18next";

export default function AgePreferenceStep({
  setStep,
  profile,
  profilePreferences,
}: {
  setStep: (step: number) => void;
  profile: Profile;
  profilePreferences: ProfilePreferences | null;
}) {
  const { t } = useTranslation();
  const [ageRange, setAgeRange] = useState<number[]>([
    profilePreferences?.minAge || 18,
    profilePreferences?.maxAge || 99,
  ]);
  const updateProfilePreferences = useUpdateProfilePreferences();
  const [loading, setLoading] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(0);
  const handleSavePreferences = async () => {
    try {
      setLoading(true);

      await updateProfilePreferences.mutateAsync({
        profileId: profile.id,
        minAge: ageRange[0],
        maxAge: ageRange[1],
      });

      setStep(3);
    } catch (e) {
      console.error("[Unboarding] Error updating gender:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex flex-col justify-between items-center p-6 flex-1 w-full">
      <View className="justify-start items-center gap-4 mt-10">
        <Text
          size="2xl"
          className="font-medium text-white text-center max-w-[350px]"
        >
          {t("unboarding.agePreference.title")}
        </Text>
        <Text
          size="sm"
          className="font-base text-[#888] text-center max-w-[320px]"
        >
          {t("unboarding.agePreference.description")}
        </Text>
      </View>
      <View className="w-full">
        <View
          className="mb-10 mx-10 flex gap-4 items-center justify-center"
          onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
        >
          <View className="flex flex-row w-full justify-between">
            <Text className="text-white font-semibold text-[40px]">
              {ageRange[0]}
            </Text>
            <Text className="text-white font-semibold text-[40px]">
              {ageRange[1]}
            </Text>
          </View>
          <MultiSlider
            values={ageRange}
            min={18}
            max={99}
            step={1}
            onValuesChange={setAgeRange}
            snapped
            sliderLength={sliderWidth}
            selectedStyle={{
              backgroundColor: "white",
            }}
          />
        </View>
      </View>
      <View className="flex flex-row justify-between w-full gap-4">
        <GlassButton onPress={() => setStep(1)}>
          <View className="flex items-center justify-center py-6 aspect-square">
            <Octicons name="chevron-left" color="white" size={19} />
          </View>
        </GlassButton>
        <GlassButton onPress={() => handleSavePreferences()} className="flex-1">
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
