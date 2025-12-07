import * as ImagePicker from "expo-image-picker";

export async function isGalleryAccessEnabled(): Promise<boolean> {
  const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

  return status === ImagePicker.PermissionStatus.GRANTED;
}

export async function canAskForGalleryAccessAgain(): Promise<boolean> {
  const { canAskAgain } = await ImagePicker.getMediaLibraryPermissionsAsync();

  return canAskAgain;
}

export async function enableGalleryAccess(): Promise<boolean> {
  const { status: newStatus } =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  return newStatus === ImagePicker.PermissionStatus.GRANTED;
}
