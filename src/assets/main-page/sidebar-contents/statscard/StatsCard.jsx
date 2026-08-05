import "./StatsCard.css";
import MiniLineChart from "./MiniLineChart";

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  color,
  data,
}) {
  return (
    <div className="stats-card">

      <div className="top">

        <div
          className="icon"
          style={{ background: color }}
        >
          {icon}
        </div>

        <div>
          <h4>{title}</h4>
          <h2>{value}</h2>
          <p>{subtitle}</p>
        </div>

      </div>

      <MiniLineChart
        data={data}
        color={color}
      />

    </div>
  );
}