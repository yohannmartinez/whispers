import { ActivityIndicator, View } from "react-native";

export function LoadingSpinner() {
  return (
    <View className="flex-row items-center justify-center">
      <ActivityIndicator />
    </View>
  );
}
