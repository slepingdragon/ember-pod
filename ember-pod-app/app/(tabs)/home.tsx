import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EarningsChart } from '@/components/EarningsChart';
import { GlassCard } from '@/components/GlassCard';
import {
  BellIcon,
  PlusIcon,
  ShopIcon,
  SparkleIcon,
  TrendingIcon,
} from '@/components/icons';
import { useSession } from '@/lib/session';
import { fetchTrending, TrendingKeyword } from '@/lib/trends';

// -----------------------------------------------------------------------------
// Empty-state dashboard + live trending keywords from Bania's RapidAPI.
//
// Earnings are zeroed until a user publishes a product and records a sale.
// Trending keywords come from the Google Trends Keywords API (PRO plan);
// cached 1 hour in `lib/trends.ts` to stay under quota.
// -----------------------------------------------------------------------------

const PERIODS = ['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const;
type Period = (typeof PERIODS)[number];

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Text
      style={{
        color: 'rgba(255,255,255,0.4)',
        fontSize: 11,
        letterSpacing: 1.4,
        textTransform: 'uppercase',
        fontWeight: '600',
      }}
    >
      {children}
    </Text>
  );
}

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <GlassCard style={{ flex: 1 }}>
      <View style={{ padding: 14 }}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: '600',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: 1.2,
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            fontSize: 26,
            fontWeight: '800',
            color: '#FFFFFF',
            letterSpacing: -0.8,
          }}
        >
          {value}
        </Text>
      </View>
    </GlassCard>
  );
}

function QuickAction({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <GlassCard strong style={{ flex: 1 }} onPress={onPress}>
      <View style={{ padding: 16, minHeight: 132 }}>
        <View style={{ marginBottom: 12 }}>{icon}</View>
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.3 }}>
          {title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.55)',
            marginTop: 4,
            lineHeight: 17,
          }}
        >
          {subtitle}
        </Text>
      </View>
    </GlassCard>
  );
}

function TrendCard({
  item,
  onPress,
}: {
  item: TrendingKeyword;
  onPress: () => void;
}) {
  return (
    <GlassCard strong style={{ width: 220 }} onPress={onPress}>
      <View style={{ padding: 14, minHeight: 120, justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <TrendingIcon size={14} color="rgba(255,255,255,0.75)" />
          <Text
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 10,
              letterSpacing: 1.2,
              textTransform: 'uppercase',
              fontWeight: '700',
            }}
          >
            Trending
          </Text>
        </View>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: '800',
            letterSpacing: -0.3,
            lineHeight: 20,
          }}
          numberOfLines={2}
        >
          {item.keyword}
        </Text>
        {item.note ? (
          <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, lineHeight: 15 }} numberOfLines={2}>
            {item.note}
          </Text>
        ) : typeof item.score === 'number' ? (
          <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>
            Score {Math.round(item.score)}
          </Text>
        ) : (
          <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>
            Tap to design
          </Text>
        )}
      </View>
    </GlassCard>
  );
}

