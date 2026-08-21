import "./body.css"
import { Link } from "react-router-dom"
import { HiSparkles } from "react-icons/hi"
import { FaArrowRight, FaPlay, FaCircleCheck } from "react-icons/fa6"

const checklistItems = [
  "Personalized for you",
  "Track your progress",
  "Job-ready roadmap",
]

export default function Body(){
  return(
    <div className="second-part">
      <div className="landing-part-middle-right">

        <div className="middle-badge">
          <HiSparkles />
          <span>Your All-in-One Platform to Get Job Ready</span>
        </div>

        <div className="middle-heading">
          <div className="middle-heading-line1">Learn. Practice. Build.</div>
          <div className="middle-heading-line2">Get Job Ready.</div>
        </div>

        <div className="middle-desc">
          Loomis is your personalized learning companion to master skills, build
          projects, track progress, and land your dream job in the software
          industry.
        </div>

        <div className="middle-cta-row">
          <Link to="/main">
            <button className="middle-btn-primary">
              Start  <FaArrowRight />
            </button>
          </Link>
         
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

      {/* -------- Right side visual: glowing orb + wordmark -------- */}
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
                stroke="rgba(124,58,237,0.3)"
                strokeWidth="1.5"
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
                    <stop offset="0%" stopColor="#A78BFA" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
                <path
                  d="M 35 28 V 55 A 8 8 0 0 0 43 63 H 47 A 8 8 0 0 0 55 55 V 45 A 8 8 0 0 1 63 37 H 65 A 8 8 0 0 1 73 45 V 68"
                  stroke="url(#loomisLogoGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polygon points="73,54 63,68 83,68" fill="#38BDF8" />
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
              <span>Build</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}