import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import {
  Alert,
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

export default function ProfileScreen() {
  const { user, signOut } = useSession();
  const [busy, setBusy] = useState(false);

  const buzz = (kind: 'light' | 'medium' = 'light') => {
    if (Platform.OS === 'web') return;
    Haptics.impactAsync(
      kind === 'medium' ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light,
    ).catch(() => {});
  };

  const handleSignOut = async () => {
    buzz('medium');
    setBusy(true);
    await signOut();
    setBusy(false);
  };

  // Account deletion is required by both Apple (since 2022) and Google Play.
  // Real deletion needs a Supabase Edge Function with the service-role key —
  // shipping that in Session 4. Today we surface the entry point so QA + Play
  // Store reviewers see it exists.
  const handleDelete = () => {
    buzz('medium');
    Alert.alert(
      'Delete account',
      "This will permanently delete your EmberPod account and all listings, designs, and connected shop tokens. This can't be undone.",
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO Session 4: invoke Supabase Edge Function `delete_account`.
            Alert.alert(
              'Almost there',
              "Account deletion ships in the next update. We'll email you within 24 hours to confirm.",
            );
          },
        },
      ],
    );
  };

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={{ paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 18 : 8 }}>
          <Text
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: 11,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
              fontWeight: '600',
            }}
          >
            Profile
          </Text>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 38,
              fontWeight: '900',
              letterSpacing: -1.6,
              marginTop: 6,
            }}
          >
            Account
          </Text>
        </View>

        {/* USER CARD */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <GlassCard strong>
            <View style={{ padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: '#000000', fontWeight: '900', fontSize: 20 }}>
                  {(user?.email ?? '?').charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: 10,
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                    fontWeight: '600',
                  }}
                >
                  Signed in as
                </Text>
                <Text
                  style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700', marginTop: 2 }}
                  numberOfLines={1}
                >
                  {user?.email ?? '—'}
                </Text>
                {memberSince ? (
                  <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, marginTop: 4 }}>
                    Member since {memberSince}
                  </Text>
                ) : null}
              </View>
            </View>
          </GlassCard>
        </View>

        {/* SHOP CONNECTIONS */}
        <View style={{ paddingHorizontal: 20, marginTop: 18 }}>
          <Text
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: 11,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
              fontWeight: '600',
              marginBottom: 10,
            }}
          >
            Connections
          </Text>
          <View style={{ gap: 10 }}>
            {[
              { name: 'Etsy',     status: 'Not connected' },
              { name: 'Printful', status: 'Not connected' },
              { name: 'Printify', status: 'Not connected' },
            ].map((c) => (
              <GlassCard key={c.name}>
                <View
                  style={{
                    padding: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700' }}>{c.name}</Text>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 9999,
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderWidth: 1,
                      borderColor: 'rgba(255,255,255,0.10)',
                    }}
                  >
                    <Text
                      style={{
                        color: 'rgba(255,255,255,0.55)',
                        fontSize: 11,
                        fontWeight: '700',
                        letterSpacing: 0.4,
                      }}
                    >
                      {c.status}
                    </Text>
                  </View>
                </View>
              </GlassCard>
            ))}
          </View>
        </View>

        {/* ACTIONS */}
        <View style={{ paddingHorizontal: 20, marginTop: 22, gap: 10 }}>
          <Pressable
            onPress={handleSignOut}
            disabled={busy}
            style={({ pressed }) => [
              {
                paddingVertical: 16,
                borderRadius: 14,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.15)',
                backgroundColor: 'rgba(255,255,255,0.04)',
              },
              pressed && { opacity: 0.8 },
              busy && { opacity: 0.6 },
            ]}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700' }}>
              {busy ? 'Signing out…' : 'Sign out'}
            </Text>
          </Pressable>

          <Pressable
            onPress={handleDelete}
            style={({ pressed }) => [
              {
                paddingVertical: 16,
                borderRadius: 14,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: 'rgba(248,113,113,0.25)',
                backgroundColor: 'rgba(248,113,113,0.06)',
              },
              pressed && { opacity: 0.8 },
            ]}
          >
            <Text style={{ color: '#F87171', fontSize: 14, fontWeight: '700' }}>
              Delete account
            </Text>
          </Pressable>
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 22, alignItems: 'center' }}>
          <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>
            EmberPod · v0.1
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
