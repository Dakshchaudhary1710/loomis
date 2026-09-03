import React from "react";
import { Link } from "react-router-dom";
import { HiArrowRight, HiSparkles } from "react-icons/hi";
import { FaFire, FaBolt } from "react-icons/fa6";

export default function AdaptiveHero({ name = "Alex", streakCount = 14 }) {
  return (
    <div className="adaptive-hero-card">
      <div className="adaptive-hero-glow"></div>
      <div className="adaptive-hero-content">
        <div className="adaptive-hero-header">
          <div className="adaptive-badge">
            <HiSparkles className="badge-sparkle" />
            <span>Learn • Practice • Master</span>
          </div>
          <div className="hero-streak-pill">
            <FaFire className="streak-fire" />
            <span>{streakCount} Day Streak</span>
          </div>
        </div>

        <h1 className="hero-greeting">
          Good morning, <span className="highlight-name">{name}</span> 👋
        </h1>

        <p className="hero-statement">
          "You're <strong>72%</strong> through your <strong>Full-Stack roadmap</strong>. Your <strong>JavaScript fundamentals</strong> are strong — let's strengthen <strong>React state management</strong> next."
        </p>

        <div className="hero-meta-row">
          <div className="hero-progress-group">
            <div className="progress-label-row">
              <span className="progress-title">Full-Stack Developer Roadmap</span>
              <span className="progress-pct">72%</span>
            </div>
            <div className="hero-progress-track">
              <div className="hero-progress-fill" style={{ width: "72%" }}>
                <span className="fill-glow"></span>
              </div>
            </div>
          </div>

          <div className="hero-actions">
            <Link to="/main/studyplan" className="btn-primary-glow">
              <span>Continue Learning</span>
              <HiArrowRight />
            </Link>
            <Link to="/main/aicoach" className="btn-secondary-dark">
              <FaBolt />
              <span>Ask AI Coach</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
