import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GlassCard } from '@/components/GlassCard';
import { BoltIcon, SparkleIcon } from '@/components/icons';
import { useSession } from '@/lib/session';

/**
 * Autopilot — pre-trial pitch screen.
 *
 * Deliberately simple. Three bullets, one input, one button. Cadence and
 * approval-method pickers are hidden until the user actually has an active
 * trial / subscription — the backend job runner doesn't exist yet (Session 5),
 * so exposing knobs now would be noise. Robinhood pattern: sell it first,
 * configure it after they're in.
 */
export default function AutopilotScreen() {
  const { user } = useSession();

  const [trialEmail, setTrialEmail] = useState(user?.email ?? '');
  const [trialRequested, setTrialRequested] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const buzz = (kind: 'light' | 'medium' = 'light') => {
    if (Platform.OS === 'web') return;
    Haptics.impactAsync(
      kind === 'medium'
        ? Haptics.ImpactFeedbackStyle.Medium
        : Haptics.ImpactFeedbackStyle.Light,
    ).catch(() => {});
  };

  const requestTrial = async () => {
    const email = trialEmail.trim();
    if (!email || !email.includes('@')) {
      Alert.alert('Email required', 'Enter the email you want Autopilot updates sent to.');
      return;
    }
    buzz('medium');
    setSubmitting(true);
    // TODO Session 5: POST to api.ember-pod.com/autopilot/trial
    await new Promise((r) => setTimeout(r, 400));
    setSubmitting(false);
    setTrialRequested(true);
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: 'transparent' }}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={{ paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 18 : 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <BoltIcon size={14} color="rgba(255,255,255,0.55)" strokeWidth={2} />
            <Text
              style={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: 11,
                letterSpacing: 1.4,
                textTransform: 'uppercase',
                fontWeight: '700',
              }}
            >
              Autopilot
            </Text>
          </View>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 40,
              fontWeight: '900',
              letterSpacing: -1.8,
              marginTop: 10,
              lineHeight: 44,
            }}
          >
            Set it.{'\n'}Forget it.
          </Text>
          <Text
            style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: 15,
              lineHeight: 22,
              marginTop: 14,
            }}
          >
            We pick what&apos;s trending, design it, and list it on your Etsy. Every day.
          </Text>
        </View>

        {/* HOW IT WORKS — three flat rows, no icons bloat */}
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <GlassCard strong>
            <View style={{ padding: 4 }}>
              <HowRow
                n="1"
                title="We find the trend"
                sub="Live keywords from Google Trends, scored for POD."
              />
              <Divider />
              <HowRow
                n="2"
                title="AI designs the product"
                sub="T-shirt, mug, sticker — whatever fits the niche."
              />
              <Divider />
              <HowRow
                n="3"
                title="It goes live on Etsy"
                sub="We email you first, or auto-publish. Your call."
              />
            </View>
          </GlassCard>
        </View>

        {/* TRIAL CARD */}
        <View style={{ paddingHorizontal: 20, marginTop: 22 }}>
          <GlassCard strong>
            <View style={{ padding: 20 }}>
              {trialRequested ? (
                <>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <SparkleIcon size={14} color="#FFFFFF" strokeWidth={1.8} />
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 11,
                        fontWeight: '800',
                        letterSpacing: 1.4,
                        textTransform: 'uppercase',
                      }}
                    >
                      You&apos;re in
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 22,
                      fontWeight: '900',
                      letterSpacing: -0.6,
                      marginTop: 10,
                      lineHeight: 28,
                    }}
                  >
                    We&apos;ll email {trialEmail} the moment Autopilot unlocks.
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: 13,
                      marginTop: 10,
                      lineHeight: 19,
                    }}
                  >
                    Until then you can keep browsing trends on the Home tab.
                  </Text>
                </>
              ) : (
                <>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <SparkleIcon size={14} color="#FFFFFF" strokeWidth={1.8} />
                    <Text
                      style={{
                        color: '#FFFFFF',
                        fontSize: 11,
                        fontWeight: '800',
                        letterSpacing: 1.4,
                        textTransform: 'uppercase',
                      }}
                    >
                      Free 14-day trial
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 22,
                      fontWeight: '900',
                      letterSpacing: -0.6,
                      marginTop: 10,
                      lineHeight: 28,
                    }}
                  >
                    Try it free. No card.
                  </Text>

                  <TextInput
                    value={trialEmail}
                    onChangeText={setTrialEmail}
                    placeholder="you@example.com"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={{
                      marginTop: 18,
                      paddingHorizontal: 16,
                      paddingVertical: 15,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: 'rgba(255,255,255,0.18)',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      color: '#FFFFFF',
                      fontSize: 15,
                      fontWeight: '600',
                    }}
                  />
                  <Pressable
                    onPress={requestTrial}
                    disabled={submitting}
                    style={({ pressed }) => [
                      {
                        marginTop: 10,
                        paddingVertical: 16,
                        borderRadius: 12,
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF',
                      },
                      pressed && { opacity: 0.85 },
                      submitting && { opacity: 0.7 },
                    ]}
                  >
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 15,
                        fontWeight: '900',
                        letterSpacing: 0.2,
                      }}
                    >
                      {submitting ? 'Starting…' : 'Start free trial'}
                    </Text>
                  </Pressable>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.55)',
                      fontSize: 12,
                      marginTop: 12,
                      textAlign: 'center',
                    }}
                  >
                    After trial · $14.99/mo. Cancel anytime.
                  </Text>
                </>
              )}
            </View>
          </GlassCard>
        </View>

        {/* FINE PRINT — very light, easy to skip */}
        <View style={{ paddingHorizontal: 20, marginTop: 20, alignItems: 'center' }}>
          <Text
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 11,
              textAlign: 'center',
              lineHeight: 16,
              maxWidth: 300,
            }}
          >
            Autopilot runs on our servers. You never have to open the app to keep your shop fresh.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/** One numbered step in the "How it works" card. */
function HowRow({ n, title, sub }: { n: string; title: string; sub: string }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: 16,
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.2)',
          backgroundColor: 'rgba(255,255,255,0.06)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '900' }}>{n}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '800', letterSpacing: -0.2 }}>
          {title}
        </Text>
        <Text
          style={{
            color: 'rgba(255,255,255,0.65)',
            fontSize: 12,
            marginTop: 3,
            lineHeight: 17,
          }}
        >
          {sub}
        </Text>
      </View>
    </View>
  );
}

function Divider() {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.08)',
        marginHorizontal: 16,
      }}
    />
  );
}
