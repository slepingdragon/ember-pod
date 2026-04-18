import { BlurView } from 'expo-blur';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

type GlassRadius = 'lg' | 'xl' | '2xl' | '3xl' | 'full';

const RADIUS_MAP: Record<GlassRadius, number> = {
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 28,
  full: 9999,
};

type Props = {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  /** Slightly brighter card — matches the landing page's `.glass-strong`. */
  strong?: boolean;
  radius?: GlassRadius;
  /** When set, the whole card becomes pressable. */
  onPress?: () => void;
  /** When true, disabled press style. */
  disabled?: boolean;
};

/**
 * Glass card matching the landing page's `.glass` / `.glass-strong` classes:
 *
 *   backdrop-filter: blur(20px) saturate(140%);
 *   background: rgba(255,255,255,0.03);   // 0.06 for strong
 *   border: 1px solid rgba(255,255,255,0.08); // 0.10 for strong
 *
 * On native, `backdrop-filter` becomes `BlurView` absolutely-filled beneath a
 * tinted overlay. `experimentalBlurMethod="dimezisBlurView"` gives proper blur
 * on Android (API 31+ uses system RenderEffect, older falls back gracefully).
 */
export function GlassCard({
  children,
  style,
  strong = false,
  radius = '2xl',
  onPress,
  disabled,
}: Props) {
  const borderRadius = RADIUS_MAP[radius];
  const tintColor = strong ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)';
  const borderColor = strong ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.08)';
  const intensity = strong ? 30 : 20;

  const shell: ViewStyle = {
    borderRadius,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor,
    position: 'relative',
  };

  const content = (
    <>
      <BlurView
        intensity={intensity}
        tint="dark"
        experimentalBlurMethod="dimezisBlurView"
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[StyleSheet.absoluteFill, { backgroundColor: tintColor }]}
        pointerEvents="none"
      />
      <View style={{ position: 'relative' }}>{children}</View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          shell,
          style as ViewStyle,
          pressed && { opacity: 0.85 },
          disabled && { opacity: 0.4 },
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={[shell, style as ViewStyle]}>{content}</View>;
}
