import React from "react";
import "./InterviewGauge.css";

/**
 * Interview Readiness Gauge
 * A semicircle gauge showing overall readiness %, plus a short
 * breakdown of the factors feeding into it.
 *
 * Replace `score` and `factors` with real data from your backend, e.g.
 * GET /api/readiness -> { score: 78, factors: [...] }
 */

const DEFAULT_FACTORS = [
  { label: "Practice Consistency", value: 85 },
  { label: "Topic Coverage", value: 70 },
  { label: "Mock Interview Scores", value: 76 },
];

export default function InterviewGauge({ score = 78, factors = DEFAULT_FACTORS }) {
  const clamped = Math.max(0, Math.min(100, score));
  const angle = (clamped / 100) * 180; // 0-180 degrees across the semicircle
  const radius = 80;
  const cx = 100;
  const cy = 100;

  const needleRad = ((180 - angle) * Math.PI) / 180;
  const needleX = cx + radius * 0.72 * Math.cos(needleRad);
  const needleY = cy - radius * 0.72 * Math.sin(needleRad);

  return (
    <div className="readiness-gauge">
      <svg viewBox="0 0 200 120" className="readiness-gauge__svg">
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#EDEBFA"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${(clamped / 100) * 251.2} 251.2`}
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E5484D" />
            <stop offset="50%" stopColor="#F5A524" />
            <stop offset="100%" stopColor="#34C759" />
          </linearGradient>
        </defs>
        <line
          x1={cx}
          y1={cy}
          x2={needleX}
          y2={needleY}
          stroke="#1A1A24"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="5" fill="#1A1A24" />
      </svg>

      <div className="readiness-gauge__score">
        <span className="readiness-gauge__number">{clamped}%</span>
        <span className="readiness-gauge__label">{scoreLabel(clamped)}</span>
      </div>

      <div className="readiness-gauge__factors">
        {factors.map((f) => (
          <div key={f.label} className="readiness-gauge__factor">
            <div className="readiness-gauge__factor-top">
              <span>{f.label}</span>
              <span>{f.value}%</span>
            </div>
            <div className="readiness-gauge__bar">
              <div className="readiness-gauge__bar-fill" style={{ width: `${f.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function scoreLabel(score) {
  if (score >= 85) return "Interview Ready";
  if (score >= 60) return "Almost There";
  return "Needs Work";
}