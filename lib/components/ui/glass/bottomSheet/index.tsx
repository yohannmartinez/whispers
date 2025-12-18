import React from "react";
import { StyleSheet, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import GlassSheetBackground from "./background";
import GlassButton from "../button";
import { AntDesign } from "@expo/vector-icons";

interface GlassBottomSheetProps {
  children: React.ReactNode;
  backgroundBlur?: number;
  sheetRef: React.Ref<BottomSheetMethods>;
  radius?: number;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export default function GlassBottomSheet({
  children,
  sheetRef,
  radius,
  backgroundBlur,
  onClose,
  showCloseButton = false,
}: GlassBottomSheetProps) {
  const insets = useSafeAreaInsets();

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={["100%"]}
      enablePanDownToClose
      topInset={insets.top + 10}
      enableDynamicSizing={false}
      onClose={onClose}
      backgroundStyle={{
        backgroundColor: "transparent",
      }}
      handleIndicatorStyle={{ backgroundColor: "#AAAAAA", width: 50 }}
      backgroundComponent={(props) => (
        <>
          <GlassSheetBackground
            {...props}
            radius={radius || 30}
            backgroundBlur={backgroundBlur}
          />
          {showCloseButton && (
            <GlassButton
              className="absolute top-5 right-5 z-[10]"
              onPress={onClose}
            >
              <View className="p-4 flex justify-center items-center">
                <AntDesign name="close" size={24} color="white" />
              </View>
            </GlassButton>
          )}
        </>
      )}
    >
      {children}
      <View style={{ height: insets.bottom }} />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
