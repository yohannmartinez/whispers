import * as Location from "expo-location";

export async function isForegroundLocalisationAccessEnabled() {
  const { status } = await Location.getForegroundPermissionsAsync();

  return status === Location.PermissionStatus.GRANTED;
}

export async function canAskForForegroundPermissionsAgain(): Promise<boolean> {
  const { canAskAgain } = await Location.getForegroundPermissionsAsync();

  return canAskAgain;
}

export async function enableForegroundPermissionsAccess(): Promise<boolean> {
  const { status } = await Location.requestForegroundPermissionsAsync();

  return status === Location.PermissionStatus.GRANTED;
}
