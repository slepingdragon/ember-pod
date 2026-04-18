import Svg, { Path } from 'react-native-svg';

type Props = { size?: number; color?: string; strokeWidth?: number };

/**
 * T-shirt silhouette — neckline + shoulder seam + two sleeves.
 * Line art only, no fill, monochrome.
 */
export function TshirtIcon({ size = 24, color = '#FFFFFF', strokeWidth = 1.5 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8.5 3.5 L5 5 L3 9 L5.5 10.5 L7 9.5 V20 H17 V9.5 L18.5 10.5 L21 9 L19 5 L15.5 3.5 C15.5 5 14 6 12 6 C10 6 8.5 5 8.5 3.5 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}
