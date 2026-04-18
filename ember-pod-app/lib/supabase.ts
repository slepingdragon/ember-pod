import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { createClient } from '@supabase/supabase-js';

// Shared Supabase project with the landing page (same waitlist table).
// The "publishable" anon key is designed to be safe in client code.
const SUPABASE_URL = 'https://iwcjjtqvbrrnpqhceowf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_TJVzzeRu-JIo8_fegJNy3Q_WxawKItX';

// SecureStore is iOS keychain / Android keystore. On web it's unavailable,
// so fall back to localStorage there (Expo Web build).
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

const storage =
  Platform.OS === 'web'
    ? undefined // let supabase-js default to localStorage on web
    : ExpoSecureStoreAdapter;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // no OAuth redirects yet
  },
});

// Convenience type for the piece of user_metadata we care about at launch.
export type ExperienceLevel = 'experienced' | 'sort_of' | 'beginner';
