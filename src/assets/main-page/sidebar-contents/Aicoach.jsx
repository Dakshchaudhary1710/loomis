import "./aicoach.css";
import {
  FaFileAlt,
  FaMicrophone,
  FaChartLine,
  FaBrain,
} from "react-icons/fa";

const aiTools = [
  {
    id: 1,
    icon: <FaFileAlt />,
    title: "Resume Analyzer",
    description:
      "Get AI-powered feedback on your resume and improve your ATS score.",
    color: "#EDE9FE",
    iconColor: "#7C3AED",
  },
  {
    id: 2,
    icon: <FaMicrophone />,
    title: "Voice Practice",
    description:
      "Practice interview answers with real-time speech analysis.",
    color: "#DBEAFE",
    iconColor: "#2563EB",
  },
  {
    id: 3,
    icon: <FaChartLine />,
    title: "Performance Analytics",
    description:
      "Track your interview progress and identify weak areas.",
    color: "#DCFCE7",
    iconColor: "#16A34A",
  },
  {
    id: 4,
    icon: <FaBrain />,
    title: "Question Generator",
    description:
      "Generate personalized interview questions based on your role.",
    color: "#FEF3C7",
    iconColor: "#D97706",
  },
];

export default function AiCoach() {
  return (
    <div className="tools-card">
      <h2 className="tools-heading">AI Coach Tools</h2>

      <div className="tools-grid">
        {aiTools.map((tool) => (
          <div className="tool-box" key={tool.id}>
            <div
              className="tool-icon"
              style={{
                backgroundColor: tool.color,
                color: tool.iconColor,
              }}
            >
              {tool.icon}
            </div>

            <h3>{tool.title}</h3>

            <p>{tool.description}</p>

            <button className="tool-btn">
              Open Tool
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}