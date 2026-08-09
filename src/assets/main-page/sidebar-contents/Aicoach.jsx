import "./aicoach.css";
import AICoachTools from "./AiCoach-contents/AiCoachFeatures/AICoachTools";

export default function Aicoach() {
  return (
    <div className="aiCoachPage">

      {/* Left Section */}
      <div className="historySection">
        <h2>History</h2>
      </div>

      {/* Center Section */}
      <div className="chatSection">
        <h2>AI chatbot</h2>
      </div>

      {/* Right Section */}
      <div className="toolsSection">
        <AICoachTools />
      </div>

    </div>
  );
}