import { useMemo } from 'react';
import { View } from 'react-native';
import Svg, { Line, Path } from 'react-native-svg';

type Props = {
  /** Series of dollar values. Pass an empty array for the empty state. */
  data?: number[];
  width: number;
  height?: number;
  color?: string;
};

/**
 * Robinhood-style line chart.
 *
 * Empty state (no data): a flat dashed line at center with a faint zero axis —
 * the Robinhood "welcome, nothing yet" shape. No fake curves, no puff.
 *
 * When real data lands (Supabase `earnings_daily` rollup), pass it via `data`
 * and it renders a single solid polyline scaled to the view. Deliberately
 * simple — no gradients, no dots, no filled area under the curve.
 */
export function EarningsChart({ data = [], width, height = 160, color = '#FFFFFF' }: Props) {
  const pathD = useMemo(() => {
    if (data.length < 2) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const stepX = width / (data.length - 1);
    const pad = 10;
    const h = height - pad * 2;
    return data
      .map((v, i) => {
        const x = i * stepX;
        const y = pad + h - ((v - min) / range) * h;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(' ');
  }, [data, width, height]);

  const midY = height / 2;

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        {pathD ? (
          <Path d={pathD} stroke={color} strokeWidth={1.75} fill="none" strokeLinejoin="round" />
        ) : (
          // Empty state — flat dashed baseline, centered
          <Line
            x1={0}
            x2={width}
            y1={midY}
            y2={midY}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={1.25}
            strokeDasharray="4 6"
          />
        )}
      </Svg>
    </View>
  );
}
