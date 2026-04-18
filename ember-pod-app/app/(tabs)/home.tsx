import { SafeAreaView, ScrollView, StatusBar, Text, View } from 'react-native';

import { useSession } from '@/lib/session';

// Display labels for niche storage keys. Keep in sync with NICHES in
// app/(onboarding)/niches.tsx.
const NICHE_LABELS: Record<string, string> = {
  pets: 'pets',
  gaming: 'gaming',
  coffee: 'coffee',
  fitness: 'fitness',
  plants: 'plants',
  dad_jokes: 'dad jokes',
  religion: 'religion',
  holidays: 'holidays',
};

// Static trending placeholders. Real trend data wires in later.
const TRENDING: { title: string; blurb: string }[] = [
  {
    title: 'Pickleball dog dad',
    blurb: 'Tees + mugs for the "my dog is my coach" crowd.',
  },
  {
    title: 'Cold brew club',
    blurb: 'Minimalist coffee art pulling strong week-over-week.',
  },
  {
    title: 'Succulent daddy',
    blurb: 'Plant-parent humor with a retro type vibe.',
  },
];

function formatNicheList(niches: string[]): string {
  const labels = niches.map((n) => NICHE_LABELS[n] ?? n);
  if (labels.length === 0) return '';
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(', ')}, and ${labels[labels.length - 1]}`;
}

export default function HomeScreen() {
  const { user } = useSession();
  const niches = (user?.user_metadata?.niches as string[] | undefined) ?? [];
  const watchingLine = niches.length > 0 ? formatNicheList(niches) : 'your feed';

  return (
    <SafeAreaView className="flex-1 bg-ink-950">
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-12 pb-10" style={{ maxWidth: 640, width: '100%', alignSelf: 'center' }}>
          <Text className="text-white/40 text-xs uppercase tracking-wider">Home</Text>
          <Text className="text-white text-4xl font-bold mt-2 tracking-tight">
            You{'\u2019'}re watching{'\n'}
            <Text className="text-white">{watchingLine}.</Text>
          </Text>
          <Text className="text-white/60 text-base mt-4">
            Fresh trends, picked for what you love.
          </Text>

          <View className="mt-10 gap-4">
            <Text className="text-white/40 text-xs uppercase tracking-wider">
              Trending now
            </Text>
            {TRENDING.map((t) => (
              <View
                key={t.title}
                className="rounded-2xl p-5 border border-white/10 bg-white/[0.03]"
              >
                <View className="flex-row items-center mb-3">
                  <View className="rounded-full px-2 py-0.5 bg-white/10 border border-white/15">
                    <Text className="text-white/80 text-[10px] font-semibold tracking-wider">
                      {'\uD83D\uDD25'} TRENDING
                    </Text>
                  </View>
                </View>
                <Text className="text-white text-xl font-semibold tracking-tight mb-1">
                  {t.title}
                </Text>
                <Text className="text-white/60 text-sm leading-5">{t.blurb}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
