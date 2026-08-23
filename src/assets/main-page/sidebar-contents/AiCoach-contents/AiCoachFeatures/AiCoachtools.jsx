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
    id: "resume",
    icon: <FaFileAlt />,
    title: "Resume Review",
    desc: "Get AI feedback on your resume and improve your match score.",
    color: "#ede9fe",
    iconColor: "#7c3aed",
    prompt: "I want to review my resume and analyze it for a job opening.",
  },
  {
    id: "company",
    icon: <FaBuilding />,
    title: "Company Preparation",
    desc: "Prepare for specific company interview questions and rounds.",
    color: "#dcfce7",
    iconColor: "#16a34a",
    prompt: "Help me prepare for a Software Engineering interview at Google.",
  },
  {
    id: "questions",
    icon: <FaQuestionCircle />,
    title: "Generate Questions",
    desc: "Generate technical and behavioral practice questions.",
    color: "#ffedd5",
    iconColor: "#ea580c",
    prompt: "Generate 5 practice technical interview questions with solution guides.",
  },
  {
    id: "behavioral",
    icon: <FaUsers />,
    title: "Behavioral Practice",
    desc: "Practice STAR method responses for HR interviews.",
    color: "#dbeafe",
    iconColor: "#2563eb",
    prompt: "Give me a STAR method practice scenario for a behavioral interview.",
  },
  {
    id: "concepts",
    icon: <FaCode />,
    title: "Technical Concepts",
    desc: "Learn and revise core Computer Science subjects.",
    color: "#fce7f3",
    iconColor: "#db2777",
    prompt: "Explain key System Design concepts like Caching, Load Balancing, and Sharding.",
  },
];

export default function AICoachTools({ onToolClick }) {
  return (
    <div className="coachTools">
      <h2>AI Coach Tools</h2>
      <p>How can I help you today?</p>

      {tools.map((tool) => (
        <div
          className="toolCard"
          key={tool.id}
          onClick={() => onToolClick && onToolClick(tool)}
        >
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
          Be specific in your prompt to get tailored, accurate AI recommendations and custom interview questions.
        </p>
      </div>
    </div>
  );
}