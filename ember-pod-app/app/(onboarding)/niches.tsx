import { Redirect } from 'expo-router';

// Legacy onboarding — deprecated. The niche picker didn't match the product
// vision (a beginner should land on a real dashboard, not a survey). Kept as
// a redirect so any stale deep-link lands cleanly on the dashboard.
export default function DeprecatedNichesScreen() {
  return <Redirect href="/home" />;
}
