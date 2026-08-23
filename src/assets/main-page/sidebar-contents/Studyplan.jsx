import React, { useState, useEffect } from "react";
import "./studyPlan.css";
import AIMentor from "./StudyPlan-contents/AIMentor/AIMentor";
import LearningRoadmap from "./StudyPlan-contents/AIMentor/LearningRoadmap/LearningRoadmap";

const ROADMAP_STORAGE = "loomis_study_roadmap";
const FOCUS_STORAGE = "loomis_study_focus";

const DEFAULT_ROADMAP = [
  {
    week: "Week 1",
    title: "Foundation & Core Algorithms",
    status: "completed",
    topics: [
      { name: "Arrays & Strings", progress: 100, time: "3 hrs", status: "completed" },
      { name: "Two Pointers & Sliding Window", progress: 100, time: "2 hrs", status: "completed" },
    ],
  },
  {
    week: "Week 2",
    title: "Data Structures Mastery",
    status: "current",
    topics: [
      { name: "Linked List & Fast/Slow Pointers", progress: 75, time: "4 hrs", status: "current" },
      { name: "Stack & Queue Implementation", progress: 30, time: "3 hrs", status: "current" },
    ],
  },
  {
    week: "Week 3",
    title: "Advanced DSA & System Design",
    status: "upcoming",
    topics: [
      { name: "Binary Trees & BST Traversals", progress: 0, time: "5 hrs", status: "upcoming" },
      { name: "Graphs & BFS/DFS", progress: 0, time: "5 hrs", status: "upcoming" },
    ],
  },
];

const DEFAULT_FOCUS = [
  { text: "Solve 3 Binary Tree practice problems", completed: true },
  { text: "Revise Linked List reversals & cycle detection", completed: true },
  { text: "Watch System Design Basics: Load Balancers", completed: false },
];

