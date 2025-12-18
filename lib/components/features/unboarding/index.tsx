import { ImageBackground, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import BirthDateStep from "./steps/birthDateStep";
import LoadingScreen from "../../ui/loading/loadingScreen";
import { useProfile } from "../../../hooks/api/profile";
import { useAuth } from "../../../hooks/auth";
import ProfileGenderStep from "./steps/profileGenderStep";
import { useProfilePreferences } from "../../../hooks/api/profilePreferences";
import AgePreferenceStep from "./steps/agePreferenceStep";
import GenderPreferenceStep from "./steps/genderPreferenceStep";
import ProfilePicturesStep from "./steps/profilePicturesStep";
import { useProfilePitcures } from "../../../hooks/api/profilePicture";
import AutorisationStep from "./steps/autorisationsStep";

export default function Unboarding() {
  const { session } = useAuth();
  const insets = useSafeAreaInsets();
  const { data: profile, isLoading: isProfileLoading } = useProfile(
    session?.user.id
  );
  const { data: profilePreferences, isLoading: isProfilePreferencesLoading } =
    useProfilePreferences(session?.user.id);
  const { data: profilePictures, isLoading: isProfilePicturesLoading } =
    useProfilePitcures(session?.user.id);
  const [step, setStep] = useState<number>(0);

  if (
    isProfileLoading ||
    isProfilePreferencesLoading ||
    isProfilePicturesLoading ||
    !profile ||
    profilePreferences === undefined ||
    profilePictures === undefined
  ) {
    return <LoadingScreen />;
  }

  return (
    <View className={`flex-1 bg-[#050505]`}>
      <ImageBackground
        source={require("../../../../assets/gradient-background.avif")}
        resizeMode="cover"
        style={[StyleSheet.absoluteFillObject, { pointerEvents: "none" }]}
      />
      <View style={{ paddingTop: insets.top }}></View>

      {step === 0 && <BirthDateStep setStep={setStep} profile={profile} />}
      {step === 1 && <ProfileGenderStep setStep={setStep} profile={profile} />}
      {step === 2 && (
        <AgePreferenceStep
          setStep={setStep}
          profile={profile}
          profilePreferences={profilePreferences}
        />
      )}
      {step === 3 && (
        <GenderPreferenceStep
          setStep={setStep}
          profile={profile}
          profilePreferences={profilePreferences}
        />
      )}
      {step === 4 && (
        <ProfilePicturesStep
          setStep={setStep}
          profile={profile}
          profilePictures={profilePictures}
        />
      )}
      {step === 5 && <AutorisationStep profile={profile} />}
    </View>
  );
}
