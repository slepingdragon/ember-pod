import { ActivityIndicator, View } from 'react-native';

// Placeholder landing route. The gate in app/_layout.tsx replaces this
// immediately with (auth), (onboarding), or (tabs) depending on state.
export default function RootIndex() {
  return (
    <View className="flex-1 items-center justify-center bg-ink-950">
      <ActivityIndicator color="#FFFFFF" size="large" />
    </View>
  );
}
