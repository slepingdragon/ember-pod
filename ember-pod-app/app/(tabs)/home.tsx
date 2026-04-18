import { SafeAreaView, StatusBar, Text, View } from 'react-native';

import { useSession } from '@/lib/session';

export default function HomeScreen() {
  const { user } = useSession();
  const level = user?.user_metadata?.experience_level as string | undefined;

  const levelLabel =
    level === 'experienced'
      ? "You're experienced."
      : level === 'sort_of'
      ? 'You have tried this before.'
      : level === 'beginner'
      ? 'Total beginner. Welcome.'
      : '';

  return (
    <SafeAreaView className="flex-1 bg-ink-950">
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <View className="flex-1 px-6 pt-12">
        <Text className="text-white/40 text-xs uppercase tracking-wider">Home</Text>
        <Text className="text-white text-4xl font-bold mt-2 tracking-tight">
          You{"\u2019"}re in.
        </Text>
        {levelLabel ? (
          <Text className="text-white/60 text-base mt-3">{levelLabel}</Text>
        ) : null}

        <View className="mt-10 rounded-2xl p-6 border border-white/10 bg-white/[0.03]">
          <Text className="text-white/40 text-xs uppercase tracking-wider mb-2">
            Next up
          </Text>
          <Text className="text-white text-lg font-semibold mb-2 tracking-tight">
            Trending niches, AI designs, one-tap publish
          </Text>
          <Text className="text-white/60 text-sm leading-5">
            Coming soon: trend-picked niches, AI design swipes, and instant Etsy
            publishing.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