export default function StudyPlan() {
  const [roadmap, setRoadmap] = useState(() => {
    const saved = localStorage.getItem(ROADMAP_STORAGE);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_ROADMAP;
  });

  const [focusItems, setFocusItems] = useState(() => {
    const saved = localStorage.getItem(FOCUS_STORAGE);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return DEFAULT_FOCUS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetRole, setTargetRole] = useState("Fullstack Engineer");
  const [duration, setDuration] = useState("4 Weeks");
  const [intensity, setIntensity] = useState("Intermediate");

  useEffect(() => {
    localStorage.setItem(ROADMAP_STORAGE, JSON.stringify(roadmap));
  }, [roadmap]);

  useEffect(() => {
    localStorage.setItem(FOCUS_STORAGE, JSON.stringify(focusItems));
  }, [focusItems]);

  const handleToggleTopicProgress = (weekIdx, topicIdx) => {
    setRoadmap((prev) =>
      prev.map((week, wI) => {
        if (wI !== weekIdx) return week;

        const updatedTopics = week.topics.map((topic, tI) => {
          if (tI !== topicIdx) return topic;

          const nextProgress = topic.progress === 100 ? 0 : topic.progress >= 50 ? 100 : 50;
          return {
            ...topic,
            progress: nextProgress,
            status: nextProgress === 100 ? "completed" : nextProgress > 0 ? "current" : "upcoming",
          };
        });

        const allDone = updatedTopics.every((t) => t.progress === 100);
        const hasStarted = updatedTopics.some((t) => t.progress > 0);

        return {
          ...week,
          status: allDone ? "completed" : hasStarted ? "current" : "upcoming",
          topics: updatedTopics,
        };
      })
    );
  };

  const handleToggleFocusItem = (index) => {
    setFocusItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleGeneratePlan = (e) => {
    e.preventDefault();

    let newRoadmap = [];
    if (targetRole.includes("Backend")) {
      newRoadmap = [
        {
          week: "Week 1",
          title: "Node.js & Express Fundamentals",
          status: "current",
          topics: [
            { name: "RESTful API Architecture", progress: 50, time: "4 hrs", status: "current" },
            { name: "Middleware & Authentication (JWT)", progress: 0, time: "3 hrs", status: "upcoming" },
          ],
        },
        {
          week: "Week 2",
          title: "Database Design & SQL Optimization",
          status: "upcoming",
          topics: [
            { name: "PostgreSQL Schema & Indexing", progress: 0, time: "5 hrs", status: "upcoming" },
            { name: "Redis Caching Strategies", progress: 0, time: "4 hrs", status: "upcoming" },
          ],
        },
      ];
    } else if (targetRole.includes("Frontend")) {
      newRoadmap = [
        {
          week: "Week 1",
          title: "React Deep Dive & Performance",
          status: "current",
          topics: [
            { name: "Virtual DOM & Reconciliation", progress: 60, time: "3 hrs", status: "current" },
            { name: "State Management with Redux/Zustand", progress: 20, time: "4 hrs", status: "current" },
          ],
        },
        {
          week: "Week 2",
          title: "TypeScript & Web Performance",
          status: "upcoming",
          topics: [
            { name: "Advanced TypeScript Types & Generics", progress: 0, time: "4 hrs", status: "upcoming" },
            { name: "Core Web Vitals & Optimization", progress: 0, time: "3 hrs", status: "upcoming" },
          ],
        },
      ];
    } else {
      newRoadmap = [
        {
          week: "Week 1",
          title: `${targetRole} - Core Foundations`,
          status: "current",
          topics: [
            { name: "Data Structures & Complexity Analysis", progress: 40, time: "4 hrs", status: "current" },
            { name: "System Architecture Basics", progress: 0, time: "3 hrs", status: "upcoming" },
          ],
        },
        {
          week: "Week 2",
          title: `${targetRole} - Practice & Projects`,
          status: "upcoming",
          topics: [
            { name: "Mock Interview Practice & Q&A", progress: 0, time: "5 hrs", status: "upcoming" },
            { name: "Behavioral & STAR Method", progress: 0, time: "3 hrs", status: "upcoming" },
          ],
        },
      ];
    }

    const newFocus = [
      { text: `Complete ${targetRole} Week 1 core module`, completed: false },
      { text: "Solve 2 targeted coding challenges", completed: false },
      { text: "Review system architecture principles", completed: false },
    ];

    setRoadmap(newRoadmap);
    setFocusItems(newFocus);
    setIsModalOpen(false);
  };

  return (
    <div className="study-plan">
      {/* LEFT SIDE */}
      <div className="study-plan-main">
        {/* Header */}
        <div className="study-plan-header">
          <div>
            <h1>Study Plan</h1>
            <p>Your personalized AI roadmap to crack software engineering interviews.</p>
          </div>

          <button
            className="generate-plan-btn"
            onClick={() => setIsModalOpen(true)}
          >
            + Generate New Plan
          </button>
        </div>

        {/* Scrollable content */}
        <div className="study-plan-scroll">
          {/* Learning Roadmap */}
          <LearningRoadmap
            roadmap={roadmap}
            onToggleTopicProgress={handleToggleTopicProgress}
            onEditClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="study-plan-right">
        <AIMentor
          roadmap={roadmap}
          focusItems={focusItems}
          onToggleFocusItem={handleToggleFocusItem}
          onViewDetailedPlan={() => {
            const el = document.querySelector(".roadmap-card");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>

      {/* GENERATE PLAN MODAL */}
      {isModalOpen && (
        <div className="plan-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="plan-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>⚡ Generate AI Study Plan</h2>
            <p>Select your goal and schedule to build a customized roadmap.</p>

            <form onSubmit={handleGeneratePlan}>
              <div className="plan-modal-group">
                <label>Target Engineering Role</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                >
                  <option value="Fullstack Engineer">Fullstack Engineer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="DSA & Competitive Coding">DSA & Competitive Coding</option>
                </select>
              </div>

              <div className="plan-modal-group">
                <label>Plan Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="2 Weeks">2 Weeks (Express Prep)</option>
                  <option value="4 Weeks">4 Weeks (Standard Prep)</option>
                  <option value="6 Weeks">6 Weeks (Comprehensive)</option>
                </select>
              </div>

              <div className="plan-modal-group">
                <label>Intensity Level</label>
                <select
                  value={intensity}
                  onChange={(e) => setIntensity(e.target.value)}
                >
                  <option value="Beginner">Light (1 hr/day)</option>
                  <option value="Intermediate">Moderate (2.5 hrs/day)</option>
                  <option value="Advanced">Intensive (4+ hrs/day)</option>
                </select>
              </div>

              <div className="plan-modal-actions">
                <button
                  type="button"
                  className="plan-modal-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="plan-modal-submit">
                  Generate Custom Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}