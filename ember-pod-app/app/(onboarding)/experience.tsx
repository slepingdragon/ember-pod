import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import { ExperienceLevel, supabase } from '@/lib/supabase';

type Option = {
  value: ExperienceLevel;
  title: string;
  subtitle: string;
};

const OPTIONS: Option[] = [
  {
    value: 'experienced',
    title: "Yes, I'm experienced",
    subtitle: "I've sold products online before and know my way around.",
  },
  {
    value: 'sort_of',
    title: 'Sort of — tried, didn\u2019t stick',
    subtitle: 'I gave it a shot once, but it didn\u2019t really go anywhere.',
  },
  {
    value: 'beginner',
    title: 'No, total beginner',
    subtitle: 'This is brand new for me. Walk me through it.',
  },
];

export default function OnboardingScreen() {
  const [selected, setSelected] = useState<ExperienceLevel | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = async () => {
    if (!selected) return;
    setError(null);
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { experience_level: selected },
      });
      if (error) setError(error.message);
      // Root gate notices the updated metadata and routes to (tabs).
    } catch (e: any) {
      setError(e?.message ?? 'Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-ink-950">
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 px-6 pt-12 pb-8">
          <Text className="text-white/40 text-xs uppercase tracking-wider mb-3">
            Step 1 of 1
          </Text>
          <Text className="text-white text-4xl font-bold mb-3 tracking-tight">
            Have you ever sold{'\n'}online before?
          </Text>
          <Text className="text-white/60 text-base mb-8">
            {'We\u2019ll tailor the app to where you are today.'}
          </Text>

          <View className="gap-3">
            {OPTIONS.map((opt) => {
              const isSelected = selected === opt.value;
              return (
                <Pressable
                  key={opt.value}
                  onPress={() => setSelected(opt.value)}
                  className={`rounded-2xl p-5 border ${
                    isSelected
                      ? 'bg-white/10 border-white/40'
                      : 'bg-white/[0.03] border-white/10'
                  } active:opacity-80`}
                >
                  <Text
                    className={`text-lg font-semibold mb-1 ${
                      isSelected ? 'text-white' : 'text-white/90'
                    }`}
                  >
                    {opt.title}
                  </Text>
                  <Text className="text-sm text-white/50">{opt.subtitle}</Text>
                </Pressable>
              );
            })}
          </View>

          {error ? (
            <Text className="text-red-300/90 text-sm mt-4">{error}</Text>
          ) : null}

          <View className="flex-1" />

          <Pressable
            onPress={handleContinue}
            disabled={!selected || submitting}
            className={`rounded-2xl py-4 items-center mt-6 active:opacity-80 ${
              selected ? 'bg-white' : 'bg-white/20'
            }`}
          >
            {submitting ? (
              <ActivityIndicator color="#050505" />
            ) : (
              <Text
                className={`font-semibold text-base ${
                  selected ? 'text-black' : 'text-white/50'
                }`}
              >
                Continue
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
