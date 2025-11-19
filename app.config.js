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
      usesAppleSignIn: true,
      bundleIdentifier: "com.whispers.app",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.whispers.app",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "9783f005-6eef-42bf-8b0a-ab67f3eecf2c",
      },
    },
  },
};
