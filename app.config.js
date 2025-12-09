import "dotenv/config";

export default {
  expo: {
    name: "whispers-app",
    slug: "whispers-app",
    scheme: "whispers-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.whispers.principal",
      // 👇👇👇 AJOUT IMPORTANT
      usesAppleSignIn: true,
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          "Whispers utilise ta localisation pour te montrer les personnes autour de toi.",
        NSLocationAlwaysAndWhenInUseUsageDescription:
          "Whispers a besoin d'accéder à ta localisation pour proposer des rencontres proches, même lorsque tu utilises d'autres apps.",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.whispers.app",
      permissions: ["ACCESS_COARSE_LOCATION", "ACCESS_FINE_LOCATION"],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "@rnmapbox/maps",
        {
          ios: {
            accessToken: process.env.MAPBOX_ACCESS_TOKEN,
          },
          android: {
            accessToken: process.env.MAPBOX_ACCESS_TOKEN,
          },
        },
      ],
      // 👇👇👇 AJOUT DU PLUGIN
      "expo-apple-authentication",
    ],
    extra: {
      eas: {
        projectId: "9783f005-6eef-42bf-8b0a-ab67f3eecf2c",
      },
      MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    },
  },
};
