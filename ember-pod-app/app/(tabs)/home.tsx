import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import { GlassCard } from '@/components/GlassCard';
import { useSession } from '@/lib/session';

// -----------------------------------------------------------------------------
// Placeholder data — Session 5 will replace this with live data from:
//   - Supabase `products` table (created locally, synced to Etsy via API)
//   - Supabase `orders` table (synced from Etsy transactions_r scope)
//   - Supabase `earnings_daily` rollup (nightly job from `orders`)
// Each user's numbers are RLS'd to their own rows.
// -----------------------------------------------------------------------------

type ProductStatus = 'live' | 'shipped' | 'ready' | 'in_progress';

type DemoProduct = {
  id: string;
  title: string;
  product: string; // "Hoodie" | "Tee" | "Mug" | "Sticker"
  status: ProductStatus;
  price: number;
  sales: number;
};

const DEMO_PRODUCTS: DemoProduct[] = [
  { id: '1', title: 'Pickleball Dad Club', product: 'Tee',    status: 'live',        price: 24.00, sales: 12 },
  { id: '2', title: 'Cold Brew Cult',       product: 'Hoodie', status: 'live',        price: 48.00, sales: 6  },
  { id: '3', title: 'Succulent Daddy',      product: 'Mug',    status: 'ready',       price: 18.00, sales: 0  },
  { id: '4', title: 'Retro Sci-Fi Skyline', product: 'Sticker',status: 'in_progress', price: 4.00,  sales: 0  },
];

const DEMO_STATS = {
  lifetimeEarnings: 427.5,
  thisWeek: 84.0,
  shipped: 18,
  ready: 4,
  inProgress: 2,
  views7d: 312,
};

// -----------------------------------------------------------------------------

function formatUSD(n: number) {
  return n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
}

function StatusBadge({ status }: { status: ProductStatus }) {
  const map: Record<ProductStatus, { label: string; dot: string }> = {
    live:        { label: 'LIVE',        dot: '#4ADE80' },
    shipped:     { label: 'SHIPPED',     dot: '#FFFFFF' },
    ready:       { label: 'READY',       dot: '#FACC15' },
    in_progress: { label: 'IN PROGRESS', dot: 'rgba(255,255,255,0.5)' },
  };
  const { label, dot } = map[status];
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 9999,
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.12)',
      }}
    >
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 9999,
          backgroundColor: dot,
          marginRight: 6,
        }}
      />
      <Text style={{ fontSize: 9, fontWeight: '700', color: 'rgba(255,255,255,0.8)', letterSpacing: 0.8 }}>
        {label}
      </Text>
    </View>
  );
}

function StatTile({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: string;
}) {
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
            color: accent ?? '#FFFFFF',
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
  emoji,
  title,
  subtitle,
  onPress,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <GlassCard strong style={{ flex: 1 }} onPress={onPress}>
      <View style={{ padding: 16, minHeight: 128 }}>
        <Text style={{ fontSize: 26, marginBottom: 10 }}>{emoji}</Text>
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

function ProductRow({ p }: { p: DemoProduct }) {
  return (
    <GlassCard>
      <View
        style={{
          padding: 14,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 14,
        }}
      >
        {/* Thumbnail placeholder (next session: real mockup image) */}
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.10)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 22 }}>
            {p.product === 'Hoodie' ? '\uD83E\uDDE5' : // 🧥
              p.product === 'Tee' ? '\uD83D\uDC55' : // 👕
              p.product === 'Mug' ? '\u2615' : // ☕
              '\uD83C\uDFB4'} {/* 🎴 sticker-ish */}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text
              style={{ fontSize: 15, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.2 }}
              numberOfLines={1}
            >
              {p.title}
            </Text>
            <StatusBadge status={p.status} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 10 }}>
            <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{p.product}</Text>
            <View style={{ width: 3, height: 3, borderRadius: 9999, backgroundColor: 'rgba(255,255,255,0.25)' }} />
            <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{formatUSD(p.price)}</Text>
            {p.sales > 0 ? (
              <>
                <View style={{ width: 3, height: 3, borderRadius: 9999, backgroundColor: 'rgba(255,255,255,0.25)' }} />
                <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: '600' }}>
                  {p.sales} sold
                </Text>
              </>
            ) : null}
          </View>
        </View>
      </View>
    </GlassCard>
  );
}

