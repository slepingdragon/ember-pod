import Svg, { Path } from 'react-native-svg';

type Props = { size?: number; color?: string; strokeWidth?: number };

/**
 * Sticker — rounded-square with a peeled bottom-right corner.
 */
export function StickerIcon({ size = 24, color = '#FFFFFF', strokeWidth = 1.5 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Main body with peeled corner */}
      <Path
        d="M5 5 C5 4 6 3 7 3 H17 C18 3 19 4 19 5 V14 L14 20 H7 C6 20 5 19 5 18 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Peel fold */}
      <Path
        d="M19 14 L14 14 L14 20"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}
