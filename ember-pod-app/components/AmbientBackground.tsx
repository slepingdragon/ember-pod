import { View } from 'react-native';

/**
 * Mirrors the landing page's `.ambient` effect — two huge soft white blobs
 * sitting behind everything, giving the UI a subtle depth glow against the
 * near-black background. We fake a radial gradient by stacking circular Views
 * with low-opacity fills; against `#050505` the eye reads it as soft light.
 *
 * Sits at the root underneath all other content (pointerEvents="none").
 */
export function AmbientBackground() {
  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {/* Top-left glow */}
      <View
        style={{
          position: 'absolute',
          top: -260,
          left: -200,
          width: 640,
          height: 640,
          borderRadius: 9999,
          backgroundColor: 'rgba(255,255,255,0.07)',
        }}
      />
      {/* Smaller inner core for a brighter center */}
      <View
        style={{
          position: 'absolute',
          top: -140,
          left: -80,
          width: 380,
          height: 380,
          borderRadius: 9999,
          backgroundColor: 'rgba(255,255,255,0.05)',
        }}
      />
      {/* Bottom-right glow */}
      <View
        style={{
          position: 'absolute',
          bottom: -240,
          right: -180,
          width: 560,
          height: 560,
          borderRadius: 9999,
          backgroundColor: 'rgba(255,255,255,0.05)',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: -120,
          right: -60,
          width: 320,
          height: 320,
          borderRadius: 9999,
          backgroundColor: 'rgba(255,255,255,0.04)',
        }}
      />
    </View>
  );
}
