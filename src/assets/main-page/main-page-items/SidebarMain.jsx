import "./SidebarMain.css";

import {
  HiHome,
  HiSparkles,
  HiAcademicCap,
  HiMicrophone,
  HiDocumentText,
} from "react-icons/hi";

import { FaQuoteLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">

      {/* Logo / Heading */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          🤖
        </div>

        <div>
          <h2>AI Interview Coach</h2>
          <p>Practice. Improve. Succeed.</p>
        </div>
      </div>


      {/* Sidebar Menu */}
      <div className="sidebar-menu">

        {/* Overview */}
        <NavLink
          to="/main/overview"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          <HiHome />
          <span>Overview</span>
        </NavLink>


        {/* AI Coach */}
        <NavLink
          to="/main/aicoach"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          <HiSparkles />
          <span>AI Coach</span>
        </NavLink>


        {/* Study Plan */}
        <NavLink
          to="/main/studyplan"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          <HiAcademicCap />
          <span>Study Plan</span>
        </NavLink>


        {/* Resume Analysis */}
        <NavLink
          to="/main/resumeanalysis"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          <HiDocumentText />
          <span>Resume Analysis</span>
        </NavLink>


        {/* Question Bank */}
        <NavLink
          to="/main/questionbank"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          <HiMicrophone />
          <span>Question Bank</span>
        </NavLink>

      </div>


      {/* Quote Card */}
      <div className="quote-card">

        <FaQuoteLeft />

        <h3>
          Every interview is a
          step closer to your
          dream job.
        </h3>

        <p>
          Keep going!
        </p>

      </div>

    </div>
  );
}