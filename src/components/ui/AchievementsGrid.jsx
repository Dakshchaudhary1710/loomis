import React from "react";
import { FaFire, FaTrophy, FaBolt, FaAward, FaCheck } from "react-icons/fa6";

const ACHIEVEMENTS = [
  {
    id: 1,
    icon: <FaFire />,
    title: "14-Day Streak",
    desc: "Active practice every day for 2 weeks",
    unlocked: true,
    color: "#EF4444",
  },
  {
    id: 2,
    icon: <FaTrophy />,
    title: "100 Questions Solved",
    desc: "Passed automated code verification tests",
    unlocked: true,
    color: "#F59E0B",
  },
  {
    id: 3,
    icon: <FaBolt />,
    title: "React Fundamentals Mastered",
    desc: "Achieved >80% accuracy across React core",
    unlocked: true,
    color: "#6366F1",
  },
  {
    id: 4,
    icon: <FaAward />,
    title: "First Full-Stack Project",
    desc: "Connect React state with authenticated API endpoints",
    unlocked: false,
    color: "#10B981",
  },
];

export default function AchievementsGrid() {
  return (
    <div className="achievements-card-section">
      <div className="achievements-header">
        <div>
          <h3 className="ach-title">Milestones & Badges</h3>
          <p className="ach-subtitle">Meaningful milestones earned through verified skill mastery</p>
        </div>
        <span className="ach-count-pill">3 of 4 Unlocked</span>
      </div>

      <div className="achievements-grid">
        {ACHIEVEMENTS.map((item) => (
          <div
            key={item.id}
            className={`achievement-tile ${item.unlocked ? "is-unlocked" : "is-locked"}`}
          >
            <div
              className="ach-tile-icon"
              style={{ backgroundColor: `${item.color}15`, color: item.color }}
            >
              {item.icon}
            </div>

            <div className="ach-tile-body">
              <div className="ach-tile-top">
                <h4 className="ach-tile-title">{item.title}</h4>
                {item.unlocked ? (
                  <span className="unlocked-badge"><FaCheck /> Solved</span>
                ) : (
                  <span className="locked-badge">In Progress</span>
                )}
              </div>
              <p className="ach-tile-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
