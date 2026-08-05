import {
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function MiniLineChart({ data, color }) {
  return (
    <ResponsiveContainer width="100%" height={70}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}