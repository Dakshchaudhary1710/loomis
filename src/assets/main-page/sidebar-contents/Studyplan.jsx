import "./studyPlan.css";
import AIMentor from "./AIMentor/AIMentor";
import LearningRoadmap from "./LearningRoadmap/LearningRoadmap";

export default function StudyPlan() {
  return (
    <div className="study-plan">

      {/* LEFT SIDE */}
      <div className="study-plan-main">

        {/* Header */}
        <div className="study-plan-header">
          <div>
            <h1>Study Plan</h1>
            <p>
              Your personalized AI roadmap to crack interviews.
            </p>
          </div>

          <button className="generate-plan-btn">
            + Generate New Plan
          </button>
        </div>

        {/* Learning Roadmap */}
        <LearningRoadmap />

        {/* Upcoming Schedule */}
        <div className="study-card">
          <h2>Upcoming Schedule</h2>
        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="study-plan-right">
        <AIMentor />
      </div>

    </div>
  );
}