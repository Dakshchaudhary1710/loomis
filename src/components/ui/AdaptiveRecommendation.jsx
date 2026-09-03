import React from "react";
import { Link } from "react-router-dom";
import { HiArrowRight, HiSparkles, HiLightBulb, HiCheckCircle } from "react-icons/hi";

export default function AdaptiveRecommendation({
  topic = "React State Management",
  category = "Frontend Architecture",
  estTime = "35 mins",
  rationale = "Your recent practice shows strong JavaScript fundamentals (90%) but lower accuracy (58%) in React state-related questions and hook lifecycle management.",
  keyConcepts = ["useReducer & Context API", "Zustand / Redux Toolkit", "State Colocation"],
}) {
  return (
    <div className="adaptive-rec-card">
      <div className="rec-card-header">
        <div className="rec-pill">
          <HiSparkles className="rec-sparkle" />
          <span>Recommended for you</span>
        </div>
        <span className="rec-est-time">Est. {estTime}</span>
      </div>

      <div className="rec-body">
        <div className="rec-title-group">
          <span className="rec-category">{category}</span>
          <h2 className="rec-topic-title">{topic}</h2>
        </div>

        <div className="rec-rationale-box">
          <div className="rationale-header">
            <HiLightBulb className="rationale-icon" />
            <span className="rationale-label">Why this recommendation?</span>
          </div>
          <p className="rationale-text">"{rationale}"</p>
        </div>

        <div className="rec-concepts">
          <span className="concepts-title">Target Concepts:</span>
          <div className="concepts-pills">
            {keyConcepts.map((concept, i) => (
              <span key={i} className="concept-chip">
                <HiCheckCircle className="chip-icon" /> {concept}
              </span>
            ))}
          </div>
        </div>

        <div className="rec-footer">
          <Link to="/main/studyplan" className="btn-primary-glow btn-block">
            <span>Start Learning</span>
            <HiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
