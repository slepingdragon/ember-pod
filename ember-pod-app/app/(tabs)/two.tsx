import { Pressable, SafeAreaView, StatusBar, Text, View } from 'react-native';

import { useSession } from '@/lib/session';

export default function ProfileScreen() {
  const { user, signOut } = useSession();

  return (
    <SafeAreaView className="flex-1 bg-ink-950">
      <StatusBar barStyle="light-content" backgroundColor="#050505" />
      <View className="flex-1 px-6 pt-12">
        <Text className="text-white/40 text-xs uppercase tracking-wider">Profile</Text>
        <Text className="text-white text-4xl font-bold mt-2 tracking-tight">Account</Text>

        <View className="mt-8 rounded-2xl p-6 border border-white/10 bg-white/[0.03]">
          <Text className="text-white/40 text-xs uppercase tracking-wider mb-1">
            Signed in as
          </Text>
          <Text className="text-white text-base font-semibold">{user?.email ?? '—'}</Text>
        </View>

        <Pressable
          onPress={signOut}
          className="mt-6 rounded-2xl border border-white/15 py-4 items-center active:opacity-80"
        >
          <Text className="text-white font-semibold text-base">Sign out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
