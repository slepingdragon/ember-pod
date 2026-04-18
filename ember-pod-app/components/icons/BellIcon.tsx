import Svg, { Path } from 'react-native-svg';

type Props = { size?: number; color?: string; strokeWidth?: number };

/**
 * Bell — for notifications / inbox entry point.
 */
export function BellIcon({ size = 24, color = '#FFFFFF', strokeWidth = 1.5 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Bell body */}
      <Path
        d="M6 17 C5 17 4.5 16 5.25 15 C6 14 6 13 6 11 C6 7.5 8.5 5 12 5 C15.5 5 18 7.5 18 11 C18 13 18 14 18.75 15 C19.5 16 19 17 18 17 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Clapper */}
      <Path
        d="M10 19.5 C10.5 20.25 11.25 20.5 12 20.5 C12.75 20.5 13.5 20.25 14 19.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Antenna */}
      <Path
        d="M12 3 V5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
}
