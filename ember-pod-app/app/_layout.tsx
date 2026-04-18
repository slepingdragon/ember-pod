import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { SessionProvider, useSession } from '@/lib/session';

import '../global.css';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SessionProvider>
      <RootLayoutNav />
    </SessionProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const segments = useSegments();
  const { session, user, loading } = useSession();

  useEffect(() => {
    if (loading) return;

    const top = segments[0]; // '(auth)' | '(onboarding)' | '(tabs)' | undefined

    const isSignedIn = !!session;
    const hasExperience = !!user?.user_metadata?.experience_level;

    if (!isSignedIn && top !== '(auth)') {
      router.replace('/sign-in');
      return;
    }

    if (isSignedIn && !hasExperience && top !== '(onboarding)') {
      router.replace('/experience');
      return;
    }

    if (isSignedIn && hasExperience && (top === '(auth)' || top === '(onboarding)' || top === undefined)) {
      router.replace('/home');
    }
  }, [loading, session, user, segments, router]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#050505' } }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
