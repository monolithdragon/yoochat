import { Slot, SplashScreen, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
	Inter_300Light,
	Inter_400Regular,
	Inter_500Medium,
	Inter_700Bold,
	useFonts,
} from '@expo-google-fonts/inter';
import AuthProvider from 'services/providers/auth';
import { useAuth } from 'hooks/useAuth';

SplashScreen.preventAutoHideAsync();

function MainLayout() {
	const { isAuthenticated } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		const inApp = segments[0] == '(app)';

		if (isAuthenticated && !inApp) {
			router.replace('/chats');
		} else if (!isAuthenticated) {
			router.replace('/signin');
		}
	}, [isAuthenticated]);

	return <Slot />;
}

export default function RootLayout() {
	const [loaded, error] = useFonts({
		Inter_300Light,
		Inter_400Regular,
		Inter_500Medium,
		Inter_700Bold,
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

	return (
		<SafeAreaProvider>
			<AuthProvider>
				<MainLayout />
			</AuthProvider>
		</SafeAreaProvider>
	);
}
