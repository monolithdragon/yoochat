import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AuthProvider } from '@/services/providers/auth/insex';
import '@/global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [loaded] = useFonts({
    'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Light': require('@/assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name='index'
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='(auth)'
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='(root)'
            options={{ headerShown: false }}
          />
          <Stack.Screen name='+not-found' />
        </Stack>
        <StatusBar hidden />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
