import "./questionbank.css";

import {
  FaCode,
  FaBookmark,
  FaBullseye,
  FaChartBar,
} from "react-icons/fa";

import SummaryCard from "./SummaryCard/SummaryCard";
import FilterBar from "./FilterBar/FilterBar";

export default function QuestionBank() {
  const dashboard = {
    totalQuestions: 2458,
    bookmarked: 32,
    attempted: 420,
    accuracy: 84,
  };

  return (
    <div className="question-bank">
      <div className="question-bank-header">
        <div>
          <h1>Question Bank</h1>

          <p>
            Practice interview questions by topic,
            company, or difficulty.
          </p>
        </div>
      </div>

      <div className="question-bank-stats">

        <SummaryCard
          title="Total Questions"
          value={dashboard.totalQuestions.toLocaleString()}
          footer="+120 this week"
          icon={<FaCode />}
          iconColor="#6D3CF6"
          iconBackground="#F3EEFF"
        />

        <SummaryCard
          title="Bookmarked"
          value={dashboard.bookmarked}
          footer="View all"
          icon={<FaBookmark />}
          iconColor="#22C55E"
          iconBackground="#EAFBF0"
        />

        <SummaryCard
          title="Attempted"
          value={dashboard.attempted}
          footer="View all"
          icon={<FaBullseye />}
          iconColor="#F59E0B"
          iconBackground="#FFF6E7"
        />

        <SummaryCard
          title="Avg. Accuracy"
          value={`${dashboard.accuracy}%`}
          footer="+7% this week"
          icon={<FaChartBar />}
          iconColor="#2563EB"
          iconBackground="#EEF4FF"
        />

      </div>
      <FilterBar />
    </div>
  );
}