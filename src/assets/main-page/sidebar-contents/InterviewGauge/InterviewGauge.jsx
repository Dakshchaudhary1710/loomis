import "./InterviewGauge.css";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer
} from "recharts";

import { FaRegLightbulb } from "react-icons/fa";

export default function InterviewGauge({ score }) {

  const data = [
    {
      name: "Readiness",
      value: score,
      fill: "#7C3AED"
    }
  ];

  return (
    <div className="gauge-card">

      <h2>Interview Readiness Gauge</h2>

      <div className="gauge-chart">

        <ResponsiveContainer width="100%" height={260}>
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              dataKey="value"
              cornerRadius={15}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        <div className="gauge-score">
          <h1>{score}%</h1>
          <p>You're on the right track!</p>
        </div>

      </div>

      <div className="gauge-tip">

        <FaRegLightbulb
          size={26}
          color="#7C3AED"
        />

        <p>
          Focus on improving your behavioral
          answers and system design concepts.
        </p>

      </div>

    </div>
  );
}