import Svg, { Path } from 'react-native-svg';

type Props = { size?: number; color?: string; strokeWidth?: number };

/**
 * Coffee mug — body + handle + steam wisps.
 */
export function MugIcon({ size = 24, color = '#FFFFFF', strokeWidth = 1.5 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Steam */}
      <Path
        d="M8 3 C8 4 9 4 9 5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Path
        d="M12 2.5 C12 3.5 13 3.5 13 4.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Mug body */}
      <Path
        d="M5 8 H16 V18 C16 19.5 14.5 21 13 21 H8 C6.5 21 5 19.5 5 18 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Handle */}
      <Path
        d="M16 11 H18 C19.5 11 20.5 12 20.5 13.5 C20.5 15 19.5 16 18 16 H16"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}
