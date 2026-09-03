import React, { useState } from "react";
import { HiCheck, HiClock, HiSparkles } from "react-icons/hi";

const INITIAL_TASKS = [
  {
    id: 1,
    title: "React State Management",
    category: "Study Unit",
    duration: "35 min",
    completed: false,
    color: "#6366F1",
  },
  {
    id: 2,
    title: "5 DSA Problems (Trees & Graphs)",
    category: "Targeted Practice",
    duration: "40 min",
    completed: false,
    color: "#10B981",
  },
  {
    id: 3,
    title: "SQL Indexing Revision",
    category: "Concept Refresh",
    duration: "20 min",
    completed: false,
    color: "#F59E0B",
  },
];

export default function TodayPlan() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="today-plan-card">
      <div className="plan-header">
        <div className="plan-title-group">
          <div className="plan-icon-wrap">
            <HiSparkles className="plan-icon" />
          </div>
          <div>
            <h3 className="plan-title">Today's Plan</h3>
            <p className="plan-subtitle">Personalized AI study queue for today</p>
          </div>
        </div>

        <div className="plan-total-time">
          <HiClock className="clock-icon" />
          <span>95 mins total</span>
        </div>
      </div>

      <div className="plan-progress-strip">
        <div className="progress-strip-label">
          <span>Completion ({completedCount}/{tasks.length})</span>
          <span>{Math.round((completedCount / tasks.length) * 100)}%</span>
        </div>
        <div className="progress-strip-track">
          <div
            className="progress-strip-fill"
            style={{ width: `${(completedCount / tasks.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="plan-tasks-list">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`plan-task-item ${task.completed ? "is-completed" : ""}`}
            onClick={() => toggleTask(task.id)}
          >
            <div className="task-checkbox">
              {task.completed && <HiCheck className="check-mark" />}
            </div>

            <div className="task-body">
              <div className="task-number">{index + 1}</div>
              <div className="task-info">
                <h4 className="task-title">{task.title}</h4>
                <div className="task-meta">
                  <span className="task-category" style={{ color: task.color }}>
                    {task.category}
                  </span>
                  <span className="meta-dot">•</span>
                  <span className="task-duration">{task.duration}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
