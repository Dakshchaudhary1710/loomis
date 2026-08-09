import React from "react";
import "./UpcomingPlan.css";

/**
 * Upcoming Plan
 * Vertical timeline of the next few scheduled study/practice items.
 * Replace `items` with GET /api/upcoming-plan
 */

const DEFAULT_ITEMS = [
  { id: 1, title: "System Design Mock Interview", when: "Today, 6:00 PM", type: "mock", done: false },
  { id: 2, title: "10 SQL practice questions", when: "Tomorrow, 9:00 AM", type: "practice", done: false },
  { id: 3, title: "Review: Behavioral STAR stories", when: "Wed, Aug 12", type: "review", done: false },
  { id: 4, title: "Resume tailored for Company X", when: "Thu, Aug 13", type: "resume", done: false },
];

const TYPE_META = {
  mock: { icon: "🎤", color: "#6E56E8" },
  practice: { icon: "✏️", color: "#3B82F6" },
  review: { icon: "🔁", color: "#F5A524" },
  resume: { icon: "📄", color: "#34C759" },
};

export default function UpcomingPlan({ items = DEFAULT_ITEMS }) {
  return (
    <div className="upcoming-plan">
      {items.map((item, i) => {
        const meta = TYPE_META[item.type] ?? TYPE_META.practice;
        return (
          <div key={item.id} className="upcoming-plan__row">
            <div className="upcoming-plan__rail">
              <div className="upcoming-plan__dot" style={{ background: meta.color }}>
                {meta.icon}
              </div>
              {i < items.length - 1 && <div className="upcoming-plan__line" />}
            </div>
            <div className="upcoming-plan__content">
              <div className="upcoming-plan__title">{item.title}</div>
              <div className="upcoming-plan__when">{item.when}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}