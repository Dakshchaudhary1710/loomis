import React from "react";
import { Link } from "react-router-dom";
import { HiCheck, HiArrowRight, HiSparkles } from "react-icons/hi";
import { FaPlay, FaLock } from "react-icons/fa6";

const DEFAULT_STEPS = [
  {
    id: "js-fund",
    title: "JavaScript Fundamentals",
    status: "completed",
    score: "90% Accuracy",
    desc: "Closures, Event Loop, ES6+, Promises",
  },
  {
    id: "react-fund",
    title: "React Fundamentals",
    status: "completed",
    score: "82% Accuracy",
    desc: "JSX, Component Lifecycle, Basic Hooks",
  },
  {
    id: "react-state",
    title: "React State Management",
    status: "current",
    score: "Active Unit",
    desc: "Context API, useReducer, Custom Hooks, Redux Toolkit",
  },
  {
    id: "backend-api",
    title: "Backend APIs",
    status: "next",
    score: "Recommended Next",
    desc: "REST APIs, Node.js, Express, Middleware",
  },
  {
    id: "auth",
    title: "Authentication",
    status: "locked",
    score: "Upcoming",
    desc: "JWT Tokens, OAuth 2.0, Session Security",
  },
  {
    id: "deployment",
    title: "Deployment & CI/CD",
    status: "locked",
    score: "Upcoming",
    desc: "Vercel, Docker, Environment Configs",
  },
];

export default function ConnectedRoadmap({ steps = DEFAULT_STEPS }) {
  return (
    <div className="connected-roadmap-card">
      <div className="roadmap-header">
        <div>
          <h3 className="roadmap-title">Adaptive Learning Roadmap</h3>
          <p className="roadmap-subtitle">Connected timeline updated continuously based on your skill accuracy</p>
        </div>
        <Link to="/main/studyplan" className="roadmap-header-link">
          <span>View Detailed Path</span>
          <HiArrowRight />
        </Link>
      </div>

      <div className="connected-timeline">
        {steps.map((step, idx) => {
          const isCompleted = step.status === "completed";
          const isCurrent = step.status === "current";
          const isNext = step.status === "next";
          const isLocked = step.status === "locked";

          return (
            <div
              key={step.id}
              className={`timeline-node-wrap status-${step.status}`}
            >
              {/* Connector line */}
              {idx > 0 && <div className="timeline-connector"></div>}

              {/* Node Indicator */}
              <div className="node-indicator">
                {isCompleted && (
                  <div className="node-icon icon-completed" title="Completed">
                    <HiCheck />
                  </div>
                )}
                {isCurrent && (
                  <div className="node-icon icon-current" title="Current Focus">
                    <FaPlay className="play-icon" />
                    <span className="pulse-ring"></span>
                  </div>
                )}
                {isNext && (
                  <div className="node-icon icon-next" title="Recommended Next">
                    <span className="dot-next"></span>
                  </div>
                )}
                {isLocked && (
                  <div className="node-icon icon-locked" title="Upcoming Unit">
                    <FaLock />
                  </div>
                )}
              </div>

              {/* Node Body */}
              <div className="node-card">
                <div className="node-meta">
                  <span className={`node-badge badge-${step.status}`}>
                    {isCompleted && "✓ Completed"}
                    {isCurrent && "→ CURRENT FOCUS"}
                    {isNext && "○ Recommended Next"}
                    {isLocked && "🔒 Upcoming"}
                  </span>
                  <span className="node-score">{step.score}</span>
                </div>
                <h4 className="node-title">{step.title}</h4>
                <p className="node-desc">{step.desc}</p>

                {isCurrent && (
                  <div className="node-current-action">
                    <Link to="/main/studyplan" className="btn-node-current">
                      <span>Resume Unit</span>
                      <HiSparkles />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
