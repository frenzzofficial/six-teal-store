interface SparklineProps {
  values: number[];
}

const WIDTH = 120;
const HEIGHT = 36;

/** A tiny trend line for a KPI card. Decorative: the number next to it carries the meaning. */
const Sparkline = ({ values }: SparklineProps) => {
  if (values.length < 2) return null;

  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const step = WIDTH / (values.length - 1);

  const points = values
    .map(
      (v, i) =>
        `${(i * step).toFixed(1)},${(HEIGHT - 3 - ((v - min) / span) * (HEIGHT - 6)).toFixed(1)}`,
    )
    .join(" ");

  return (
    <svg
      className="dash-spark"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export default Sparkline;
