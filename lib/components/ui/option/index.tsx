import { Pressable, View } from "react-native";
import Text from "../text";

export default function Option({
  option,
  isSelected,
  onPress,
  className,
}: {
  option: { value: string; label: string };
  isSelected: boolean;
  onPress: (value: string) => void;
  className?: string;
}) {
  return (
    <Pressable
      onPress={() => onPress(option.value)}
      className={`
        p-4 rounded-xl flex flex-row items-center gap-4
        border ${isSelected ? "border-white" : "border-gray-400"}
        ${className ?? ""}
      `}
    >
      <View
        className={`
          w-6 h-6 rounded-full flex items-center justify-center
          border ${isSelected ? "border-white" : "border-gray-400"}
        `}
      >
        {isSelected && <View className="w-3 h-3 rounded-full bg-white" />}
      </View>

      <Text className={`text-white font-medium`}>{option.label}</Text>
    </Pressable>
  );
}
