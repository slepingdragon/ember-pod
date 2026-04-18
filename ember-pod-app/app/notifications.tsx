import { useRouter } from 'expo-router';
import { Platform, Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GlassCard } from '@/components/GlassCard';
import { BellIcon, BoltIcon, TrendingIcon } from '@/components/icons';

/**
 * Notifications inbox — presented as a modal from the Home bell button.
 *
 * Empty state for now. Real feed lands in Session 5 when the Autopilot job
 * runner on Railway starts writing rows to a `notifications` table in
 * Supabase. Three categories are pre-wired for the feed UI:
 *   - Autopilot  (runs, approvals, failures)
 *   - Trending   (new rising keywords in your niche)
 *   - System     (shop connects, payouts, Etsy API changes)
 */
export default function NotificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#050505' }}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: Platform.OS === 'android' ? 18 : 8,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: 'rgba(255,255,255,0.4)',
                fontSize: 11,
                letterSpacing: 1.4,
                textTransform: 'uppercase',
                fontWeight: '600',
              }}
            >
              Inbox
            </Text>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 34,
                fontWeight: '900',
                letterSpacing: -1.4,
                marginTop: 6,
              }}
            >
              Notifications
            </Text>
          </View>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              {
                paddingHorizontal: 16,
                paddingVertical: 9,
                borderRadius: 9999,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.22)',
                backgroundColor: 'rgba(255,255,255,0.10)',
              },
              pressed && { opacity: 0.85 },
            ]}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '800' }}>Close</Text>
          </Pressable>
        </View>

        {/* EMPTY STATE */}
        <View style={{ paddingHorizontal: 20, marginTop: 32, alignItems: 'center' }}>
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 24,
              borderWidth: 1,
              borderColor: 'rgba(255,255,255,0.1)',
              backgroundColor: 'rgba(255,255,255,0.03)',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 18,
            }}
          >
            <BellIcon size={30} color="rgba(255,255,255,0.7)" strokeWidth={1.4} />
          </View>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: '800',
              letterSpacing: -0.2,
            }}
          >
            You're all caught up
          </Text>
          <Text
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 13,
              marginTop: 6,
              textAlign: 'center',
              maxWidth: 280,
              lineHeight: 19,
            }}
          >
            Autopilot runs, trend alerts, and shop updates will show up here.
          </Text>
        </View>

        {/* WHAT YOU'LL SEE HERE — preview categories */}
        <View style={{ paddingHorizontal: 20, marginTop: 34 }}>
          <Text
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: 11,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
              fontWeight: '600',
              marginBottom: 12,
            }}
          >
            What lands here
          </Text>
          <View style={{ gap: 10 }}>
            <CategoryRow
              icon={<BoltIcon size={18} color="#FFFFFF" strokeWidth={1.6} />}
              title="Autopilot runs"
              sub="When we design + publish a product for you"
            />
            <CategoryRow
              icon={<TrendingIcon size={18} color="#FFFFFF" strokeWidth={1.6} />}
              title="Trend alerts"
              sub="A keyword is spiking in a niche you watch"
            />
            <CategoryRow
              icon={<BellIcon size={18} color="#FFFFFF" strokeWidth={1.6} />}
              title="Shop updates"
              sub="New sales, payouts, and Etsy status"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function CategoryRow({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <GlassCard>
      <View
        style={{
          padding: 14,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.12)',
            backgroundColor: 'rgba(255,255,255,0.04)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '700' }}>{title}</Text>
          <Text
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 12,
              marginTop: 2,
            }}
          >
            {sub}
          </Text>
        </View>
      </View>
    </GlassCard>
  );
}
