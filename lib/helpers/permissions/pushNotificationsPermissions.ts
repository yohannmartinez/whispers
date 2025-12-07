import * as Notifications from "expo-notifications";

export async function isPushNotificationAccessEnabled(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  return existingStatus === Notifications.PermissionStatus.GRANTED;
}

export async function enablePushNotificationsAccess(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();

  return status === Notifications.PermissionStatus.GRANTED;
}
