import { ActivityIndicator, View } from 'react-native';

// Placeholder landing route. The gate in app/_layout.tsx replaces this
// immediately with (auth) or (tabs) depending on state.
export default function RootIndex() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
      <ActivityIndicator color="#FFFFFF" size="large" />
    </View>
  );
}
