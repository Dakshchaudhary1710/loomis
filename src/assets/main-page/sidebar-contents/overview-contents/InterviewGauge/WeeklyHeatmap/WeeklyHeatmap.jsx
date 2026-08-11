import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";
import "./WeeklyHeatmap.css";

/**
 * Weekly Performance
 * Bar chart of daily practice completion (%).
 * The current/future day (no data yet) renders as a dashed outline bar.
 */

const DEFAULT_DATA = [
  { day: "Mon", value: 62 },
  { day: "Tue", value: 78 },
  { day: "Wed", value: 55 },
  { day: "Thu", value: 88 },
  { day: "Fri", value: 45 },
  { day: "Sat", value: 70 },
  { day: "Sun", value: 55, isFuture: true },
];

const RANGE_OPTIONS = ["This Week", "Last Week", "This Month"];

export default function WeeklyHeatmap({ data = DEFAULT_DATA }) {
  const [range, setRange] = useState(RANGE_OPTIONS[0]);

  return (
    <div className="weekly-performance">
      {/* Top-right filter */}
      <div className="weekly-performance__header">
        <select
          className="weekly-performance__select"
          aria-label="Select date range"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          {RANGE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 4, bottom: 0, left: -18 }}
        >
          <defs>
            <linearGradient
              id="weeklyBarGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#8B7CF6" />
              <stop offset="100%" stopColor="#5B4CDB" />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke="#F0F0F5"
          />

          <YAxis
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tickFormatter={(v) => `${v}%`}
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 11,
              fill: "#9291A3",
            }}
            width={44}
          />

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{
              fontSize: 12,
              fill: "#55536B",
              fontWeight: 600,
            }}
          />

          <Bar
            dataKey="value"
            radius={[6, 6, 0, 0]}
            maxBarSize={28}
          >
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={
                  entry.isFuture
                    ? "transparent"
                    : "url(#weeklyBarGradient)"
                }
                stroke={
                  entry.isFuture
                    ? "#C7C0F5"
                    : "none"
                }
                strokeDasharray={
                  entry.isFuture
                    ? "4 3"
                    : "0"
                }
                strokeWidth={
                  entry.isFuture
                    ? 1.5
                    : 0
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}