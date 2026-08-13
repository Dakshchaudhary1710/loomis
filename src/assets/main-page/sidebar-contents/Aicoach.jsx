import "./aicoach.css";
import AICoachTools from "./AiCoach-contents/AiCoachFeatures/AiCoachtools";
import AIchatBot from "./AiCoach-contents/AiCoachFeatures/aichat/AIchatBot";
import HistoryPanel from "./AiCoach-contents/AiCoachFeatures/HistoryPanel/HistoryPanel";

export default function Aicoach() {
  return (
    <div className="aiCoachPage">

      {/* Left Section */}
      <div className="historySection">
       <HistoryPanel />
      </div>

      {/* Center Section */}
      <div className="chatSection">
        <AIchatBot/>
      </div>

      {/* Right Section */}
      <div className="toolsSection">
        <AICoachTools />
      </div>

    </div>
  );
}