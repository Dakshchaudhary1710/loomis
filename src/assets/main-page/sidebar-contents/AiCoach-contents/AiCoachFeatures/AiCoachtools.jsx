import {
  FaFileAlt,
  FaBuilding,
  FaQuestionCircle,
  FaUsers,
  FaCode
} from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import "./AiCoachTools.css";

const tools = [
  {
    icon: <FaFileAlt />,
    title: "Resume Review",
    desc: "Get AI feedback on your resume and improve your chances.",
    color: "#ede9fe",
    iconColor: "#7c3aed",
  },
  {
    icon: <FaBuilding />,
    title: "Company Preparation",
    desc: "Prepare for specific companies and their interview process.",
    color: "#dcfce7",
    iconColor: "#16a34a",
  },
  {
    icon: <FaQuestionCircle />,
    title: "Generate Questions",
    desc: "Generate technical and behavioral interview questions.",
    color: "#ffedd5",
    iconColor: "#ea580c",
  },
  {
    icon: <FaUsers />,
    title: "Behavioral Practice",
    desc: "Practice HR and behavioral interview questions.",
    color: "#dbeafe",
    iconColor: "#2563eb",
  },
  {
    icon: <FaCode />,
    title: "Technical Concepts",
    desc: "Learn and revise important CS subjects.",
    color: "#fce7f3",
    iconColor: "#db2777",
  },
];

export default function AICoachTools() {
  return (
    <div className="coachTools">
      <h2>AI Coach Tools</h2>
      <p>How can I help you today?</p>

      {tools.map((tool, index) => (
        <div className="toolCard" key={index}>
          <div
            className="toolIcon"
            style={{
              background: tool.color,
              color: tool.iconColor,
            }}
          >
            {tool.icon}
          </div>

          <div className="toolContent">
            <h4>{tool.title}</h4>
            <span>{tool.desc}</span>
          </div>

          <FaChevronRight className="arrow" />
        </div>
      ))}

      <div className="quickTip">
        <h4>💡 Quick Tip</h4>
        <p>
          Be specific in your questions to get better and more accurate AI
          responses.
        </p>

        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
          alt=""
        />
      </div>
    </div>
  );
}