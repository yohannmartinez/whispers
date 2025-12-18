import Text from "../../../../ui/text";
import { Linking, View } from "react-native";
import GlassButton from "../../../../ui/glass/button";
import { useEffect, useState } from "react";
import { Profile, ProfilePicture } from "../../../../../types/profile";
import { LoadingSpinner } from "../../../../ui/loading/loadingSpinner";
import Octicons from "@expo/vector-icons/Octicons";
import {
  canAskForGalleryAccessAgain,
  isGalleryAccessEnabled as checkGalleryAccess,
  enableGalleryAccess,
} from "../../../../../helpers/permissions/galleryPermissions";
import Picture from "./picture";
import AntDesign from "@expo/vector-icons/AntDesign";
import { pickImages } from "../../../../../helpers/gallery";
import {
  deleteProfilePictureFromPublicBucket,
  uploadProfilePictureToPublicBucket,
} from "../../../../../api/profilePicture";
import {
  useAddProfilePictures,
  useDeleteProfilePicture,
  useSetNewFavoriteProfilePicture,
} from "../../../../../hooks/api/profilePicture";
import ImageSlider from "../../../../ui/imageSlider";
import { useTranslation } from "react-i18next";

export default function ProfilePicturesStep({
  setStep,
  profile,
  profilePictures,
}: {
  setStep: (step: number) => void;
  profile: Profile;
  profilePictures: ProfilePicture[] | null;
}) {
  const { t } = useTranslation();
  const [containerWidth, setContainerWidth] = useState(0);
  const addProfilePicture = useAddProfilePictures();
  const deleteProfilePicture = useDeleteProfilePicture();
  const updateFavoritePicture = useSetNewFavoriteProfilePicture();
  const [pictures, setPictures] = useState<ProfilePicture[]>(
    profilePictures || []
  );
  const [loading, setLoading] = useState(false);
  const [isUpdatingPicture, setIsUpdatingPicture] = useState(false);

  const [galleryAccessEnabled, setGalleryAccessEnabled] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const loadGalleryPermission = async () => {
      const enabled = await checkGalleryAccess();
      setGalleryAccessEnabled(enabled);
    };

    loadGalleryPermission();
  }, []);

  useEffect(() => {
    setPictures(profilePictures || []);
  }, [profilePictures]);

  const handlePictureAdd = async () => {
    if (!galleryAccessEnabled) {
      const canAsk = await canAskForGalleryAccessAgain();

      canAsk ? await enableGalleryAccess() : Linking.openSettings();
    }

    const assets = await pickImages({
      allowsMultipleSelection: false,
      allowsEditing: true,
    });
    if (assets) {
      try {
        setIsUpdatingPicture(true);

        const { publicUrl } = await uploadProfilePictureToPublicBucket({
          profileId: profile.id,
          asset: assets[0],
        });

        const profilePicture = await addProfilePicture.mutateAsync({
          profileId: profile.id,
          imageUrl: publicUrl,
          isPrimary: pictures.length === 0,
        });

        if (profilePicture) {
          setPictures([...pictures, profilePicture]);
        }
      } catch {
        console.error("error while adding picture to profile in unboarding");
      } finally {
        setIsUpdatingPicture(false);
      }
    }
  };

  const deletePicture = async (picture: ProfilePicture) => {
    setIsUpdatingPicture(true);
    setPictures((prev) => prev.filter((p) => p.id !== picture.id));

    try {
      await deleteProfilePicture.mutateAsync({
        profileId: profile.id,
        pictureId: picture.id,
      });

      await deleteProfilePictureFromPublicBucket(picture.imageUrl);
    } catch {
      console.error("delete picture failed in unboarding");
    } finally {
      setIsUpdatingPicture(false);
    }
  };

  const setFavoritePicture = async (picture: ProfilePicture) => {
    setIsUpdatingPicture(true);

    try {
      await updateFavoritePicture.mutateAsync({
        profileId: profile.id,
        pictureId: picture.id,
      });
    } catch {
      console.error("set new favorite failed in unboarding");
    } finally {
      setIsUpdatingPicture(false);
    }
  };

  const handleSavePreferences = async () => {
    if (pictures.length > 0) {
      setStep(5);
    }
  };

  return (
    <View className="flex flex-col justify-between items-center p-6 flex-1 w-full">
      <View className="justify-start items-center gap-4 mt-10">
        <Text
          size="2xl"
          className="font-medium text-white text-center max-w-[350px]"
        >
          {t("unboarding.profilePictures.title")}
        </Text>
        <Text
          size="sm"
          className="font-base text-[#888] text-center max-w-[320px]"
        >
          {t("unboarding.profilePictures.description")}
        </Text>
      </View>

      <View className="w-full mb-10 flex flex-col gap-6 px-10">
        {pictures.length === 0 ? (
          <View className="flex justify-center flex-col items-center gap-2">
            <Text className="text-white font-medium text-center" size="xl">
              Vous n'avez aucune photo
            </Text>
            <Text
              size="sm"
              className="text-[#999999] text-center max-w-[320px]"
            >
              Au moins une photo est nécessaire pour continuer
            </Text>
          </View>
        ) : (
          <View onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}>
            <ImageSlider
              images={pictures
                .sort(
                  (picA, picB) =>
                    new Date(picA.createdAt).getTime() -
                    new Date(picB.createdAt).getTime()
                )
                .map((picture) => picture.imageUrl)}
              imageSize={{ width: containerWidth, height: containerWidth }}
            >
              {({ index }) => (
                <Picture
                  picture={pictures[index]}
                  pictures={pictures}
                  deletePicture={deletePicture}
                  setFavoritePicture={setFavoritePicture}
                  isUpdatingPicture={isUpdatingPicture}
                />
              )}
            </ImageSlider>
          </View>
        )}
        <GlassButton className="w-full" onPress={handlePictureAdd}>
          <View className="flex items-center justify-center py-6 w-full flex flex-row gap-2">
            <AntDesign name="plus" size={16} color="white" />
            <Text className="text-white font-[600]">Ajouter une image</Text>
          </View>
        </GlassButton>
      </View>

      <View className="flex flex-row justify-between w-full gap-4">
        <GlassButton onPress={() => setStep(3)}>
          <View className="flex items-center justify-center py-6 aspect-square">
            <Octicons name="chevron-left" color="white" size={19} />
          </View>
        </GlassButton>
        <GlassButton
          disabled={pictures.length === 0}
          onPress={handleSavePreferences}
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
