import React from "react";
import "./AIMentor.css";

import {
  HiSparkles,
  HiClock,
  HiCheckCircle,
  HiArrowRight,
} from "react-icons/hi2";

import { FaRegCircle } from "react-icons/fa";

export default function AIMentor({
  roadmap = [],
  focusItems = [],
  onToggleFocusItem,
  onViewDetailedPlan,
}) {
  const completedCount = focusItems.filter((item) => item.completed).length;
  const totalFocusCount = focusItems.length;

  // Extract weak topics (progress < 50%) from roadmap
  const weakTopics = [];
  roadmap.forEach((week) => {
    week.topics?.forEach((t) => {
      if (t.progress < 50) {
        weakTopics.push(t.name);
      }
    });
  });

  const displayWeakTopics = weakTopics.length > 0 ? weakTopics.slice(0, 3) : ["None! Great job! 🎉"];

  // Dynamic feedback message
  let feedbackTitle = "You're doing great! 💪";
  let feedbackText = "Focus more on Trees and Graphs to strengthen your DSA skills.";

  if (completedCount === totalFocusCount && totalFocusCount > 0) {
    feedbackTitle = "All Daily Goals Complete! 🔥";
    feedbackText = "Fantastic work today! You completed all scheduled study topics. Keep this streak going!";
  } else if (completedCount > 0) {
    feedbackTitle = `Progress Made! (${completedCount}/${totalFocusCount})`;
    feedbackText = `You've finished ${completedCount} task${completedCount > 1 ? "s" : ""} today! Continue with the remaining items to reach 100%.`;
  }

  return (
    <div className="ai-mentor-card">
      {/* Header */}
      <div className="mentor-header">
        <div className="mentor-title">
          <div className="mentor-icon">🤖</div>
          <div>
            <h2>AI Mentor</h2>
            <span>Beta</span>
          </div>
        </div>

        <button className="mentor-menu">⋮</button>
      </div>

      {/* Subtitle */}
      <p className="mentor-subtitle">Your personal study assistant</p>

      {/* Robot */}
      <div className="mentor-robot">🤖</div>

      {/* AI Message */}
      <div className="mentor-message">
        <div className="message-title">
          <HiSparkles />
          <strong>{feedbackTitle}</strong>
        </div>

        <p>{feedbackText}</p>
      </div>

      {/* Study Time */}
      <div className="mentor-info">
        <h4>Estimated Study Time Today</h4>

        <div className="study-time">
          <HiClock />
          <strong>{completedCount * 45 + 60} mins</strong>
          <span>+{completedCount * 15}m completed</span>
        </div>
      </div>

      {/* Weakest Topics */}
      <div className="mentor-info">
        <h4>Target Focus Topics</h4>

        <div className="weak-topics">
          {displayWeakTopics.map((topic, i) => (
            <span key={i}>{topic}</span>
          ))}
        </div>
      </div>

      {/* Today's Focus */}
      <div className="mentor-info">
        <h4>Today's Focus ({completedCount}/{totalFocusCount})</h4>

        {focusItems.map((item, index) => (
          <div
            className={`focus-item ${item.completed ? "completed" : ""}`}
            key={index}
            onClick={() => onToggleFocusItem && onToggleFocusItem(index)}
          >
            {item.completed ? <HiCheckCircle /> : <FaRegCircle />}
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      {/* Button */}
      <button className="detailed-plan-btn" onClick={onViewDetailedPlan}>
        View Detailed Plan
        <HiArrowRight />
      </button>
    </div>
  );
}