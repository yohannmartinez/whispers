import { View } from "react-native";
import { LoadingSpinner } from "../loadingSpinner";

export default function LoadingScreen({}: {}) {
  return (
    <View className="flex-1 bg-black items-center justify-center">
      <LoadingSpinner />
    </View>
  );
}
