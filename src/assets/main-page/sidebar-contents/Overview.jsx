import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./overview.css";

import {
  FaCompass,
  FaCode,
  FaRobot,
  FaChartColumn,
  FaAward,
  FaArrowRight,
  FaFire,
  FaCheck,
  FaCircleExclamation,
  FaBolt,
  FaChevronDown,
  FaChevronUp,
  FaCalendarDays,
  FaTrophy,
  FaListCheck,
  FaLock,
} from "react-icons/fa6";
import { FiTarget, FiLayers, FiActivity, FiTrendingUp } from "react-icons/fi";

const TOPICS_DATA = [
  {
    id: "react",
    name: "React & Modern UI",
    score: 82,
    status: "mastered",
    color: "#22C55E",
    subtopics: [
      { name: "Components & JSX", score: 95 },
      { name: "Hooks & Context API", score: 88 },
      { name: "Fiber & Concurrent Rendering", score: 74 },
    ],
  },
  {
    id: "js",
    name: "JavaScript Core",
    score: 76,
    status: "mastered",
    color: "#6C3CF0",
    subtopics: [
      { name: "Language Fundamentals", score: 92 },
      { name: "DOM & Event Loop", score: 78 },
      { name: "Async / Await & Promises", score: 58 },
    ],
  },
  {
    id: "rest",
    name: "REST APIs & Backend",
    score: 54,
    status: "needs-focus",
    color: "#F59E0B",
    subtopics: [
      { name: "HTTP Methods & Headers", score: 90 },
      { name: "Status Codes & Error Handling", score: 85 },
      { name: "Rate Limiting & Middleware", score: 42 },
    ],
  },
  {
    id: "db",
    name: "Databases & SQL",
    score: 41,
    status: "needs-focus",
    color: "#EC4899",
    subtopics: [
      { name: "CRUD SQL Queries", score: 75 },
      { name: "Joins & Relationships", score: 65 },
      { name: "Indexing & Query Optimization", score: 28 },
    ],
  },
  {
    id: "auth",
    name: "Authentication & Security",
    score: 28,
    status: "weak-gap",
    color: "#EF4444",
    subtopics: [
      { name: "Cookies & Session Management", score: 45 },
      { name: "JWT Token Implementation", score: 30 },
      { name: "OAuth 2.0 & Role Permissions", score: 15 },
    ],
  },
];

const MONTHLY_MILESTONES = [
  {
    month: "Month 1",
    title: "JavaScript & DSA Fundamentals",
    status: "completed",
    score: "92% Mastered",
    tasks: "Arrays, Strings, ES6+, Closures",
  },
  {
    month: "Month 2",
    title: "React & Advanced UI Systems",
    status: "current",
    score: "70% in Progress",
    tasks: "Hooks, State Management, API integration",
  },
  {
    month: "Month 3",
    title: "Backend Services, Databases & APIs",
    status: "upcoming",
    score: "Starts in 12 days",
    tasks: "Node/Django, PostgreSQL, JWT Auth",
  },
  {
    month: "Month 4",
    title: "Full-Stack Projects & Job-Readiness",
    status: "locked",
    score: "Final Milestone",
    tasks: "Production Project, Resume ATS & Mocks",
  },
];

const ACHIEVEMENTS_LIST = [
  { id: 1, title: "First 100 Questions", icon: <FaTrophy />, color: "#F59E0B", date: "Unlocked 3d ago" },
  { id: 2, title: "12-Day Practice Streak", icon: <FaFire />, color: "#EF4444", date: "Active Now" },
  { id: 3, title: "React Mastery (82%)", icon: <FaBolt />, color: "#22C55E", date: "Unlocked yesterday" },
  { id: 4, title: "Full-Stack Project MVP", icon: <FaLock />, color: "#94A3B8", date: "Month 4 Goal" },
];

