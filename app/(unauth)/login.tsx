import {
  ActivityIndicator,
  ImageBackground,
  View,
  StyleSheet,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { OAUTH_PROVIDERS, OAuthProviders } from "../../lib/types/auth";
import GlassButton from "../../lib/components/ui/glass/button";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import GlassBottomSheet from "../../lib/components/ui/glass/bottomSheet";
import { useTranslation } from "react-i18next";
import Text from "../../lib/components/ui/text";
import { capitalizeFirstLetter } from "../../lib/helpers/text";
import { useAuth } from "../../lib/hooks/auth";

export default function LoginScreen() {
  const { t } = useTranslation();
  const { signInWithGoogle, signInWithApple, isReady, session } = useAuth();
  const [loadingProvider, setLoadingProvider] = useState<null | OAuthProviders>(
    null
  );

  const sheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (loadingProvider) {
      sheetRef.current?.expand();
    } else {
      sheetRef.current?.close();
    }
  }, [loadingProvider]);

  if (!isReady || session) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
      </View>
    );
  }

  const handleOAuth = async (provider: OAuthProviders | null) => {
    if (provider) {
      try {
        if (provider === OAUTH_PROVIDERS.APPLE) await signInWithApple();
        if (provider === OAUTH_PROVIDERS.GOOGLE) await signInWithGoogle();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <View className="flex-1 bg-[#050505]">
      <ImageBackground
        source={require("../../assets/background.png")}
        resizeMode="cover"
        style={[StyleSheet.absoluteFillObject, { pointerEvents: "none" }]}
      />

      <View className="flex flex-1 items-center justify-end p-10 gap-5">
        <GlassButton
          onPress={() => setLoadingProvider(OAUTH_PROVIDERS.GOOGLE)}
          disabled={loadingProvider !== null}
          className="w-full"
          pressableClassName=""
        >
          <View className="flex items-center justify-center py-6">
            <Text className="text-white font-[600]">
              {t("login.actions.login", {
                provider: capitalizeFirstLetter(OAUTH_PROVIDERS.GOOGLE),
              })}
            </Text>
          </View>
        </GlassButton>
        <GlassButton
          onPress={() => setLoadingProvider(OAUTH_PROVIDERS.APPLE)}
          disabled={loadingProvider !== null}
          className="w-full"
        >
          <View className="flex items-center justify-center py-6">
            <Text className="text-white font-[600]">
              {t("login.actions.login", {
                provider: capitalizeFirstLetter(OAUTH_PROVIDERS.APPLE),
              })}
            </Text>
          </View>
        </GlassButton>
      </View>
      <GlassBottomSheet
        sheetRef={sheetRef}
        backgroundBlur={70}
        radius={50}
        onClose={() => {
          setLoadingProvider(null);
        }}
        showCloseButton
      >
        <BottomSheetScrollView className="border border-red-500">
          <View className="pt-16 p-8 flex flex-col gap-8">
            <Text size="2xl" className="text-white font-[600]">
              {t("termsOfUse.title")}
            </Text>

            <Text size="sm" className="text-white">
              {t("termsOfUse.text")}
            </Text>
          </View>
        </BottomSheetScrollView>
        <View className="mt-6 mx-6">
          <GlassButton
            onPress={async () => {
              handleOAuth(loadingProvider);
              sheetRef.current?.close();
            }}
            className="w-full"
          >
            <View className="flex items-center justify-center p-6">
              <Text className="text-white text-[17px] font-[600] tracking-[-0.4px]">
                {t("termsOfUse.actions.accept")}
              </Text>
            </View>
          </GlassButton>
          <Text size="xs" className="text-white text-center p-4">
            {t("termsOfUse.termsText")}
          </Text>
        </View>
      </GlassBottomSheet>
    </View>
  );
}
