import { ReactNode } from 'react';
import { Pressable, View, ViewStyle } from 'react-native';

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
  /** Slightly brighter fill — use on hover/active cards or primary panels. */
  strong?: boolean;
  radius?: GlassRadius;
  /** When set, the whole card becomes pressable. */
  onPress?: () => void;
  /** When true, disabled press style. */
  disabled?: boolean;
};

/**
 * Flat card — Robinhood-style surface.
 *
 *   background: rgba(255,255,255,0.03)   // 0.05 for strong
 *   border:     1px rgba(255,255,255,0.08) // 0.12 for strong
 *
 * Previously used `BlurView` to mimic the landing page's `backdrop-filter`,
 * but on native that read as a hazy "puff smoke" effect rather than glass.
 * Stripped back to a flat translucent surface, which is what Robinhood's
 * dashboard actually does and which renders identically on iOS/Android/Web.
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
  const backgroundColor = strong ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)';
  const borderColor = strong ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)';

  const shell: ViewStyle = {
    borderRadius,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor,
    backgroundColor,
  };

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
        {children}
      </Pressable>
    );
  }

  return <View style={[shell, style as ViewStyle]}>{children}</View>;
}
