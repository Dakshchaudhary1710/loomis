import React, { useState } from "react";
import "./DailyTip.css";

/**
 * Daily Tip
 * Short AI-generated coaching tip, refreshable. Replace `fetchNewTip`
 * with a real call, e.g. GET /api/daily-tip
 */

const MOCK_TIPS = [
  "When answering system design questions, always clarify requirements before jumping into the solution — interviewers weigh this heavily.",
  "Use the STAR method (Situation, Task, Action, Result) to keep behavioral answers structured and concise.",
  "Practice explaining your code out loud — interviewers care as much about your reasoning as your syntax.",
  "Review the job description again before your next mock interview — tailor examples to the role's actual priorities.",
  "Don't just memorize solutions — practice explaining the trade-offs of your approach vs. alternatives.",
];

export default function DailyTip({ initialTip = MOCK_TIPS[0] }) {
  const [tip, setTip] = useState(initialTip);
  const [loading, setLoading] = useState(false);

  async function refreshTip() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500)); // simulate fetch
    const next = MOCK_TIPS[Math.floor(Math.random() * MOCK_TIPS.length)];
    setTip(next);
    setLoading(false);
  }

  return (
    <div className="daily-tip">
      <div className="daily-tip__icon">💡</div>
      <p className={`daily-tip__text ${loading ? "daily-tip__text--loading" : ""}`}>
        {loading ? "Thinking of something useful..." : tip}
      </p>
      <button className="daily-tip__refresh" onClick={refreshTip} disabled={loading}>
        {loading ? "..." : "New tip"}
      </button>
    </div>
  );
}