import "./overview.css";
import {
  FaBullseye,
  FaArrowTrendUp,
  FaClock,
  FaStar,
  FaShieldHeart,
} from "react-icons/fa6";

const firstBoxes = [
  {
    id: 1,
    icon: <FaBullseye />,
    title: "Practice Streak",
    value: "7",
    subtitle: "Days in a row",
    color: "#6C3CF0",
  },
  {
    id: 2,
    icon: <FaArrowTrendUp />,
    title: "Best Performance",
    value: "92%",
    subtitle: "On System Design",
    color: "#16A34A",
  },
  {
    id: 3,
    icon: <FaClock />,
    title: "Total Practice Time",
    value: "15h 40m",
    subtitle: "This month",
    color: "#F97316",
  },
  {
    id: 4,
    icon: <FaStar />,
    title: "Questions Attempted",
    value: "132",
    subtitle: "Across all topics",
    color: "#2563EB",
  },
  {
    id: 5,
    icon: <FaShieldHeart />,
    title: "Confidence Score",
    value: "78%",
    subtitle: "Keep building!",
    color: "#EC4899",
  },
];

const topicMastery = [
  {
    id: 1,
    icon: <TbBrackets />,
    title: "Data Structures",
    percentage: 85,
    color: "#7C3AED",
  },
  {
    id: 2,
    icon: <FaCode />,
    title: "Algorithms",
    percentage: 72,
    color: "#2563EB",
  },
  // ...
];

export default function Overview() {
  return (
    <div className="overview-body">
      <div className="overview-first-part">
        {firstBoxes.map((item) => (
          <div className="firstBoxes" key={item.id}>
            <div className="firstBoxes-top">
              <div
              className="firstBoxes-icon"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>

            <div className="firstBoxes-content">
              <h4>{item.title}</h4>
              <h2>{item.value}</h2>
              <p>{item.subtitle}</p>
            </div>
             </div>
            

            <div
              className="firstBoxes-graph"
              style={{ borderColor: item.color }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}