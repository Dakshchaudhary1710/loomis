import "./StatsCard.css";
import MiniLineChart from "./MiniLineChart";

// Turns "#6C3CF5" into "rgba(108, 60, 245, 0.14)" so the icon badge
// gets a soft tinted background instead of a solid saturated circle.
function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  color,
  data,
  trend, // optional: { direction: "up" | "down", label: "+2 this week" }
}) {
  return (
    <div className="stats-card">

      <div className="stats-card__top">
        <div
          className="stats-card__icon"
          style={{ background: hexToRgba(color, 0.14), color }}
        >
          {icon}
        </div>

        {trend && (
          <div className={`stats-card__trend stats-card__trend--${trend.direction}`}>
            <span>{trend.direction === "up" ? "▲" : "▼"}</span>
            {trend.label}
          </div>
        )}
      </div>

      <div className="stats-card__body">
        <div className="stats-card__label">{title}</div>
        <div className="stats-card__value">{value}</div>
        <div className="stats-card__subtitle">{subtitle}</div>
      </div>

      <div className="stats-card__chart">
        <MiniLineChart data={data} color={color} />
      </div>

    </div>
  );
}