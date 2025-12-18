import * as ImagePicker from "expo-image-picker";

/**
 * Opens the device image library and lets the user pick one or multiple images.
 *
 * @param allowsMultipleSelection - Whether the user can select multiple images (default: false)
 * @param quality - Image compression quality between 0 and 1 (default: 0.9)
 * @param allowsEditing - Whether the user can crop/edit the image before validation (disabled in multiple selection)
 * @param aspect - ratio of the picture (disabled in multiple selection)
 *
 * @returns An array of selected ImagePicker assets, or null if the user cancels
 */
export async function pickImages({
  allowsMultipleSelection,
  quality,
  allowsEditing,
  aspect,
}: {
  allowsMultipleSelection?: boolean;
  quality?: number;
  allowsEditing?: boolean;
  aspect?: [number, number];
}): Promise<ImagePicker.ImagePickerAsset[] | null> {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsMultipleSelection: allowsMultipleSelection || false,
    quality: quality || 0.9,
    exif: false,
    allowsEditing: allowsMultipleSelection ? false : allowsEditing || false,
    aspect:
      !allowsMultipleSelection && allowsEditing && aspect ? aspect : [1, 1],
  });

  if (result.canceled) return null;

  return result.assets;
}
