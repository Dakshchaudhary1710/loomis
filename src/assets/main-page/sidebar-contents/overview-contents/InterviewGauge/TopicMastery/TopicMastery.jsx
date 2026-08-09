import React from "react";
import "./TopicMastery.css";

/**
 * Topic Mastery
 * Progress bars per topic area, sorted strongest -> weakest.
 * Replace `topics` with GET /api/topic-mastery -> [{ topic, mastery }]
 */

const DEFAULT_TOPICS = [
  { topic: "System Design", mastery: 92, trend: "up" },
  { topic: "Data Structures", mastery: 81, trend: "up" },
  { topic: "Behavioral", mastery: 74, trend: "flat" },
  { topic: "Algorithms", mastery: 65, trend: "down" },
  { topic: "SQL & Databases", mastery: 48, trend: "up" },
];

const TREND_ICON = { up: "▲", down: "▼", flat: "•" };
const TREND_COLOR = { up: "#34C759", down: "#E5484D", flat: "#7B7B8A" };

export default function TopicMastery({ topics = DEFAULT_TOPICS }) {
  return (
    <div className="topic-mastery">
      {topics.map((t) => (
        <div key={t.topic} className="topic-mastery__row">
          <div className="topic-mastery__top">
            <span className="topic-mastery__name">{t.topic}</span>
            <span className="topic-mastery__value">
              {t.mastery}%
              <span
                className="topic-mastery__trend"
                style={{ color: TREND_COLOR[t.trend] }}
              >
                {TREND_ICON[t.trend]}
              </span>
            </span>
          </div>
          <div className="topic-mastery__bar">
            <div
              className="topic-mastery__bar-fill"
              style={{ width: `${t.mastery}%`, background: masteryColor(t.mastery) }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function masteryColor(value) {
  if (value >= 80) return "linear-gradient(90deg, #34C759, #6FE39A)";
  if (value >= 55) return "linear-gradient(90deg, #F5A524, #FFC96B)";
  return "linear-gradient(90deg, #E5484D, #FF8A8F)";
}