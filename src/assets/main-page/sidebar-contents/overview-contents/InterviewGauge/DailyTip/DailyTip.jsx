import { useState } from "react";
import { FaQuoteLeft, FaRotate } from "react-icons/fa6";
import "./DailyTip.css";

/**
 * Daily Tip
 * Short AI-generated coaching tip, refreshable via the small icon
 * button top-right. Replace `fetchNewTip` with a real call, e.g.
 * GET /api/daily-tip
 */

const MOCK_TIPS = [
  "Focus on progress, not perfection. Small steps every day lead to big results.",
  "When answering system design questions, always clarify requirements before jumping into the solution.",
  "Use the STAR method to keep behavioral answers structured and concise.",
  "Practice explaining your code out loud — interviewers care as much about your reasoning as your syntax.",
  "Don't just memorize solutions — practice explaining the trade-offs of your approach vs. alternatives.",
];

export default function DailyTip({ initialTip = MOCK_TIPS[0] }) {
  const [tip, setTip] = useState(initialTip);
  const [loading, setLoading] = useState(false);

  async function refreshTip() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 450));
    const next = MOCK_TIPS[Math.floor(Math.random() * MOCK_TIPS.length)];
    setTip(next);
    setLoading(false);
  }

  return (
    <div className="daily-tip">
      <div className="daily-tip__quote-icon">
        <FaQuoteLeft />
      </div>

      <button
        className="daily-tip__refresh"
        onClick={refreshTip}
        disabled={loading}
        aria-label="Get a new tip"
        title="Get a new tip"
      >
        <FaRotate className={loading ? "daily-tip__refresh-icon--spinning" : ""} />
      </button>

      <p className="daily-tip__text">{tip}</p>

      <svg className="daily-tip__illustration" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="56" fill="#EFEBFF" />
        <circle cx="60" cy="60" r="42" fill="#D9CFFB" />
        <circle cx="60" cy="60" r="28" fill="#B6A2F5" />
        <circle cx="60" cy="60" r="14" fill="#6C3CF5" />
        <line x1="14" y1="106" x2="52" y2="68" stroke="#4B2FE3" strokeWidth="4" strokeLinecap="round" />
        <polygon points="52,68 40,64 56,52" fill="#4B2FE3" />
      </svg>
    </div>
  );
}