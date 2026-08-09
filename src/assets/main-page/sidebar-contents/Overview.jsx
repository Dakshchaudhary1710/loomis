import "./overview.css";

import {
  FaBullseye,
  FaChartLine,
  FaClock,
  FaStar,
  FaAward,
} from "react-icons/fa";

import StatsCard from "./StatsCard/StatsCard";
import InterviewGauge from "./overview-contents/InterviewGauge/InterviewGauge";
import TopicMastery from "./overview-contents/InterviewGauge/TopicMastery/TopicMastery";
import UpcomingPlan from "./overview-contents/InterviewGauge/UpcomingPlan/UpcomingPlan";
import WeeklyHeatmap from "./overview-contents/InterviewGauge/WeeklyHeatmap/WeeklyHeatmap";
import Achievement from "./overview-contents/InterviewGauge/Achievement/Achievement";
import DailyTip from "./overview-contents/InterviewGauge/DailyTip/DailyTip";
import NextInterview from "./overview-contents/InterviewGauge/NextInterview/NextInterview";

/**
 * Small inline wrapper — just draws the white card + title around
 * whatever widget is passed in. Lives here instead of its own file
 * so everything stays in these two files (Overview.jsx / overview.css).
 */
function OverviewCard({ title, children }) {
  return (
    <div className="overview-card">
      <h3 className="overview-card__title">{title}</h3>
      <div className="overview-card__body">{children}</div>
    </div>
  );
}

export default function Overview() {
  const dashboard = {
    practiceStreak: 7,
    bestPerformance: 92,
    practiceTime: "15h 40m",
    questionsAttempted: 132,
    confidence: 78,

    streakGraph: [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
      { value: 6 },
      { value: 7 },
    ],

    performanceGraph: [
      { value: 60 },
      { value: 68 },
      { value: 72 },
      { value: 81 },
      { value: 85 },
      { value: 90 },
      { value: 92 },
    ],

    timeGraph: [
      { value: 2 },
      { value: 4 },
      { value: 5 },
      { value: 8 },
      { value: 10 },
      { value: 12 },
      { value: 15 },
    ],

    questionsGraph: [
      { value: 20 },
      { value: 40 },
      { value: 55 },
      { value: 70 },
      { value: 90 },
      { value: 110 },
      { value: 132 },
    ],

    confidenceGraph: [
      { value: 40 },
      { value: 50 },
      { value: 58 },
      { value: 66 },
      { value: 70 },
      { value: 74 },
      { value: 78 },
    ],
  };

  return (
    <div className="overview">



        <div className="stats-row">

            <StatsCard
                title="Practice Streak"
                value={dashboard.practiceStreak}
                subtitle="Days in a row"
                icon={<FaBullseye />}
                color="#6C3CF5"
                data={dashboard.streakGraph}
            />

            <StatsCard
                title="Best Performance"
                value={`${dashboard.bestPerformance}%`}
                subtitle="On System Design"
                icon={<FaChartLine />}
                color="#22C55E"
                data={dashboard.performanceGraph}
            />

            <StatsCard
                title="Total Practice Time"
                value={dashboard.practiceTime}
                subtitle="This Month"
                icon={<FaClock />}
                color="#F97316"
                data={dashboard.timeGraph}
            />

            <StatsCard
                title="Questions Attempted"
                value={dashboard.questionsAttempted}
                subtitle="Across all Topics"
                icon={<FaStar />}
                color="#3B82F6"
                data={dashboard.questionsGraph}
            />

            <StatsCard
                title="Confidence Score"
                value={`${dashboard.confidence}%`}
                subtitle="Keep Building!"
                icon={<FaAward />}
                color="#EC4899"
                data={dashboard.confidenceGraph}
            />

        </div>



        <div className="middle-row">
            <OverviewCard title="Interview Readiness Gauge">
                <InterviewGauge />
            </OverviewCard>

            <OverviewCard title="Topic Mastery">
                <TopicMastery />
            </OverviewCard>

            <OverviewCard title="Upcoming Plan">
                <UpcomingPlan />
            </OverviewCard>
        </div>



        <div className="bottom-row">
            <OverviewCard title="Weekly Performance">
                <WeeklyHeatmap />
            </OverviewCard>

            <OverviewCard title="Achievement">
                <Achievement />
            </OverviewCard>

            <OverviewCard title="Daily Tip">
                <DailyTip />
            </OverviewCard>
        </div>



       

    </div>
);
}