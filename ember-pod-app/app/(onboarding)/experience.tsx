import { Redirect } from 'expo-router';

// Legacy onboarding — deprecated. We no longer ask users to self-identify
// experience level. Kept as a redirect so any old deep-link or stale auth
// flow lands cleanly on the dashboard.
export default function DeprecatedExperienceScreen() {
  return <Redirect href="/home" />;
}
