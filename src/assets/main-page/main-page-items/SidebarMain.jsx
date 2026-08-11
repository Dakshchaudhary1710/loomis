import "./SidebarMain.css";

import {
  HiHome,
  HiSparkles,
  HiAcademicCap,
  HiMicrophone,
  HiDocumentText,
  HiCog,
} from "react-icons/hi";
import { HiBookOpen } from "react-icons/hi";

import { FaQuoteLeft } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      {/* Logo / Heading */}
      <div className="title-mainpage">
        <div className="sidebar-logo">
          <div className="logo-icon">
            {/* Minimal SVG Logo Icon for Loomis */}
            <svg
              width="70"
              height="60"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="46" fill="#1E1B4B" />
              <path
                d="M 35 28 V 55 A 8 8 0 0 0 43 63 H 47 A 8 8 0 0 0 55 55 V 45 A 8 8 0 0 1 63 37 H 65 A 8 8 0 0 1 73 45 V 68"
                stroke="#A78BFA"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polygon points="73,54 63,68 83,68" fill="#38BDF8" />
            </svg>
          </div>

          <div className="title-mainpage-name">
            <h2>
              Loomis<span className="brand-accent"></span>
            </h2>
            <p style={{ color: "green" }} className="sidebar-slogan">
              Learn. Practice. Build.
            </p>
          </div>
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
          <HiBookOpen />
          <span>Question Bank</span>
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/main/settings"
          className={({ isActive }) =>
            `menu-item ${isActive ? "active" : ""}`
          }
        >
          <HiCog />
          <span>Settings</span>
        </NavLink>
      </div>

      {/* Quote Card */}
      <div className="quote-card">
        <FaQuoteLeft />
        <h3>Learn with purpose. Practice with intent. Build your future..</h3>
        <p></p>
      </div>
    </div>
  );
}