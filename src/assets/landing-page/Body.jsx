import "./body.css"
import { Link } from "react-router-dom"

export default function Body(){
  return(
    <div className="second-part">
      <div className="landing-part-middle-right">

  <div className="middle-first-text">Your Personal Al Interviewer

  </div>
  <div className="middle-main-text">
    <div className="middle-main-text-1">Crack Your Next</div>
    <div className="middle-main-text-2">Interview with</div>
    <div className="middle-main-text-3">Al-Powered Practice</div>
  </div>
  <div className="middle-last-text">Upload your resume, get personalized interview questions, practice with Al, and improve with smart feedback.</div>
<Link to="/main">
  <button className="middle-button">Start</button>
</Link>
      </div>

      {/* -------- Right side visual -------- */}
      <div className="landing-part-right-visual">

        <div className="hero-card">
          <div className="hero-card-header">
            <span className="hero-live-dot"></span>
            Live Mock Interview
          </div>

          <div className="hero-chat-bubble hero-chat-bubble--ai">
            <div className="hero-chat-label">AI Coach</div>
            <p>Tell me about a time you solved a difficult technical problem.</p>
          </div>

          <div className="hero-chat-bubble hero-chat-bubble--user">
            <p>Sure! In my last project, I optimized a slow database query by adding the right indexes...</p>
          </div>

          <div className="hero-typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="hero-float-card hero-float-card--top">
          <div className="hero-float-icon hero-float-icon--purple">🎯</div>
          <div>
            <div className="hero-float-value">92%</div>
            <div className="hero-float-label">Readiness Score</div>
          </div>
        </div>

        <div className="hero-float-card hero-float-card--bottom">
          <div className="hero-float-icon hero-float-icon--orange">🔥</div>
          <div>
            <div className="hero-float-value">7-Day</div>
            <div className="hero-float-label">Practice Streak</div>
          </div>
        </div>

      </div>

    </div>
  )
}