import "./LearningRoadmap.css";
import {
  HiCheckCircle,
  HiClock,
  HiArrowRight,
} from "react-icons/hi2";

export default function LearningRoadmap() {

  const roadmap = [
    {
      week: "Week 1",
      title: "Foundation",
      status: "completed",
      topics: [
        {
          name: "Arrays",
          progress: 100,
          time: "3 hrs",
          status: "completed",
        },
        {
          name: "Strings",
          progress: 100,
          time: "2 hrs",
          status: "completed",
        },
      ],
    },

    {
      week: "Week 2",
      title: "Data Structures",
      status: "current",
      topics: [
        {
          name: "Linked List",
          progress: 65,
          time: "4 hrs",
          status: "current",
        },
        {
          name: "Stack & Queue",
          progress: 0,
          time: "3 hrs",
          status: "upcoming",
        },
      ],
    },

    {
      week: "Week 3",
      title: "Advanced DSA",
      status: "upcoming",
      topics: [
        {
          name: "Trees",
          progress: 0,
          time: "5 hrs",
          status: "upcoming",
        },
        {
          name: "Graphs",
          progress: 0,
          time: "5 hrs",
          status: "upcoming",
        },
      ],
    },
  ];

  return (
    <div className="roadmap-card">

      {/* Header */}

      <div className="roadmap-header">

        <div>
          <h2>Learning Roadmap</h2>

          <p>
            Your personalized path to interview readiness
          </p>
        </div>

        <button className="roadmap-edit-btn">
          Edit Plan
        </button>

      </div>


      {/* Progress */}

      <div className="roadmap-progress">

        <div className="progress-info">
          <span>Overall Progress</span>
          <strong>68%</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: "68%" }}
          ></div>
        </div>

      </div>


      {/* Roadmap */}

      <div className="roadmap">

        {roadmap.map((week, index) => (

          <div className="roadmap-week" key={index}>

            {/* Timeline */}

            <div className="timeline">

              <div
                className={`timeline-dot ${week.status}`}
              >
                {week.status === "completed" && (
                  <HiCheckCircle />
                )}
              </div>

              {index !== roadmap.length - 1 && (
                <div className="timeline-line"></div>
              )}

            </div>


            {/* Week Content */}

            <div className="week-content">

              <div className="week-heading">

                <div>
                  <span className="week-label">
                    {week.week}
                  </span>

                  <h3>{week.title}</h3>
                </div>

                {week.status === "current" && (
                  <span className="current-badge">
                    Current
                  </span>
                )}

              </div>


              {/* Topics */}

              <div className="roadmap-topics">

                {week.topics.map((topic, topicIndex) => (

                  <div
                    className={`roadmap-topic ${topic.status}`}
                    key={topicIndex}
                  >

                    <div className="topic-info">

                      <div>
                        <h4>{topic.name}</h4>

                        <span className="topic-time">
                          <HiClock />
                          {topic.time}
                        </span>
                      </div>

                      <strong>
                        {topic.progress}%
                      </strong>

                    </div>


                    <div className="topic-progress">

                      <div
                        className="topic-progress-fill"
                        style={{
                          width: `${topic.progress}%`,
                        }}
                      ></div>

                    </div>


                    {topic.status === "current" && (
                      <button className="continue-btn">
                        Continue
                        <HiArrowRight />
                      </button>
                    )}

                  </div>

                ))}

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}