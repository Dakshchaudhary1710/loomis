import { FaMicrophone, FaCode, FaArrowsRotate, FaFileLines } from "react-icons/fa6";
import "./UpcomingPlan.css";

/**
 * Upcoming Plan
 * List of the next few scheduled study/practice items.
 * Replace `items` with GET /api/upcoming-plan
 */

const DEFAULT_ITEMS = [
  { id: 1, title: "System Design Mock Interview", when: "Today, 6:00 PM", icon: <FaMicrophone />, color: "#6C3CF5" },
  { id: 2, title: "10 SQL practice questions", when: "Tomorrow, 9:00 AM", icon: <FaCode />, color: "#3B82F6" },
  { id: 3, title: "Review: Behavioral STAR stories", when: "Wed, Aug 12", icon: <FaArrowsRotate />, color: "#F59E0B" },
  { id: 4, title: "Resume tailored for Company X", when: "Thu, Aug 13", icon: <FaFileLines />, color: "#22C55E" },
];

export default function UpcomingPlan({ items = DEFAULT_ITEMS }) {
  return (
    <div className="upcoming-plan">
      <button className="upcoming-plan__view-calendar">View Calendar</button>

      {items.map((item) => (
        <div key={item.id} className="upcoming-plan__row">
          <div
            className="upcoming-plan__icon"
            style={{ background: `${item.color}1A`, color: item.color }}
          >
            {item.icon}
          </div>
          <div className="upcoming-plan__content">
            <div className="upcoming-plan__title">{item.title}</div>
            <div className="upcoming-plan__when">{item.when}</div>
          </div>
        </div>
      ))}
    </div>
  );
}