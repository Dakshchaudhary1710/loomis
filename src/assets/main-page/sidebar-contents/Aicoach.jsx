import "./aicoach.css";
import AICoachTools from "./AiCoach-contents/AiCoachFeatures/AICoachTools";
import AIchatBot from "./AiCoach-contents/AiCoachFeatures/aichat/AIchatBot"

export default function Aicoach() {
  return (
    <div className="aiCoachPage">

      {/* Left Section */}
      <div className="historySection">
        <h2>History</h2>
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