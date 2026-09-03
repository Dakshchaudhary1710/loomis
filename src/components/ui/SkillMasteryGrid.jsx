import React, { useState } from "react";
import { HiCheckCircle, HiExclamationCircle, HiTrendingUp } from "react-icons/hi";

const SKILLS_DATA = [
  {
    id: "js",
    name: "JavaScript Core",
    score: 90,
    category: "strong",
    statusText: "Strong",
    color: "#10B981",
    subtopics: ["ES6+ Syntax (95%)", "Event Loop & Async (92%)", "DOM Manipulation (85%)"],
  },
  {
    id: "react",
    name: "React Architecture",
    score: 72,
    category: "improving",
    statusText: "Improving",
    color: "#6366F1",
    subtopics: ["Component Breakdown (88%)", "Hooks & State (68%)", "Performance Opt (60%)"],
  },
  {
    id: "dsa",
    name: "Data Structures & Algo",
    score: 61,
    category: "improving",
    statusText: "Improving",
    color: "#3B82F6",
    subtopics: ["Arrays & HashMaps (82%)", "Binary Trees (54%)", "Dynamic Programming (42%)"],
  },
  {
    id: "sql",
    name: "SQL & Relational DBs",
    score: 48,
    category: "attention",
    statusText: "Needs attention",
    color: "#F59E0B",
    subtopics: ["SELECT & JOIN Queries (75%)", "Foreign Keys (60%)", "B-Tree Indexing (28%)"],
  },
  {
    id: "backend",
    name: "Backend APIs",
    score: 32,
    category: "attention",
    statusText: "Needs attention",
    color: "#EC4899",
    subtopics: ["Express Routing (60%)", "Error Middleware (35%)", "Rate Limiting (18%)"],
  },
  {
    id: "auth",
    name: "Authentication & Security",
    score: 28,
    category: "attention",
    statusText: "Needs attention",
    color: "#EF4444",
    subtopics: ["Session Management (45%)", "JWT Token Flow (30%)", "OAuth 2.0 (15%)"],
  },
];

export default function SkillMasteryGrid() {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedSkill, setExpandedSkill] = useState(null);

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    if (activeTab === "strong") return skill.category === "strong";
    if (activeTab === "improving") return skill.category === "improving";
    if (activeTab === "attention") return skill.category === "attention";
    return true;
  });

  return (
    <div className="skill-mastery-card">
      <div className="mastery-header-row">
        <div>
          <h3 className="mastery-title">Skill Mastery Matrix</h3>
          <p className="mastery-subtitle">Continuous measurement based on accuracy and question speed</p>
        </div>

        <div className="mastery-tab-filters">
          <button
            className={`mastery-tab ${activeTab === "all" ? "is-active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Skills ({SKILLS_DATA.length})
          </button>
          <button
            className={`mastery-tab tab-strong ${activeTab === "strong" ? "is-active" : ""}`}
            onClick={() => setActiveTab("strong")}
          >
            Strong (1)
          </button>
          <button
            className={`mastery-tab tab-improving ${activeTab === "improving" ? "is-active" : ""}`}
            onClick={() => setActiveTab("improving")}
          >
            Improving (2)
          </button>
          <button
            className={`mastery-tab tab-attention ${activeTab === "attention" ? "is-active" : ""}`}
            onClick={() => setActiveTab("attention")}
          >
            Needs Attention (3)
          </button>
        </div>
      </div>

      <div className="mastery-grid-layout">
        {filteredSkills.map((skill) => {
          const isExpanded = expandedSkill === skill.id;

          return (
            <div
              key={skill.id}
              className={`mastery-item-card cat-${skill.category} ${
                isExpanded ? "is-expanded" : ""
              }`}
              onClick={() => setExpandedSkill(isExpanded ? null : skill.id)}
            >
              <div className="item-top">
                <div className="item-status-pill" style={{ color: skill.color }}>
                  {skill.category === "strong" && <HiCheckCircle />}
                  {skill.category === "improving" && <HiTrendingUp />}
                  {skill.category === "attention" && <HiExclamationCircle />}
                  <span>{skill.statusText}</span>
                </div>
                <span className="item-score" style={{ color: skill.color }}>
                  {skill.score}%
                </span>
              </div>

              <h4 className="item-name">{skill.name}</h4>

              <div className="item-progress-track">
                <div
                  className="item-progress-fill"
                  style={{ width: `${skill.score}%`, backgroundColor: skill.color }}
                ></div>
              </div>

              {/* Subtopic preview */}
              <div className="subtopic-chips">
                {skill.subtopics.map((sub, i) => (
                  <span key={i} className="subtopic-tag">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
