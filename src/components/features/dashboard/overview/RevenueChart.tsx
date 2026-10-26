import { formatPrice } from "@/packages/utils/format";
import type { RevenuePoint } from "@/types/dashboard";

const WIDTH = 720;
const HEIGHT = 240;
const PAD = { top: 16, right: 8, bottom: 8, left: 8 };

/** Rounds a value up to a tidy axis maximum (e.g. 38,200 → 40,000). */
const niceMax = (value: number): number => {
  if (value <= 0) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  return Math.ceil(value / magnitude) * magnitude;
};

const RevenueChart = ({ data }: { data: RevenuePoint[] }) => {
  if (data.length < 2) return null;

  const max = niceMax(Math.max(...data.map((d) => d.value)));
  const innerW = WIDTH - PAD.left - PAD.right;
  const innerH = HEIGHT - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (i / (data.length - 1)) * innerW;
  const y = (v: number) => PAD.top + innerH - (v / max) * innerH;

  const line = data.map(
    (d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`,
  );
  const area = `M${x(0)},${y(0)} L${line.join(" L")} L${x(data.length - 1)},${y(0)} Z`;
  const gridLines = [0.25, 0.5, 0.75, 1];

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <figure className="dash-chart">
      <figcaption className="dash-sr-only">
        Daily revenue for the last {data.length} days, {formatPrice(total)} in
        total.
      </figcaption>
      <div className="dash-chart__body">
        <ul className="dash-chart__axis" aria-hidden="true">
          {[...gridLines].reverse().map((g) => (
            <li key={g}>{formatPrice(Math.round(max * g))}</li>
          ))}
          <li>₹0</li>
        </ul>
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="none"
          role="img"
          aria-label="Revenue per day"
        >
          {gridLines.map((g) => (
            <line
              key={g}
              x1={PAD.left}
              x2={WIDTH - PAD.right}
              y1={y(max * g)}
              y2={y(max * g)}
              className="dash-chart__grid"
            />
          ))}
          <path d={area} className="dash-chart__area" />
          <polyline
            points={line.join(" ")}
            className="dash-chart__line"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          {data.map((d, i) => (
            <rect
              key={d.label}
              x={x(i) - innerW / data.length / 2}
              y={PAD.top}
              width={innerW / data.length}
              height={innerH}
              className="dash-chart__hit"
            >
              <title>{`${d.label}: ${formatPrice(d.value)}`}</title>
            </rect>
          ))}
        </svg>
      </div>
      <div className="dash-chart__dates" aria-hidden="true">
        <span>{data[0].label}</span>
        <span>{data[Math.floor(data.length / 2)].label}</span>
        <span>{data[data.length - 1].label}</span>
      </div>
    </figure>
  );
};

export default RevenueChart;
