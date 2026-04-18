import Svg, { Path } from 'react-native-svg';

type Props = { size?: number; color?: string; strokeWidth?: number };

/**
 * Storefront — awning on top, building below, door in center.
 */
export function ShopIcon({ size = 24, color = '#FFFFFF', strokeWidth = 1.5 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Awning */}
      <Path
        d="M3 8 L5 4 H19 L21 8 C21 9.5 20 10.5 18.5 10.5 C17 10.5 16 9.5 16 8 C16 9.5 15 10.5 13.5 10.5 C12.5 10.5 11.5 10 11 9 C10.5 10 9.5 10.5 8.5 10.5 C7 10.5 6 9.5 6 8 C6 9.5 5 10.5 3.5 10.5 C2.5 10.5 2 9.5 3 8 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Building body */}
      <Path
        d="M4.5 10.5 V20 H19.5 V10.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Door */}
      <Path
        d="M10 20 V14 H14 V20"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}
