import "./AIMentor.css";

import {
  HiSparkles,
  HiClock,
  HiCheckCircle,
  HiArrowRight,
} from "react-icons/hi2";

import { FaRegCircle } from "react-icons/fa";

export default function AIMentor() {
  return (
    <div className="ai-mentor-card">

      {/* Header */}
      <div className="mentor-header">
        <div className="mentor-title">
          <div className="mentor-icon">
            🤖
          </div>

          <div>
            <h2>AI Mentor</h2>
            <span>Beta</span>
          </div>
        </div>

        <button className="mentor-menu">⋮</button>
      </div>


      {/* Subtitle */}
      <p className="mentor-subtitle">
        Your personal study assistant
      </p>


      {/* Robot */}
      <div className="mentor-robot">
        🤖
      </div>


      {/* AI Message */}
      <div className="mentor-message">
        <div className="message-title">
          <HiSparkles />
          <strong>You're doing great! 💪</strong>
        </div>

        <p>
          Focus more on <b>Trees</b> and <b>Graphs</b>{" "}
          to strengthen your DSA skills.
        </p>
      </div>


      {/* Study Time */}
      <div className="mentor-info">
        <h4>Estimated Study Time Today</h4>

        <div className="study-time">
          <HiClock />

          <strong>2 hr 30 min</strong>

          <span>+20m vs yesterday</span>
        </div>
      </div>


      {/* Weakest Topics */}
      <div className="mentor-info">
        <h4>Weakest Topics</h4>

        <div className="weak-topics">
          <span>Trees</span>
          <span>Graphs</span>
          <span>Dynamic Programming</span>
        </div>
      </div>


      {/* Today's Focus */}
      <div className="mentor-info">
        <h4>Today's Focus</h4>

        <div className="focus-item completed">
          <HiCheckCircle />
          <p>Solve 3 Tree problems</p>
        </div>

        <div className="focus-item completed">
          <HiCheckCircle />
          <p>Revise Linked List</p>
        </div>

        <div className="focus-item">
          <FaRegCircle />
          <p>Watch System Design Basics</p>
        </div>
      </div>


      {/* Button */}
      <button className="detailed-plan-btn">
        View Detailed Plan
        <HiArrowRight />
      </button>

    </div>
  );
}