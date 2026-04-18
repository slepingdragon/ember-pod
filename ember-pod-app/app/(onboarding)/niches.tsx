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

import { supabase } from '@/lib/supabase';

type Niche = {
  value: string; // storage key — lowercase, underscore-separated
  label: string; // display label
  emoji: string;
};

const NICHES: Niche[] = [
  { value: 'pets', label: 'Pets', emoji: '\uD83D\uDC3E' }, // 🐾
  { value: 'gaming', label: 'Gaming', emoji: '\uD83C\uDFAE' }, // 🎮
  { value: 'coffee', label: 'Coffee', emoji: '\u2615' }, // ☕
  { value: 'fitness', label: 'Fitness', emoji: '\uD83D\uDCAA' }, // 💪
  { value: 'plants', label: 'Plants', emoji: '\uD83C\uDF31' }, // 🌱
  { value: 'dad_jokes', label: 'Dad jokes', emoji: '\uD83D\uDE02' }, // 😂
  { value: 'religion', label: 'Religion', emoji: '\u271D\uFE0F' }, // ✝️
  { value: 'holidays', label: 'Holidays', emoji: '\uD83C\uDF84' }, // 🎄
];

const MAX_SELECTIONS = 3;

export default function NichesScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleNiche = (value: string) => {
    setSelected((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      }
      if (prev.length >= MAX_SELECTIONS) {
        return prev;
      }
      return [...prev, value];
    });
  };

  const handleContinue = async () => {
    if (selected.length === 0) return;
    setError(null);
    setSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { niches: selected },
      });
      if (error) setError(error.message);
      // Root gate notices the updated metadata and routes to (tabs).
    } catch (e: any) {
      setError(e?.message ?? 'Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const canContinue = selected.length > 0 && selected.length <= MAX_SELECTIONS;

  return (
    <SafeAreaView className="flex-1 bg-ink-950">
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 px-6 pt-12 pb-8">
          <Text className="text-white/40 text-xs uppercase tracking-wider mb-3">
            Step 2 of 2
          </Text>
          <Text className="text-white text-4xl font-bold mb-3 tracking-tight">
            What do you{'\n'}love?
          </Text>
          <Text className="text-white/60 text-base mb-8">
            Pick up to {MAX_SELECTIONS}. We{'\u2019'}ll find what{'\u2019'}s trending in each.
          </Text>

          <View className="flex-row flex-wrap justify-between" style={{ rowGap: 12 }}>
            {NICHES.map((niche) => {
              const isSelected = selected.includes(niche.value);
              const atLimit = selected.length >= MAX_SELECTIONS && !isSelected;
              return (
                <Pressable
                  key={niche.value}
                  onPress={() => toggleNiche(niche.value)}
                  disabled={atLimit}
                  style={{ width: '48%' }}
                  className={`aspect-square rounded-2xl p-5 border items-center justify-center ${
                    isSelected
                      ? 'bg-white/10 border-white/40'
                      : 'bg-white/[0.03] border-white/10'
                  } ${atLimit ? 'opacity-40' : 'active:opacity-80'}`}
                >
                  <Text className="text-5xl mb-3">{niche.emoji}</Text>
                  <Text
                    className={`text-base font-semibold ${
                      isSelected ? 'text-white' : 'text-white/90'
                    }`}
                  >
                    {niche.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text className="text-white/40 text-xs mt-5 text-center">
            {selected.length} of {MAX_SELECTIONS} selected
          </Text>

          {error ? (
            <Text className="text-red-300/90 text-sm mt-4">{error}</Text>
          ) : null}

          <View className="flex-1" />

          <Pressable
            onPress={handleContinue}
            disabled={!canContinue || submitting}
            className={`rounded-2xl py-4 items-center mt-6 active:opacity-80 ${
              canContinue ? 'bg-white' : 'bg-white/20'
            }`}
          >
            {submitting ? (
              <ActivityIndicator color="#050505" />
            ) : (
              <Text
                className={`font-semibold text-base ${
                  canContinue ? 'text-black' : 'text-white/50'
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
