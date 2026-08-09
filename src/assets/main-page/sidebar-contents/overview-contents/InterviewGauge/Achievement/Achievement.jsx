import React from "react";
import "./Achievement.css";

/**
 * Achievement
 * Shows the most recently unlocked badge plus a compact strip of others.
 * Replace `latest` / `others` with GET /api/achievements
 */

const DEFAULT_LATEST = {
  icon: "🔥",
  title: "7-Day Streak",
  description: "You've practiced every day this week. Keep the momentum going!",
  unlockedAt: "Today",
};

const DEFAULT_OTHERS = [
  { icon: "🎯", title: "First Mock Interview", unlocked: true },
  { icon: "💯", title: "100 Questions Solved", unlocked: true },
  { icon: "🧠", title: "System Design Pro", unlocked: true },
  { icon: "🏆", title: "30-Day Streak", unlocked: false },
  { icon: "⚡", title: "Speed Solver", unlocked: false },
];

export default function Achievement({ latest = DEFAULT_LATEST, others = DEFAULT_OTHERS }) {
  return (
    <div className="achievement">
      <div className="achievement__hero">
        <div className="achievement__icon">{latest.icon}</div>
        <div>
          <div className="achievement__title">{latest.title}</div>
          <div className="achievement__desc">{latest.description}</div>
          <div className="achievement__unlocked">Unlocked {latest.unlockedAt}</div>
        </div>
      </div>

      <div className="achievement__strip">
        {others.map((b) => (
          <div
            key={b.title}
            className={`achievement__badge ${b.unlocked ? "" : "achievement__badge--locked"}`}
            title={b.title}
          >
            <span className="achievement__badge-icon">{b.unlocked ? b.icon : "🔒"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}