export default function HomeScreen() {
  const { user } = useSession();
  const router = useRouter();

  // First-name-ish greeting from email prefix. Real profile name comes later
  // when we add a `profiles` table in Supabase.
  const greeting = useMemo(() => {
    const email = user?.email ?? '';
    const prefix = email.split('@')[0] ?? '';
    if (!prefix) return 'Welcome';
    // 'baniabradyy' -> 'Bania' (first alphabetic run, capitalized)
    const m = prefix.match(/^[a-zA-Z]+/);
    const name = m ? m[0] : prefix;
    return `Hey, ${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  }, [user]);

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ===== TOP NAV ===== */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: Platform.OS === 'android' ? 18 : 8,
            paddingBottom: 8,
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
          <Text style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }}>
            {greeting}
          </Text>
        </View>

        {/* ===== BIG KPI ===== */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
          <Text
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: 11,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
              fontWeight: '600',
            }}
          >
            Lifetime earnings
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 56,
              fontWeight: '900',
              letterSpacing: -2.2,
              marginTop: 4,
            }}
          >
            {formatUSD(DEMO_STATS.lifetimeEarnings)}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 }}>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 9999,
                backgroundColor: 'rgba(74,222,128,0.12)',
                borderWidth: 1,
                borderColor: 'rgba(74,222,128,0.3)',
              }}
            >
              <Text style={{ color: '#4ADE80', fontSize: 11, fontWeight: '700' }}>
                +{formatUSD(DEMO_STATS.thisWeek)}
              </Text>
            </View>
            <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>this week</Text>
          </View>
        </View>

        {/* ===== STAT ROW ===== */}
        <View style={{ paddingHorizontal: 20, marginTop: 24, flexDirection: 'row', gap: 10 }}>
          <StatTile label="Shipped" value={DEMO_STATS.shipped} />
          <StatTile label="Ready" value={DEMO_STATS.ready} />
          <StatTile label="In progress" value={DEMO_STATS.inProgress} />
        </View>

        {/* ===== QUICK ACTIONS ===== */}
        <View style={{ paddingHorizontal: 20, marginTop: 14, flexDirection: 'row', gap: 10 }}>
          <QuickAction
            emoji={'\u2728'}
            title="Build a product"
            subtitle="Pick a template, drop a design, publish."
            onPress={goCreate}
          />
          <QuickAction
            emoji={'\uD83C\uDFEA'}
            title="Set up shop"
            subtitle="Walk-through: create Etsy, connect Printful."
            onPress={goShopSetup}
          />
        </View>

        {/* ===== PRODUCTS ===== */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: 11,
                letterSpacing: 1.4,
                textTransform: 'uppercase',
                fontWeight: '600',
              }}
            >
              Your products
            </Text>
            <Pressable onPress={() => buzz('light')}>
              <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, fontWeight: '600' }}>
                View all
              </Text>
            </Pressable>
          </View>

          <View style={{ gap: 10 }}>
            {DEMO_PRODUCTS.map((p) => (
              <ProductRow key={p.id} p={p} />
            ))}
          </View>
        </View>

        {/* ===== INSIGHTS STRIP ===== */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <GlassCard>
            <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: 10,
                    letterSpacing: 1.4,
                    textTransform: 'uppercase',
                    fontWeight: '600',
                  }}
                >
                  Views, last 7 days
                </Text>
                <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '800', letterSpacing: -0.6, marginTop: 2 }}>
                  {DEMO_STATS.views7d}
                </Text>
              </View>
              {/* Mini sparkline (static bars). Session 5 wires real data. */}
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 3, height: 32 }}>
                {[10, 18, 12, 22, 16, 28, 20].map((h, i) => (
                  <View
                    key={i}
                    style={{
                      width: 6,
                      height: h,
                      borderRadius: 2,
                      backgroundColor: 'rgba(255,255,255,0.45)',
                    }}
                  />
                ))}
              </View>
            </View>
          </GlassCard>
        </View>

        {/* ===== FOOTER NOTE ===== */}
        <View style={{ paddingHorizontal: 20, marginTop: 28, alignItems: 'center' }}>
          <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>
            {'\uD83D\uDD36'} Demo numbers. Live earnings appear once you connect a shop.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
