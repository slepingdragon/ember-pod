import Svg, { Path } from 'react-native-svg';

type Props = { size?: number; color?: string; strokeWidth?: number };

/**
 * Plus — used for empty-state CTAs ("Build your first product").
 */
export function PlusIcon({ size = 24, color = '#FFFFFF', strokeWidth = 1.75 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5 V19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Path d="M5 12 H19" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Svg>
  );
}
