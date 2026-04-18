import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import {
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import { GlassCard } from '@/components/GlassCard';

type Step = {
  id: 'etsy_create' | 'etsy_connect' | 'printful_connect' | 'first_product';
  num: string;
  title: string;
  body: string;
  cta: string;
  // Either an external URL to open in the in-app browser, or null = stub.
  externalUrl?: string;
  comingSoon?: boolean;
};

const STEPS: Step[] = [
  {
    id: 'etsy_create',
    num: '01',
    title: 'Create your Etsy shop',
    body: 'No shop yet? Etsy walks you through naming, banking, and listings in about two minutes. We\u2019ll wait.',
    cta: 'Open Etsy setup',
    externalUrl: 'https://www.etsy.com/sell',
  },
  {
    id: 'etsy_connect',
    num: '02',
    title: 'Connect Etsy to EmberPod',
    body: 'One-tap OAuth. Lets us draft and publish listings on your behalf — you approve every one.',
    cta: 'Connect (coming soon)',
    comingSoon: true,
  },
  {
    id: 'printful_connect',
    num: '03',
    title: 'Connect Printful',
    body: 'Printful prints, packs, and ships. They charge you when an order comes in. No upfront cost.',
    cta: 'Connect (coming soon)',
    comingSoon: true,
  },
  {
    id: 'first_product',
    num: '04',
    title: 'Build your first product',
    body: 'Pick a tee, drag a design on, set a price. We\u2019ll write the title and tags for you.',
    cta: 'Open Create',
  },
];

export default function ShopSetupScreen() {
  const router = useRouter();
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const buzz = (kind: 'light' | 'medium' = 'light') => {
    if (Platform.OS === 'web') return;
    Haptics.impactAsync(
      kind === 'medium' ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light,
    ).catch(() => {});
  };

  const markDone = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleStep = async (step: Step) => {
    buzz('medium');
    if (step.comingSoon) return;
    if (step.id === 'first_product') {
      router.replace('/create');
      return;
    }
    if (step.externalUrl) {
      try {
        await WebBrowser.openBrowserAsync(step.externalUrl);
        markDone(step.id);
      } catch {
        Linking.openURL(step.externalUrl).catch(() => {});
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: Platform.OS === 'android' ? 18 : 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Pressable
            onPress={() => {
              buzz('light');
              router.back();
            }}
            hitSlop={12}
          >
            <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: '600' }}>
              ← Close
            </Text>
          </Pressable>
          <Text
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: 11,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
              fontWeight: '600',
            }}
          >
            {completed.size} of {STEPS.length} done
          </Text>
        </View>

        {/* TITLE */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 38,
              fontWeight: '900',
              letterSpacing: -1.6,
              lineHeight: 42,
            }}
          >
            Set up your shop.
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, marginTop: 10, lineHeight: 21 }}>
            Four steps from zero to a real product live on Etsy. We walk you through each one.
          </Text>
        </View>

        {/* STEPS */}
        <View style={{ paddingHorizontal: 20, marginTop: 28, gap: 12 }}>
          {STEPS.map((step) => {
            const isDone = completed.has(step.id);
            return (
              <GlassCard key={step.id} strong={isDone}>
                <View style={{ padding: 18 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <View
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 9,
                          backgroundColor: isDone ? '#FFFFFF' : 'rgba(255,255,255,0.08)',
                          borderWidth: 1,
                          borderColor: isDone ? '#FFFFFF' : 'rgba(255,255,255,0.15)',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text
                          style={{
                            color: isDone ? '#000000' : 'rgba(255,255,255,0.85)',
                            fontWeight: '900',
                            fontSize: 12,
                          }}
                        >
                          {isDone ? '\u2713' : step.num}
                        </Text>
                      </View>
                      <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '800', letterSpacing: -0.3 }}>
                        {step.title}
                      </Text>
                    </View>
                    {step.comingSoon ? (
                      <View
                        style={{
                          paddingHorizontal: 8,
                          paddingVertical: 3,
                          borderRadius: 9999,
                          backgroundColor: 'rgba(255,255,255,0.06)',
                          borderWidth: 1,
                          borderColor: 'rgba(255,255,255,0.12)',
                        }}
                      >
                        <Text
                          style={{
                            color: 'rgba(255,255,255,0.55)',
                            fontSize: 9,
                            fontWeight: '700',
                            letterSpacing: 0.6,
                          }}
                        >
                          SOON
                        </Text>
                      </View>
                    ) : null}
                  </View>

                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.55)',
                      fontSize: 13,
                      lineHeight: 19,
                      marginTop: 10,
                    }}
                  >
                    {step.body}
                  </Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14, gap: 10 }}>
                    <Pressable
                      onPress={() => handleStep(step)}
                      disabled={step.comingSoon}
                      style={({ pressed }) => [
                        {
                          flex: 1,
                          paddingVertical: 12,
                          borderRadius: 12,
                          alignItems: 'center',
                          backgroundColor: step.comingSoon
                            ? 'rgba(255,255,255,0.06)'
                            : '#FFFFFF',
                          borderWidth: step.comingSoon ? 1 : 0,
                          borderColor: 'rgba(255,255,255,0.10)',
                        },
                        pressed && { opacity: 0.85 },
                      ]}
                    >
                      <Text
                        style={{
                          color: step.comingSoon ? 'rgba(255,255,255,0.5)' : '#000000',
                          fontWeight: '700',
                          fontSize: 13,
                        }}
                      >
                        {step.cta}
                      </Text>
                    </Pressable>
                    {!step.comingSoon ? (
                      <Pressable
                        onPress={() => {
                          buzz('light');
                          markDone(step.id);
                        }}
                        style={({ pressed }) => [
                          {
                            paddingVertical: 12,
                            paddingHorizontal: 14,
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: 'rgba(255,255,255,0.12)',
                            backgroundColor: 'rgba(255,255,255,0.04)',
                          },
                          pressed && { opacity: 0.7 },
                        ]}
                      >
                        <Text
                          style={{
                            color: 'rgba(255,255,255,0.7)',
                            fontWeight: '700',
                            fontSize: 13,
                          }}
                        >
                          {isDone ? 'Undo' : 'Mark done'}
                        </Text>
                      </Pressable>
                    ) : null}
                  </View>
                </View>
              </GlassCard>
            );
          })}
        </View>

        {/* HELP */}
        <View style={{ paddingHorizontal: 20, marginTop: 22 }}>
          <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, lineHeight: 18, textAlign: 'center' }}>
            Stuck on a step? We{'\u2019'}ll add in-app guides and screenshots in the next update.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
