import type { StatusSlice } from "@/types/dashboard";
import { ORDER_STATUS_LABELS } from "../shared/StatusBadge";

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const StatusDonut = ({ slices }: { slices: StatusSlice[] }) => {
  const total = slices.reduce((sum, s) => sum + s.count, 0);
  let offset = 0;

  return (
    <div className="dash-donut">
      <div className="dash-donut__ring">
        <svg viewBox="0 0 140 140" role="img" aria-label="Orders by status">
          <circle cx="70" cy="70" r={RADIUS} className="dash-donut__track" />
          {total > 0 &&
            slices.map((slice) => {
              const length = (slice.count / total) * CIRCUMFERENCE;
              const circle = (
                <circle
                  key={slice.status}
                  cx="70"
                  cy="70"
                  r={RADIUS}
                  className={`dash-donut__slice dash-tone--${slice.status}`}
                  strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += length;
              return circle;
            })}
        </svg>
        <span className="dash-donut__total">
          <strong>{total}</strong>
          <small>orders</small>
        </span>
      </div>
      <ul className="dash-donut__legend">
        {slices.map((slice) => (
          <li key={slice.status}>
            <span className={`dash-dot dash-tone--${slice.status}`} />
            {ORDER_STATUS_LABELS[slice.status]}
            <strong>{slice.count}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatusDonut;
