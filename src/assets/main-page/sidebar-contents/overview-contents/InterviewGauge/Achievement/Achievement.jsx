import { FaCrown, FaMedal } from "react-icons/fa6";
import "./Achievement.css";

/**
 * Recent Achievements
 * Latest unlocked badges with XP earned. Replace `achievements` with
 * GET /api/achievements?limit=2
 */

const DEFAULT_ACHIEVEMENTS = [
  {
    id: 1,
    title: "Consistency King",
    emoji: "🔥",
    description: "7 days of consistent practice",
    xp: 100,
    icon: <FaCrown />,
    color: "#8B5CF6",
  },
  {
    id: 2,
    title: "Mock Master",
    emoji: "",
    description: "Completed 5 mock interviews",
    xp: 150,
    icon: <FaMedal />,
    color: "#3B82F6",
  },
];

export default function Achievement({ achievements = DEFAULT_ACHIEVEMENTS }) {
  return (
    <div className="achievement">
      <button className="achievement__view-all">View All</button>

      {achievements.map((a) => (
        <div key={a.id} className="achievement__row">
          <div
            className="achievement__icon"
            style={{ background: `${a.color}1A`, color: a.color }}
          >
            {a.icon}
          </div>

          <div className="achievement__body">
            <div className="achievement__title-row">
              <span className="achievement__title">
                {a.title} {a.emoji}
              </span>
              <span className="achievement__xp">+{a.xp} XP</span>
            </div>
            <div className="achievement__desc">{a.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}