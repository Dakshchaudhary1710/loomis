import { FaSitemap, FaLayerGroup, FaUserGroup, FaCode, FaDatabase } from "react-icons/fa6";
import "./TopicMastery.css";

/**
 * Topic Mastery
 * Progress bars per topic, each with an icon badge + trend indicator.
 * Replace `topics` with GET /api/topic-mastery
 */

const DEFAULT_TOPICS = [
  { topic: "System Design", mastery: 92, trend: "up", icon: <FaSitemap />, color: "#22C55E" },
  { topic: "Data Structures", mastery: 81, trend: "up", icon: <FaLayerGroup />, color: "#14B8A6" },
  { topic: "Behavioral", mastery: 74, trend: "flat", icon: <FaUserGroup />, color: "#F59E0B" },
  { topic: "Algorithms", mastery: 65, trend: "down", icon: <FaCode />, color: "#EC4899" },
  { topic: "SQL & Databases", mastery: 48, trend: "up", icon: <FaDatabase />, color: "#3B82F6" },
];

const TREND_META = {
  up: { symbol: "▲", color: "#16A34A" },
  down: { symbol: "▼", color: "#DC2626" },
  flat: { symbol: "–", color: "#9291A3" },
};

export default function TopicMastery({ topics = DEFAULT_TOPICS }) {
  return (
    <div className="topic-mastery">
      <button className="topic-mastery__view-all">View All</button>

      {topics.map((t) => {
        const trend = TREND_META[t.trend];
        return (
          <div key={t.topic} className="topic-mastery__row">
            <div
              className="topic-mastery__icon"
              style={{ background: `${t.color}1A`, color: t.color }}
            >
              {t.icon}
            </div>

            <div className="topic-mastery__main">
              <div className="topic-mastery__top">
                <span className="topic-mastery__name">{t.topic}</span>
                <span className="topic-mastery__value">
                  {t.mastery}%
                  <span className="topic-mastery__trend" style={{ color: trend.color }}>
                    {trend.symbol}
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
          </div>
        );
      })}
    </div>
  );
}

function masteryColor(value) {
  if (value >= 80) return "linear-gradient(90deg, #34C759, #6FE39A)";
  if (value >= 55) return "linear-gradient(90deg, #F5A524, #FFC96B)";
  return "linear-gradient(90deg, #E5484D, #FF8A8F)";
}