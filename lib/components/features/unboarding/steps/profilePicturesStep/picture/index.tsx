import { View } from "react-native";
import { ProfilePicture } from "../../../../../../types/profile";
import GlassButton from "../../../../../ui/glass/button";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Octicons from "@expo/vector-icons/Octicons";

export default function Picture({
  picture,
  pictures,
  deletePicture,
  setFavoritePicture,
  isUpdatingPicture,
}: {
  picture: ProfilePicture;
  pictures: ProfilePicture[];
  deletePicture: (picture: ProfilePicture) => Promise<void>;
  setFavoritePicture: (picture: ProfilePicture) => Promise<void>;
  isUpdatingPicture: boolean;
}) {
  return (
    <View className="absolute py-3 px-3 bottom-0 flex flex-row justify-between gap-3 w-full">
      <GlassButton
        className=""
        onPress={() => setFavoritePicture(picture)}
        disabled={
          pictures.length === 1 || isUpdatingPicture || picture.isPrimary
        }
      >
        <View className="flex items-center justify-center h-15 w-15 flex flex-row gap-2">
          {picture.isPrimary ? (
            <Octicons name="star-fill" size={18} color="white" />
          ) : (
            <Octicons name="star" size={18} color="white" />
          )}
        </View>
      </GlassButton>
      <GlassButton
        className=""
        onPress={() => deletePicture(picture)}
        disabled={isUpdatingPicture}
      >
        <View className="flex items-center justify-center h-15 w-15 flex flex-row gap-2">
          <FontAwesome6 name="trash" size={18} color="white" />
        </View>
      </GlassButton>
    </View>
  );
}
