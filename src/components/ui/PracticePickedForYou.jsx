import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiSparkles, HiCode, HiBookmark, HiCheck, HiSearch, HiFilter } from "react-icons/hi";

const PICKED_PROBLEMS = [
  {
    id: "p1",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    topic: "Data Structures",
    accuracy: "54%",
    rationale: "Recommended because your accuracy in tree problems is 54%.",
    isBookmarked: true,
  },
  {
    id: "p2",
    title: "Implement Custom React Hook (useFetch)",
    difficulty: "Medium",
    topic: "React",
    accuracy: "62%",
    rationale: "Recommended to strengthen your React state & side-effects practice.",
    isBookmarked: false,
  },
  {
    id: "p3",
    title: "SQL B-Tree Index Optimization",
    difficulty: "Hard",
    topic: "Databases",
    accuracy: "41%",
    rationale: "Recommended because database indexing is flagged as a critical skill gap.",
    isBookmarked: false,
  },
];

export default function PracticePickedForYou() {
  const [problems, setProblems] = useState(PICKED_PROBLEMS);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p))
    );
  };

  const filteredProblems = problems.filter((p) => {
    if (selectedDifficulty === "All") return true;
    return p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
  });

  return (
    <div className="practice-picked-card">
      <div className="practice-header">
        <div className="title-group">
          <div className="picked-badge">
            <HiSparkles className="sparkle-icon" />
            <span>AI Adaptive Selector</span>
          </div>
          <h3 className="practice-title">Picked for you</h3>
          <p className="practice-subtitle">
            Problems targeted directly at your current accuracy gaps
          </p>
        </div>

        <div className="difficulty-pills">
          {["All", "Easy", "Medium", "Hard"].map((diff) => (
            <button
              key={diff}
              className={`diff-btn ${selectedDifficulty === diff ? "is-active" : ""}`}
              onClick={() => setSelectedDifficulty(diff)}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      <div className="picked-problems-grid">
        {filteredProblems.map((prob) => (
          <div key={prob.id} className="problem-card">
            <div className="problem-top">
              <span className={`diff-tag tag-${prob.difficulty.toLowerCase()}`}>
                {prob.difficulty}
              </span>
              <span className="topic-tag">{prob.topic}</span>
              <button
                className={`bookmark-btn ${prob.isBookmarked ? "bookmarked" : ""}`}
                onClick={(e) => toggleBookmark(prob.id, e)}
                title="Bookmark Problem"
              >
                <HiBookmark />
              </button>
            </div>

            <h4 className="problem-title">{prob.title}</h4>

            <div className="problem-rationale">
              <p>"{prob.rationale}"</p>
            </div>

            <div className="problem-footer">
              <div className="accuracy-group">
                <span className="accuracy-label">Your Topic Acc:</span>
                <span className="accuracy-val">{prob.accuracy}</span>
              </div>
              <Link to="/main/questionbank" className="btn-solve">
                <HiCode />
                <span>Solve Problem</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
