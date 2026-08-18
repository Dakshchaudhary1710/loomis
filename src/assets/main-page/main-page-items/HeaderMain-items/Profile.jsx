import { useState } from "react";
import {
  FiUser,
  FiCamera,
  FiMail,
  FiCalendar,
  FiTarget,
  FiTrendingUp,
  FiAward,
  FiClock,
  FiEdit2,
} from "react-icons/fi";
import { HiFire } from "react-icons/hi";
import "./Profile.css";

const STATS = [
  { label: "Day streak", value: "14", icon: HiFire },
  { label: "Questions solved", value: "128", icon: FiTarget },
  { label: "Avg. score", value: "82%", icon: FiTrendingUp },
  { label: "Badges earned", value: "6", icon: FiAward },
];

const FOCUS_TOPICS = [
  "Data Structures & Algorithms",
  "System Design",
  "Behavioral",
];

const RECENT_ACTIVITY = [
  { title: "Completed mock interview — System Design", time: "2 hours ago" },
  { title: "Solved 5 questions in Question Bank", time: "Yesterday" },
  { title: "Hit a 14-day streak", time: "Yesterday" },
  { title: "Updated Study Plan focus topics", time: "3 days ago" },
];

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="profile-stat-card">
      <div className="profile-stat-icon">
        <Icon />
      </div>
      <div>
        <p className="profile-stat-value">{value}</p>
        <p className="profile-stat-label">{label}</p>
      </div>
    </div>
  );
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-page-header">
        <div className="profile-hero">
          <div className="profile-hero-avatar-wrap">
            <div className="profile-hero-avatar">DC</div>
            <button type="button" className="profile-avatar-edit-btn" aria-label="Change photo">
              <FiCamera />
            </button>
          </div>

          <div className="profile-hero-info">
            <h1>Daksh</h1>
            <p className="profile-hero-role">Student</p>
            <div className="profile-hero-meta">
              <span>
                <FiMail /> daksh@example.com
              </span>
              <span>
                <FiCalendar /> Joined March 2025
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="profile-edit-btn"
          onClick={() => setIsEditing((v) => !v)}
        >
          <FiEdit2 /> {isEditing ? "Save changes" : "Edit profile"}
        </button>
      </div>

      {/* Stats */}
      <div className="profile-stats-grid">
        {STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="profile-layout">
        {/* Left column */}
        <div className="profile-main">
          <section className="profile-section">
            <h2 className="profile-section-title">
              <FiUser /> About
            </h2>
            {isEditing ? (
              <textarea
                className="profile-textarea"
                placeholder="Write a short bio..."
                defaultValue=""
              />
            ) : (
              <p className="profile-bio-text">
                No bio added yet. Click "Edit profile" to introduce yourself.
              </p>
            )}
          </section>

          <section className="profile-section">
            <h2 className="profile-section-title">
              <FiTarget /> Focus topics
            </h2>
            <div className="profile-chip-group">
              {FOCUS_TOPICS.map((topic) => (
                <span key={topic} className="profile-chip">
                  {topic}
                </span>
              ))}
            </div>
          </section>

          <section className="profile-section">
            <h2 className="profile-section-title">
              <FiClock /> Recent activity
            </h2>
            <ul className="profile-activity-list">
              {RECENT_ACTIVITY.map((item, i) => (
                <li key={i} className="profile-activity-item">
                  <span className="profile-activity-dot" />
                  <div>
                    <p className="profile-activity-title">{item.title}</p>
                    <p className="profile-activity-time">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right column */}
        <aside className="profile-side">
          <section className="profile-section">
            <h2 className="profile-section-title">
              <FiAward /> Badges
            </h2>
            <div className="profile-badge-grid">
              {["7-Day Streak", "First Mock Interview", "50 Questions", "System Design Novice"].map(
                (badge) => (
                  <div key={badge} className="profile-badge">
                    <FiAward />
                    <span>{badge}</span>
                  </div>
                )
              )}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}