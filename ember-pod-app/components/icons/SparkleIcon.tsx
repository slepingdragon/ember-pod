import Svg, { Path } from 'react-native-svg';

type Props = { size?: number; color?: string; strokeWidth?: number };

/**
 * Four-point sparkle + a tiny second sparkle — AI / generate vibe.
 */
export function SparkleIcon({ size = 24, color = '#FFFFFF', strokeWidth = 1.5 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Big 4-point star */}
      <Path
        d="M10 3 C10 7 11 8 15 8 C11 8 10 9 10 13 C10 9 9 8 5 8 C9 8 10 7 10 3 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* Smaller 4-point star */}
      <Path
        d="M17 13 C17 15 17.5 15.5 19.5 15.5 C17.5 15.5 17 16 17 18 C17 16 16.5 15.5 14.5 15.5 C16.5 15.5 17 15 17 13 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
