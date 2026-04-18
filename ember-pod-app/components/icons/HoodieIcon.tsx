import Svg, { Path } from 'react-native-svg';

type Props = { size?: number; color?: string; strokeWidth?: number };

/**
 * Hoodie silhouette — hood outline + body + center-front seam + kangaroo pocket.
 */
export function HoodieIcon({ size = 24, color = '#FFFFFF', strokeWidth = 1.5 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Body outline */}
      <Path
        d="M8 4 L5 5.5 L3 10 L5.5 11.5 L7 10.5 V20 H17 V10.5 L18.5 11.5 L21 10 L19 5.5 L16 4 C15 6.5 13.5 7.5 12 7.5 C10.5 7.5 9 6.5 8 4 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Hood curve suggestion */}
      <Path
        d="M8 4 C9 6 10.5 7 12 7 C13.5 7 15 6 16 4"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Kangaroo pocket */}
      <Path
        d="M9 14 H15"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Path
        d="M9 14 L10 16.5 H14 L15 14"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}