export default function HomeScreen() {
  const { user } = useSession();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [period, setPeriod] = useState<Period>('ALL');
  const [trending, setTrending] = useState<TrendingKeyword[] | null>(null);

  // First-name-ish greeting from email prefix. Real profile name comes later
  // when we add a `profiles` table in Supabase.
  const greeting = useMemo(() => {
    const email = user?.email ?? '';
    const prefix = email.split('@')[0] ?? '';
    if (!prefix) return 'Welcome';
    const m = prefix.match(/^[a-zA-Z]+/);
    const name = m ? m[0] : prefix;
    return `Hey, ${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  }, [user]);

  // Load trending keywords on mount. Cache is in-memory w/ 1h TTL so this is
  // cheap across re-renders, and fetchTrending swallows errors.
  useEffect(() => {
    let alive = true;
    fetchTrending().then((list) => {
      if (alive) setTrending(list);
    });
    return () => {
      alive = false;
    };
  }, []);

  const buzz = (kind: 'light' | 'medium' = 'light') => {
    if (Platform.OS === 'web') return;
    Haptics.impactAsync(
      kind === 'medium' ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light,
    ).catch(() => {});
  };

  const goCreate = () => {
    buzz('medium');
    router.push('/create');
  };

  const goShopSetup = () => {
    buzz('medium');
    router.push('/shop-setup');
  };

  const goNotifications = () => {
    buzz('light');
    router.push('/notifications');
  };

  // Chart width is screen width minus the 20px gutter on each side.
  const chartWidth = Math.max(0, width - 40);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: 'transparent' }}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== TOP NAV — logo left, bell right ===== */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 4,
            paddingBottom: 4,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                backgroundColor: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: '#000000', fontWeight: '900', fontSize: 16 }}>E</Text>
            </View>
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: -0.3 }}>
              EmberPod
            </Text>
          </View>
          <Pressable
            onPress={goNotifications}
            hitSlop={12}
            style={({ pressed }) => [
              {
                width: 40,
                height: 40,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255,0.10)',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.22)',
              },
              pressed && { opacity: 0.8 },
            ]}
          >
            <BellIcon size={18} color="#FFFFFF" strokeWidth={1.8} />
          </Pressable>
        </View>

        {/* ===== HERO — greeting + big number + delta ===== */}
        <View style={{ paddingHorizontal: 20, paddingTop: 18 }}>
          <Text
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: 12,
              letterSpacing: 1.2,
              textTransform: 'uppercase',
              fontWeight: '600',
              marginBottom: 4,
            }}
          >
            {greeting}
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 56,
              fontWeight: '900',
              letterSpacing: -2.2,
            }}
          >
            $0.00
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 6 }}>
            <Text
              style={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: 14,
                fontWeight: '600',
              }}
            >
              $0.00 (0.00%)
            </Text>
            <Text
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: 12,
                letterSpacing: 0.4,
                textTransform: 'uppercase',
                marginLeft: 4,
              }}
            >
              {period === 'ALL' ? 'All time' : period}
            </Text>
          </View>
        </View>

        {/* ===== CHART (empty state — dashed baseline) ===== */}
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <EarningsChart data={[]} width={chartWidth} height={160} />
        </View>

        {/* ===== PERIOD PILLS ===== */}
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {PERIODS.map((p) => {
            const active = p === period;
            return (
              <Pressable
                key={p}
                onPress={() => {
                  buzz('light');
                  setPeriod(p);
                }}
                style={{
                  paddingVertical: 8,
                  paddingHorizontal: 14,
                  borderRadius: 9999,
                  backgroundColor: active ? '#FFFFFF' : 'transparent',
                }}
              >
                <Text
                  style={{
                    color: active ? '#000000' : 'rgba(255,255,255,0.7)',
                    fontSize: 12,
                    fontWeight: '800',
                    letterSpacing: 0.6,
                  }}
                >
                  {p}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* ===== STAT ROW (all zeros until Supabase rollup lands) ===== */}
        <View style={{ paddingHorizontal: 20, marginTop: 24, flexDirection: 'row', gap: 10 }}>
          <StatTile label="Shipped" value={0} />
          <StatTile label="Ready" value={0} />
          <StatTile label="In progress" value={0} />
        </View>

        {/* ===== TRENDING NOW — live from RapidAPI ===== */}
        <View style={{ paddingTop: 26 }}>
          <View
            style={{
              paddingHorizontal: 20,
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <TrendingIcon size={14} color="rgba(255,255,255,0.5)" />
              <SectionLabel>Trending now</SectionLabel>
            </View>
            <Text style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>
              Refreshes hourly
            </Text>
          </View>

          {trending === null ? (
            <View style={{ paddingHorizontal: 20 }}>
              <GlassCard>
                <View style={{ padding: 18, alignItems: 'center' }}>
                  <ActivityIndicator color="rgba(255,255,255,0.5)" />
                  <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 8 }}>
                    Pulling the latest from Google Trends…
                  </Text>
                </View>
              </GlassCard>
            </View>
          ) : trending.length === 0 ? (
            <View style={{ paddingHorizontal: 20 }}>
              <GlassCard>
                <View style={{ padding: 18 }}>
                  <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '700' }}>
                    Trends are quiet
                  </Text>
                  <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, marginTop: 4, lineHeight: 17 }}>
                    The trends feed is offline or your RapidAPI key isn&apos;t set yet. Copy
                    {' '}
                    <Text style={{ fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' }}>.env.example</Text>
                    {' '}
                    to
                    {' '}
                    <Text style={{ fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' }}>.env</Text>
                    {' '}
                    and paste your key.
                  </Text>
                </View>
              </GlassCard>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
            >
              {trending.slice(0, 12).map((t) => (
                <TrendCard
                  key={t.keyword}
                  item={t}
                  onPress={() => {
                    buzz('light');
                    // Session 5: deep-link Create with the keyword preloaded as
                    // a generation seed. For now just pop Create open.
                    router.push('/create');
                  }}
                />
              ))}
            </ScrollView>
          )}
        </View>

        {/* ===== YOUR PRODUCTS — empty state ===== */}
        <View style={{ paddingHorizontal: 20, marginTop: 26 }}>
          <View style={{ marginBottom: 10 }}>
            <SectionLabel>Your products</SectionLabel>
          </View>

          <GlassCard>
            <View style={{ padding: 22, alignItems: 'center' }}>
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.15)',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 14,
                }}
              >
                <PlusIcon size={22} color="rgba(255,255,255,0.85)" />
              </View>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: '700',
                  letterSpacing: -0.3,
                }}
              >
                No products yet
              </Text>
              <Text
                style={{
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: 13,
                  textAlign: 'center',
                  marginTop: 6,
                  lineHeight: 18,
                  maxWidth: 280,
                }}
              >
                Build your first product in a few taps. Pick a template, drop a design, publish to Etsy.
              </Text>
              <Pressable
                onPress={goCreate}
                style={({ pressed }) => [
                  {
                    marginTop: 16,
                    backgroundColor: '#FFFFFF',
                    paddingVertical: 12,
                    paddingHorizontal: 22,
                    borderRadius: 12,
                  },
                  pressed && { opacity: 0.85 },
                ]}
              >
                <Text style={{ color: '#000000', fontSize: 14, fontWeight: '800', letterSpacing: -0.2 }}>
                  Build your first
                </Text>
              </Pressable>
            </View>
          </GlassCard>
        </View>

        {/* ===== QUICK ACTIONS ===== */}
        <View style={{ paddingHorizontal: 20, marginTop: 16, flexDirection: 'row', gap: 10 }}>
          <QuickAction
            icon={<SparkleIcon size={24} color="#FFFFFF" />}
            title="Generate art"
            subtitle="AI designs tuned to what's trending right now."
            onPress={goCreate}
          />
          <QuickAction
            icon={<ShopIcon size={24} color="#FFFFFF" />}
            title="Set up shop"
            subtitle="Walk-through: create Etsy, connect Printful."
            onPress={goShopSetup}
          />
        </View>

        {/* ===== FOOTER STATUS ===== */}
        <View style={{ paddingHorizontal: 20, marginTop: 24, alignItems: 'center' }}>
          <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, textAlign: 'center' }}>
            Earnings appear here once you publish a product and make your first sale.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