export default function Overview() {
  const [topicFilter, setTopicFilter] = useState("all"); // all | mastered | focus
  const [expandedTopic, setExpandedTopic] = useState("react");

  const filteredTopics = TOPICS_DATA.filter((t) => {
    if (topicFilter === "mastered") return t.score >= 70;
    if (topicFilter === "focus") return t.score < 70;
    return true;
  });

  return (
    <div className="overview-container">
      {/* =========================================================================
          1. TOP CAREER GOAL & SPRINT PROGRESS HERO
      ========================================================================= */}
      <section className="overview-hero-card">
        <div className="overview-hero-left">
          <div className="overview-hero-badge">
            <FiTarget />
            <span>Target Goal: Full-Stack Developer</span>
          </div>
          <h1 className="overview-hero-title">
            Internship-Ready in 4 Months <span className="sprint-pill">Month 2 Sprint</span>
          </h1>
          <p className="overview-hero-desc">
            You've completed <strong>18 of 24 topics</strong> in your personalized roadmap.
            Focus on <strong>Authentication</strong> and <strong>Database Indexing</strong> to close critical skill gaps before Month 3.
          </p>

          <div className="overview-sprint-progress">
            <div className="sprint-progress-meta">
              <span>Sprint 2 Progress (React & APIs)</span>
              <strong>68% Completed</strong>
            </div>
            <div className="sprint-progress-bar">
              <div className="sprint-progress-fill" style={{ width: "68%" }}></div>
            </div>
          </div>
        </div>

        <div className="overview-hero-right">
          <div className="hero-action-buttons">
            <Link to="/main/studyplan" className="hero-btn-primary">
              <span>Resume Study Plan</span>
              <FaArrowRight />
            </Link>
            <Link to="/main/questionbank" className="hero-btn-secondary">
              <FaCode /> Practice Weak Topics
            </Link>
          </div>

          <div className="hero-streak-card">
            <div className="streak-icon-wrap">
              <FaFire className="streak-fire-icon" />
            </div>
            <div>
              <div className="streak-count">12 Days Active</div>
              <div className="streak-sub">Keep going to unlock 15-Day Badge</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CORE METRICS STRIP (4 Key Pillars)
      ========================================================================= */}
      <section className="overview-metrics-grid">
        <div className="metric-box">
          <div className="metric-box-top">
            <span className="metric-box-title">Questions Solved</span>
            <div className="metric-box-icon" style={{ background: "#EEF3FF", color: "#3B82F6" }}>
              <FaCode />
            </div>
          </div>
          <div className="metric-box-val">420 <span className="metric-denom">/ 500</span></div>
          <div className="metric-box-footer">
            <span className="metric-trend up">
              <FiTrendingUp /> +18 this week
            </span>
            <span className="metric-rate">84% Accuracy</span>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-box-top">
            <span className="metric-box-title">Skills Mastered</span>
            <div className="metric-box-icon" style={{ background: "#E9FBEF", color: "#22C55E" }}>
              <FaChartColumn />
            </div>
          </div>
          <div className="metric-box-val">18 <span className="metric-denom">/ 24 Topics</span></div>
          <div className="metric-box-footer">
            <span className="metric-progress-pct">75% Path Mastery</span>
            <span className="metric-rate">2 in-progress</span>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-box-top">
            <span className="metric-box-title">Skill Gaps Flagged</span>
            <div className="metric-box-icon" style={{ background: "#FFEAF4", color: "#EF4444" }}>
              <FaCircleExclamation />
            </div>
          </div>
          <div className="metric-box-val" style={{ color: "#EF4444" }}>2 <span className="metric-denom">Weak Areas</span></div>
          <div className="metric-box-footer">
            <span className="metric-warn-text">Auth (28%) & DB Indexing (28%)</span>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-box-top">
            <span className="metric-box-title">Job Readiness Score</span>
            <div className="metric-box-icon" style={{ background: "#EEE9FF", color: "#6C3CF0" }}>
              <FaAward />
            </div>
          </div>
          <div className="metric-box-val" style={{ color: "#6C3CF0" }}>82%</div>
          <div className="metric-box-footer">
            <span className="metric-trend up">
              <FiTrendingUp /> +6% this month
            </span>
            <span className="metric-rate">Target: 90%+</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. AI SKILL-GAP & ACTION RECOMMENDATIONS
      ========================================================================= */}
      <section className="overview-ai-card">
        <div className="ai-card-header">
          <div className="ai-badge-left">
            <div className="ai-icon-pill">
              <FaRobot />
            </div>
            <div>
              <h3 className="ai-card-title">AI Skill-Gap & Next Action Plan</h3>
              <p className="ai-card-subtitle">Real-time analysis generated from your last 45 coding attempts</p>
            </div>
          </div>
          <span className="ai-status-tag">Priority Action Required</span>
        </div>

        <div className="ai-quote-box">
          <p className="ai-quote-content">
            "Your <strong>React fundamentals are strong (82%)</strong>, but your <strong>API (54%)</strong> and <strong>Authentication performance is lower (28%)</strong>. Focus on REST APIs and session/JWT authentication before moving to advanced full-stack projects in Month 3."
          </p>
        </div>

        <div className="ai-actions-grid">
          <div className="ai-action-card">
            <div className="action-card-step">1</div>
            <div className="action-card-body">
              <h4 className="action-title">Review JWT & Session Auth Fundamentals</h4>
              <p className="action-desc">Understand token lifecycle, refresh tokens, and cookies vs headers.</p>
              <Link to="/main/studyplan" className="action-cta-link">
                <span>Start Lesson</span> <FaArrowRight />
              </Link>
            </div>
          </div>

          <div className="ai-action-card">
            <div className="action-card-step">2</div>
            <div className="action-card-body">
              <h4 className="action-title">Practice 5 SQL Indexing Problems</h4>
              <p className="action-desc">Improve B-Tree index comprehension and query execution plans.</p>
              <Link to="/main/questionbank" className="action-cta-link">
                <span>Practice Questions</span> <FaArrowRight />
              </Link>
            </div>
          </div>

          <div className="ai-action-card">
            <div className="action-card-step">3</div>
            <div className="action-card-body">
              <h4 className="action-title">Build Full-Stack CRUD with JWT Auth</h4>
              <p className="action-desc">Hands-on practice connecting React state with secure API endpoints.</p>
              <Link to="/main/aicoach" className="action-cta-link">
                <span>Open AI Coach</span> <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. TOPIC MASTERY & GRANULAR SUBTOPIC INSPECTOR
      ========================================================================= */}
      <section className="overview-mastery-section">
        <div className="mastery-header">
          <div>
            <h3 className="section-title">Topic Mastery & Deep Understanding</h3>
            <p className="section-subtitle">
              Measured by real problem accuracy across subtopics — not just tutorial completion.
            </p>
          </div>

          <div className="mastery-filters">
            <button
              className={`filter-btn ${topicFilter === "all" ? "active" : ""}`}
              onClick={() => setTopicFilter("all")}
            >
              All Topics ({TOPICS_DATA.length})
            </button>
            <button
              className={`filter-btn ${topicFilter === "mastered" ? "active" : ""}`}
              onClick={() => setTopicFilter("mastered")}
            >
              Mastered ≥70% (2)
            </button>
            <button
              className={`filter-btn ${topicFilter === "focus" ? "active" : ""}`}
              onClick={() => setTopicFilter("focus")}
            >
              Needs Focus &lt;70% (3)
            </button>
          </div>
        </div>

        <div className="mastery-list">
          {filteredTopics.map((topic) => {
            const isExpanded = expandedTopic === topic.id;
            return (
              <div
                key={topic.id}
                className={`mastery-card ${isExpanded ? "expanded" : ""}`}
                onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
              >
                <div className="mastery-card-main">
                  <div className="mastery-card-left">
                    <span
                      className="mastery-dot"
                      style={{ background: topic.color }}
                    ></span>
                    <span className="mastery-name">{topic.name}</span>
                    <span className={`mastery-badge badge-${topic.status}`}>
                      {topic.score >= 70 ? "Mastered" : topic.score >= 40 ? "Needs Reps" : "Critical Gap"}
                    </span>
                  </div>

                  <div className="mastery-card-right">
                    <div className="mastery-bar-wrap">
                      <div className="mastery-bar-track">
                        <div
                          className="mastery-bar-fill"
                          style={{ width: `${topic.score}%`, background: topic.color }}
                        ></div>
                      </div>
                    </div>
                    <span className="mastery-pct-val" style={{ color: topic.color }}>
                      {topic.score}%
                    </span>
                    <button className="expand-toggle-btn" aria-label="Toggle subtopics">
                      {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mastery-subtopics-tray">
                    <div className="subtopics-header">Subtopic Breakdown</div>
                    <div className="subtopics-grid">
                      {topic.subtopics.map((sub) => (
                        <div key={sub.name} className="subtopic-item">
                          <div className="subtopic-top">
                            <span className="subtopic-name">{sub.name}</span>
                            <span className="subtopic-score">{sub.score}%</span>
                          </div>
                          <div className="subtopic-bar">
                            <div
                              className="subtopic-bar-fill"
                              style={{
                                width: `${sub.score}%`,
                                background: sub.score >= 70 ? "#22C55E" : sub.score >= 40 ? "#F59E0B" : "#EF4444",
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          5. TWO SUPPORTING PANELS: 4-Month Timeline + Trophy Motivation Case
      ========================================================================= */}
      <section className="overview-bottom-grid">
        {/* Left: 4-Month Milestones Roadmap */}
        <div className="timeline-card">
          <div className="panel-header">
            <h4 className="panel-title">
              <FaCalendarDays className="panel-icon" /> 4-Month Job-Ready Roadmap
            </h4>
            <Link to="/main/studyplan" className="panel-link">
              View Full Roadmap
            </Link>
          </div>

          <div className="milestones-list">
            {MONTHLY_MILESTONES.map((item, idx) => (
              <div key={item.month} className={`milestone-row status-${item.status}`}>
                <div className="milestone-marker">
                  {item.status === "completed" ? (
                    <FaCheck className="marker-icon check" />
                  ) : item.status === "current" ? (
                    <FaBolt className="marker-icon bolt" />
                  ) : (
                    <span className="marker-num">{idx + 1}</span>
                  )}
                  {idx !== MONTHLY_MILESTONES.length - 1 && <div className="milestone-line"></div>}
                </div>

                <div className="milestone-content">
                  <div className="milestone-top">
                    <span className="milestone-month">{item.month}: {item.title}</span>
                    <span className={`milestone-badge badge-${item.status}`}>
                      {item.score}
                    </span>
                  </div>
                  <p className="milestone-tasks">{item.tasks}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Achievements Trophy Case */}
        <div className="achievements-card">
          <div className="panel-header">
            <h4 className="panel-title">
              <FaTrophy className="panel-icon" style={{ color: "#F59E0B" }} /> Achievements & Motivation
            </h4>
            <span className="panel-badge">3 of 5 Unlocked</span>
          </div>

          <div className="achievements-list">
            {ACHIEVEMENTS_LIST.map((ach) => (
              <div key={ach.id} className="achievement-item">
                <div
                  className="ach-icon-box"
                  style={{ background: `${ach.color}18`, color: ach.color }}
                >
                  {ach.icon}
                </div>
                <div className="ach-details">
                  <div className="ach-title">{ach.title}</div>
                  <div className="ach-date">{ach.date}</div>
                </div>
                {ach.title.includes("Goal") ? (
                  <span className="ach-locked-pill">Locked</span>
                ) : (
                  <span className="ach-unlocked-pill">✓ Completed</span>
                )}
              </div>
            ))}
          </div>

          <div className="resume-readiness-callout">
            <FaAward className="callout-icon" />
            <div>
              <strong>Connect to Resume:</strong> 18 completed skills ready to auto-sync with your ATS resume profile.
            </div>
            <Link to="/main/resumeanalysis" className="callout-link">
              Sync Resume
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}