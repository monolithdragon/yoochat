export default {
  expo: {
    name: 'YooChat',
    slug: 'yoochat',
    version: '1.0.0',
    description: 'A real-time chat application built with Expo.',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'yoochat',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      package: 'com.yoozone.yoochat',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
      '@react-native-firebase/app',
      '@react-native-firebase/auth',
      '@react-native-firebase/crashlytics',
      'expo-secure-store',
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: 'a6f6fe9f-aa34-4b0b-87c1-0fe8ee39d0f4',
      },
    },
    owner: 'monolithdragon',
  },
};
