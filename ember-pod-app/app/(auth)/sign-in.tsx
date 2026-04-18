import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';

import { supabase } from '@/lib/supabase';

type Mode = 'sign-in' | 'sign-up';

export default function SignInScreen() {
  const [mode, setMode] = useState<Mode>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    setSubmitting(true);
    try {
      if (mode === 'sign-in') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError(error.message);
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) setError(error.message);
      }
      // The root gate in app/_layout.tsx handles navigation once the session updates.
    } catch (e: any) {
      setError(e?.message ?? 'Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-ink-950">
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <View className="flex-1 px-6 justify-center">
          <View className="flex-row items-center mb-10">
            <View className="h-8 w-8 rounded-lg bg-white items-center justify-center">
              <Text className="text-black font-black text-sm">E</Text>
            </View>
            <Text className="text-white font-semibold text-base ml-2 tracking-tight">EmberPod</Text>
          </View>

          <Text className="text-white text-4xl font-bold mb-2 tracking-tight">
            {mode === 'sign-in' ? 'Welcome back.' : 'Create your account.'}
          </Text>
          <Text className="text-white/60 text-base mb-10">
            {mode === 'sign-in'
              ? 'Sign in to pick up where you left off.'
              : 'Your first POD store, live in 10 minutes.'}
          </Text>

          <Text className="text-white/40 text-xs uppercase tracking-wider mb-2">Email</Text>
          <View className="rounded-2xl border border-white/10 bg-white/[0.03] mb-4">
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              placeholder="you@example.com"
              placeholderTextColor="rgba(255,255,255,0.3)"
              className="px-4 py-4 text-white text-base"
            />
          </View>

          <Text className="text-white/40 text-xs uppercase tracking-wider mb-2">Password</Text>
          <View className="rounded-2xl border border-white/10 bg-white/[0.03] mb-2">
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              placeholder="••••••••"
              placeholderTextColor="rgba(255,255,255,0.3)"
              className="px-4 py-4 text-white text-base"
            />
          </View>

          {error ? (
            <Text className="text-red-300/90 text-sm mt-2 mb-2">{error}</Text>
          ) : (
            <View className="h-2" />
          )}

          <Pressable
            onPress={submit}
            disabled={submitting}
            className="bg-white rounded-2xl py-4 items-center mt-4 active:opacity-80 disabled:opacity-60"
          >
            {submitting ? (
              <ActivityIndicator color="#050505" />
            ) : (
              <Text className="text-black font-semibold text-base">
                {mode === 'sign-in' ? 'Sign in' : 'Create account'}
              </Text>
            )}
          </Pressable>

          <Pressable
            onPress={() => {
              setError(null);
              setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in');
            }}
            className="mt-6 items-center"
          >
            <Text className="text-white/60 text-sm">
              {mode === 'sign-in' ? (
                <>
                  New to EmberPod? <Text className="text-white font-semibold">Create an account</Text>
                </>
              ) : (
                <>
                  Already have an account? <Text className="text-white font-semibold">Sign in</Text>
                </>
              )}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
