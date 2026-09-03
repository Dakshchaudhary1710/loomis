import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./SidebarMain.css";

import {
  HiHome,
  HiSparkles,
  HiAcademicCap,
  HiDocumentText,
  HiCog,
  HiBookOpen,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";

export default function SidebarMain() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${isCollapsed ? "is-collapsed" : ""}`}>
      {/* Sidebar Top: Logo & Collapse Button */}
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo-link" title="Loomis Platform">
          <div className="sidebar-logo">
            <div className="logo-icon-wrap">
              <svg
                width="40"
                height="40"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="46" fill="#E7EDF5" stroke="#3F5F8F" strokeWidth="4" />
                <path
                  d="M 32 30 V 58 A 8 8 0 0 0 40 66 H 44 A 8 8 0 0 0 52 58 V 46 A 8 8 0 0 1 60 38 H 64 A 8 8 0 0 1 72 46 V 70"
                  stroke="#3F5F8F"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polygon points="72,56 62,70 82,70" fill="#5E8065" />
              </svg>
            </div>

            {!isCollapsed && (
              <div className="logo-text">
                <h2>Loomis</h2>
                <span className="logo-tag">Learn • Practice • Master</span>
              </div>
            )}
          </div>
        </Link>

        <button
          className="collapse-toggle-btn"
          onClick={() => setIsCollapsed((prev) => !prev)}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <HiChevronRight /> : <HiChevronLeft />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-menu">
        <div className="menu-group-label">{!isCollapsed && "Core Platform"}</div>

        <NavLink
          to="/main/overview"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
        >
          <HiHome className="menu-icon" />
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/main/studyplan"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
        >
          <HiAcademicCap className="menu-icon" />
          {!isCollapsed && <span>Study Plan</span>}
        </NavLink>

        <NavLink
          to="/main/questionbank"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
        >
          <HiBookOpen className="menu-icon" />
          {!isCollapsed && <span>Practice</span>}
        </NavLink>

        <NavLink
          to="/main/aicoach"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
        >
          <HiSparkles className="menu-icon icon-ai" />
          {!isCollapsed && <span>Loomis AI</span>}
        </NavLink>

        <NavLink
          to="/main/resumeanalysis"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
        >
          <HiDocumentText className="menu-icon" />
          {!isCollapsed && <span>Resume</span>}
        </NavLink>

        <NavLink
          to="/main/settings"
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
        >
          <HiCog className="menu-icon" />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>
      </nav>

      {/* Sidebar Footer: AI Assistant Widget */}
      {!isCollapsed && (
        <div className="sidebar-footer">
          <div className="sidebar-ai-box">
            <div className="ai-box-top">
              <HiSparkles className="sparkle-gold" />
              <span className="ai-box-title">Adaptive Engine</span>
            </div>
            <p className="ai-box-desc">
              Loomis is analyzing your <strong>React state</strong> accuracy in real time.
            </p>
            <Link to="/main/aicoach" className="sidebar-ai-btn">
              <span>Open Loomis AI</span>
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}