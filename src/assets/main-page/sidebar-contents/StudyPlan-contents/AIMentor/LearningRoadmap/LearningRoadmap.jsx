import React from "react";
import "./LearningRoadmap.css";
import {
  HiCheckCircle,
  HiClock,
  HiArrowRight,
} from "react-icons/hi2";

export default function LearningRoadmap({ roadmap = [], onToggleTopicProgress, onEditClick }) {
  // Calculate total progress
  let totalTopics = 0;
  let totalProgressSum = 0;

  roadmap.forEach((week) => {
    week.topics?.forEach((t) => {
      totalTopics += 1;
      totalProgressSum += t.progress || 0;
    });
  });

  const overallProgress = totalTopics > 0 ? Math.round(totalProgressSum / totalTopics) : 0;

  return (
    <div className="roadmap-card">
      {/* Header */}
      <div className="roadmap-header">
        <div>
          <h2>Learning Roadmap</h2>
          <p>Your personalized path to interview readiness</p>
        </div>

        <button className="roadmap-edit-btn" onClick={onEditClick}>
          Customize Plan
        </button>
      </div>

      {/* Progress */}
      <div className="roadmap-progress">
        <div className="progress-info">
          <span>Overall Progress</span>
          <strong>{overallProgress}%</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="roadmap">
        {roadmap.map((week, weekIndex) => (
          <div className="roadmap-week" key={weekIndex}>
            {/* Timeline */}
            <div className="timeline">
              <div className={`timeline-dot ${week.status}`}>
                {week.status === "completed" && <HiCheckCircle />}
              </div>

              {weekIndex !== roadmap.length - 1 && (
                <div className="timeline-line"></div>
              )}
            </div>

            {/* Week Content */}
            <div className="week-content">
              <div className="week-heading">
                <div>
                  <span className="week-label">{week.week}</span>
                  <h3>{week.title}</h3>
                </div>

                {week.status === "current" && (
                  <span className="current-badge">Current Focus</span>
                )}
              </div>

              {/* Topics */}
              <div className="roadmap-topics">
                {week.topics?.map((topic, topicIndex) => (
                  <div
                    className={`roadmap-topic ${topic.status}`}
                    key={topicIndex}
                  >
                    <div className="topic-info">
                      <div>
                        <h4>{topic.name}</h4>
                        <span className="topic-time">
                          <HiClock />
                          {topic.time}
                        </span>
                      </div>

                      <strong>{topic.progress}%</strong>
                    </div>

                    <div className="topic-progress">
                      <div
                        className="topic-progress-fill"
                        style={{
                          width: `${topic.progress}%`,
                        }}
                      ></div>
                    </div>

                    <button
                      className="continue-btn"
                      onClick={() => onToggleTopicProgress && onToggleTopicProgress(weekIndex, topicIndex)}
                    >
                      {topic.progress === 100 ? "Completed ✓" : topic.progress > 0 ? "In Progress..." : "Start Topic"}
                      <HiArrowRight />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}