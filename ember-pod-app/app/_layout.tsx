import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';

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
    <SafeAreaProvider>
      <SessionProvider>
        <RootLayoutNav />
      </SessionProvider>
    </SafeAreaProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const segments = useSegments();
  const { session, loading } = useSession();

  useEffect(() => {
    if (loading) return;

    const top = segments[0]; // '(auth)' | '(tabs)' | undefined
    const isSignedIn = !!session;

    // Simplified gate: signed in → tabs, else → sign-in.
    // Any legacy (onboarding) routes are ignored — existing users with
    // leftover `experience_level`/`niches` metadata just go straight to /home.
    if (!isSignedIn && top !== '(auth)') {
      router.replace('/sign-in');
      return;
    }

    if (isSignedIn && (top === '(auth)' || top === '(onboarding)' || top === undefined)) {
      router.replace('/home');
    }
  }, [loading, session, segments, router]);

  return (
    <ThemeProvider value={DarkTheme}>
      {/* Flat Robinhood-style background — pure #050505, no ambient gradient.
          The old AmbientBackground component faked `filter: blur(120px)` radial
          blobs via circular Views and read as "puff smoke" on native. Removed.
          Each screen can layer its own subtle surfaces via <GlassCard/>. */}
      <View style={{ flex: 1, backgroundColor: '#050505' }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
          }}
        >
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen
            name="shop-setup"
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen
            name="notifications"
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </View>
    </ThemeProvider>
  );
}
