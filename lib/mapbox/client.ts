import Mapbox from "@rnmapbox/maps";
import Constants from "expo-constants";

const token =
  Constants.expoConfig?.extra?.MAPBOX_ACCESS_TOKEN ??
  process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ??
  "";

if (!token) {
  console.warn("[Mapbox] no token. Map can't run");
} else {
  try {
    Mapbox.setAccessToken(token);
  } catch (e) {
    console.error("[Mapbox] Error while initialization:", e);
  }
}
