import "./footer.css"

import {
  FaFileLines,
  FaRobot,
  FaComments,
  FaChartColumn,
  FaBookOpen,
  FaMicrophoneLines,
} from "react-icons/fa6";

const lastBlockData = [
  {
    id: 1,
    icon: <FaFileLines />,
    bg: "#EEE9FF",
    color: "#6C3CF0",
    title: "Resume Analysis",
    description:
      "Upload your resume and get AI-powered analysis with key skills and suggestions.",
  },
  {
    id: 2,
    icon: <FaRobot />,
    bg: "#E9FBEF",
    color: "#22C55E",
    title: "AI-Powered Questions",
    description:
      "Get role-specific interview questions tailored to your experience and skills.",
  },
  {
    id: 3,
    icon: <FaComments />,
    bg: "#FFF3E7",
    color: "#F59E0B",
    title: "Smart Feedback",
    description:
      "Receive instant AI feedback and detailed analysis to improve your answers.",
  },
  {
    id: 4,
    icon: <FaChartColumn />,
    bg: "#EEF3FF",
    color: "#3B82F6",
    title: "Performance Analytics",
    description:
      "Track your progress with insightful analytics and performance trends.",
  },
  {
    id: 5,
    icon: <FaBookOpen />,
    bg: "#FFEAF4",
    color: "#EC4899",
    title: "Learning Roadmap",
    description:
      "Get a personalized learning plan to improve your weak areas and grow faster.",
  },
  {
    id: 6,
    icon: <FaMicrophoneLines />,
    bg: "#F3EEFF",
    color: "#6C3CF0",
    title: "Voice Interviews",
    description:
      "Practice real-time voice interviews with AI for a real interview experience.",
  },
];

export default function Footer(){
  return(
<div className="last-part">
  <div className="last-top">

    <div className="last-top-one">Everything You Need to Succeed</div>
    <div className="last-top-two">Our Al coach helps you practice, improve, and ace your interviews.</div>
     </div>
 <div className="last-blocks">
        {lastBlockData.map((item) => (
          <div className="last-block" key={item.id}>
            <div className="last-block-icon"
            style={{backgroundColor:item.bg,
               color:item.color,
            }
         
          }
            > 
{item.icon}
            </div>
            <div className="last-block-title">{item.title} </div>
            <div className="last-block-dis"> {item.description}</div>

          </div>
        ))}
  </div>

</div>
  )
}
