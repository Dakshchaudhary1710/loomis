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
    </div>
  )
}