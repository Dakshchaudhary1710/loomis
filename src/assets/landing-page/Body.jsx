import "./body.css"
import { Link } from "react-router-dom"
import { HiSparkles } from "react-icons/hi"
import { FaArrowRight, FaPlay, FaCircleCheck } from "react-icons/fa6"

const checklistItems = [
  "Personalized 4-Month Roadmaps",
  "Real-Time AI Skill-Gap Analyzer",
  "Deep Topic Mastery vs Course Completion",
  "Goal Milestones & Verified Job-Readiness",
]

export default function Body() {
  const handleScrollToLearningPaths = () => {
    const el = document.getElementById("learning-paths");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="second-part" id="hero">
      <div className="landing-part-middle-right">

        <div className="middle-badge">
          <HiSparkles />
          <span>AI-Powered Learning & Job-Readiness Platform</span>
        </div>

        <div className="middle-heading">
          <div className="middle-heading-line1">Learn. Practice.  Master.</div>
          <div className="middle-heading-line2">Become Job-Ready.</div>
        </div>

        <div className="middle-desc">
          Don't just complete courses. Loomis brings together personalized learning
          paths, targeted coding practice, deep topic mastery tracking, and AI skill-gap
          guidance into one continuous platform.
        </div>

        <div className="middle-cta-row">
          <Link to="/main" style={{ textDecoration: "none" }}>
            <button className="middle-btn-primary">
              <span>Start Learning Path</span>
              <FaArrowRight />
            </button>
          </Link>
          <button className="middle-btn-secondary" onClick={handleScrollToLearningPaths}>
            <FaPlay /> Explore Learning Loop
          </button>
        </div>

        <div className="middle-checklist">
          {checklistItems.map((item) => (
            <div className="middle-check-item" key={item}>
              <FaCircleCheck />
              <span>{item}</span>
            </div>
          ))}
        </div>

      </div>

      {/* -------- Right side visual: orb + wordmark in Warm Ivory theme -------- */}
      <div className="landing-part-right-visual">
        <div className="loomis-orb-wrap">

          <div className="loomis-orb-stage">

            {/* faint decorative background rings */}
            <div className="loomis-arc loomis-arc--1"></div>
            <div className="loomis-arc loomis-arc--2"></div>

            {/* orbit path + the dot travelling on it */}
            <svg className="loomis-orbit-path" viewBox="0 0 400 400">
              <ellipse
                cx="200" cy="200" rx="185" ry="90"
                transform="rotate(-20 200 200)"
                fill="none"
                stroke="rgba(63, 95, 143, 0.25)"
                strokeWidth="2"
              />
            </svg>
            <div className="loomis-orbit-dot"></div>

            {/* glow behind the sphere */}
            <div className="loomis-orb-glow"></div>

            {/* the sphere itself */}
            <div className="loomis-orb">
              <div className="loomis-orb-ring"></div>
              <svg className="loomis-orb-logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="loomisLogoGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#E7EDF5" />
                  </linearGradient>
                </defs>
                <path
                  d="M 35 28 V 55 A 8 8 0 0 0 43 63 H 47 A 8 8 0 0 0 55 55 V 45 A 8 8 0 0 1 63 37 H 65 A 8 8 0 0 1 73 45 V 68"
                  stroke="url(#loomisLogoGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polygon points="73,54 63,68 83,68" fill="#5E8065" />
              </svg>
            </div>

            {/* floating decorative dots */}
            <span className="loomis-float-dot loomis-float-dot--1"></span>
            <span className="loomis-float-dot loomis-float-dot--2"></span>
            <span className="loomis-float-dot loomis-float-dot--3"></span>

          </div>

          <div className="loomis-wordmark">
            <div className="loomis-wordmark-title">Loomis</div>
            <div className="loomis-wordmark-sub">
              <span>Learn</span>
              <span className="loomis-wordmark-dot">•</span>
              <span>Practice</span>
              <span className="loomis-wordmark-dot">•</span>
              <span>Master</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}