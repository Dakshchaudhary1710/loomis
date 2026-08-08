import "./SidebarMain.css";
import {
  HiHome,
  HiSparkles,
  HiAcademicCap,
  HiMicrophone,
} from "react-icons/hi";
import { FaQuoteLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-box">🤖</div>

        <div>
          <h2>AI Interview Coach</h2>
          <p>Practice. Improve. Succeed.</p>
        </div>
      </div>

      <div className="sidebar-menu">
       <NavLink to="/main/overview" className="menu-item active">
          <HiHome />
          <span>Overview</span>
       </NavLink>

        <NavLink to="/main/aicoach" className="menu-item">
          <HiSparkles />
          <span>AI Coach</span>
        </NavLink>

        <NavLink to="/main/studyplan" className="menu-item">
          <HiAcademicCap />
          <span>Study Plan</span>
         </NavLink>

        <NavLink to="/main/voiceanalysis" className="menu-item">
          <HiMicrophone />
          <span>Voice Analysis</span>
       </NavLink>
        <NavLink to="/main/questionbank" className="menu-item">
         <HiMicrophone />
        <span>Question Bank</span>
        </NavLink>
      </div>
      <div className="quote-card">
  <FaQuoteLeft className="quote-icon" />

  <p className="quote-text">
    Every interview is a step closer to your dream job.
  </p>

  <span className="quote-subtext">
    Keep going!
  </span>

  <div className="quote-line"></div>
</div>
    </div>
  );
}