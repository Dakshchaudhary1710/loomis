import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { useTheme } from "../../context/ThemeContext";

import {
  FaCompass,
  FaCode,
  FaRobot,
  FaChartColumn,
  FaAward,
  FaArrowRight,
  FaArrowUp,
  FaCheck,
  FaRotateRight,
  FaGithub,
  FaXTwitter,
  FaLinkedin,
  FaDiscord,
  FaYoutube,
  FaBolt,
  FaShieldHalved,
  FaLightbulb,
  FaBullseye,
  FaFire,
  FaCircleQuestion,
  FaPaperPlane,
} from "react-icons/fa6";
import { FiSun, FiMoon, FiMonitor, FiLayers, FiCheckCircle } from "react-icons/fi";

const steps = [
  {
    id: 1,
    icon: <FaCompass />,
    accent: "#6C3CF0",
    accentSoft: "#EEE9FF",
    tag: "Step 01 · Personalize",
    title: "Personalized Learning Paths",
    description:
      "Select your target career goal (e.g. Full-Stack Developer) and Loomis builds a structured roadmap based on what you already know and what you still need to learn.",
    stat: "Tailored 4-month milestones",
    route: "/main/studyplan",
    buttonText: "Explore Learning Roadmap",
  },
  {
    id: 2,
    icon: <FaCode />,
    accent: "#22C55E",
    accentSoft: "#E9FBEF",
    tag: "Step 02 · Practice",
    title: "Targeted Coding Practice",
    description:
      "Solve technical problems spanning DSA, frontend frameworks, backend APIs, and CS fundamentals. Track attempts, accuracy, and performance in real time.",
    stat: "500+ curated problems",
    route: "/main/questionbank",
    buttonText: "Open Question Bank",
  },
  {
    id: 3,
    icon: <FaRobot />,
    accent: "#F59E0B",
    accentSoft: "#FFF3E7",
    tag: "Step 03 · Analyze",
    title: "AI Skill-Gap Analyzer",
    description:
      "AI detects specific weak spots (e.g. Database Indexing, Authentication) and recommends exact next actions instead of just generic chatbot answers.",
    stat: "Real-time gap detection",
    route: "/main/aicoach",
    buttonText: "See AI Skill-Gap Analysis",
  },
  {
    id: 4,
    icon: <FaChartColumn />,
    accent: "#3B82F6",
    accentSoft: "#EEF3FF",
    tag: "Step 04 · Master",
    title: "Deep Topic Mastery",
    description:
      "Move beyond simply finishing a course. Loomis measures how well you understand each subtopic (e.g. React: 82%, REST APIs: 54%, Auth: 28%).",
    stat: "Granular subtopic scoring",
    route: "/main/overview",
    buttonText: "Inspect Topic Mastery",
  },
  {
    id: 5,
    icon: <FaAward />,
    accent: "#EC4899",
    accentSoft: "#FFEAF4",
    tag: "Step 05 · Job-Ready",
    title: "Goals & Career Readiness",
    description:
      "Connect learning with achievements, streak milestones, and resume readiness so you walk into technical interviews fully prepared.",
    stat: "Verified job readiness",
    route: "/main/resumeanalysis",
    buttonText: "View Resume & Career Tools",
  },
];

const SAMPLE_PATH_ROLES = {
  "Full-Stack Developer": [
    { title: "JavaScript & Fundamentals", status: "mastered", score: "92%" },
    { title: "React & Modern UI Systems", status: "mastered", score: "82%" },
    { title: "REST APIs & Backend Architecture", status: "in-progress", score: "54%" },
    { title: "Databases & Query Optimization", status: "needs-focus", score: "41%" },
    { title: "Authentication & Security (JWT/OAuth)", status: "weak-gap", score: "28%" },
    { title: "Production Full-Stack Projects", status: "locked", score: "Sprint 4" },
  ],
  "Backend Engineer": [
    { title: "Data Structures & Algorithms", status: "mastered", score: "88%" },
    { title: "Node.js / Django Services", status: "mastered", score: "78%" },
    { title: "PostgreSQL & Indexing", status: "in-progress", score: "62%" },
    { title: "Distributed Caching (Redis)", status: "needs-focus", score: "45%" },
    { title: "Microservices & Concurrency", status: "locked", score: "Sprint 4" },
  ],
  "Frontend Engineer": [
    { title: "HTML5, CSS & Modern JS (ES6+)", status: "mastered", score: "95%" },
    { title: "React 19 & Fiber Architecture", status: "mastered", score: "85%" },
    { title: "State Management & Performance", status: "in-progress", score: "68%" },
    { title: "TypeScript & Design Systems", status: "needs-focus", score: "52%" },
    { title: "End-to-End Testing & Web Vitals", status: "locked", score: "Sprint 4" },
  ],
};

const DAILY_TIPS = [
  "💡 Skill-Gap Strategy: Master subtopics (Async JS, DB Indexing) before building complex full-stack projects.",
  "🔥 Goal Planning: 30 minutes of consistent daily coding beats 6-hour weekend cramming every single time.",
  "⚡ Deep Topic Mastery: Completing a course is not the same as mastering it. Measure your practice accuracy!",
  "🎯 Job-Readiness: Connect your completed milestones directly to your resume bullet points and portfolio.",
];

export default function Footer() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState("Full-Stack Developer");
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactGoal, setContactGoal] = useState("Full-Stack Developer");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const { theme, setTheme } = useTheme();
  const itemRefs = useRef([]);
  const [visible, setVisible] = useState(() => new Set());

  // Intersection observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setVisible((prev) => {
              if (prev.has(idx)) return prev;
              const next = new Set(prev);
              next.add(idx);
              return next;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Tip ticker auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % DAILY_TIPS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactEmail || !contactName) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentStep = steps[activeStep];

  return (
    <div className="landing-footer-wrapper">
    
      <section className="prep-toolkit" id="learning-paths">
        <div className="prep-toolkit-header">
          <span className="prep-eyebrow">
            <FaBolt className="prep-eyebrow-icon" /> The Job-Readiness Loop
          </span>
          <h2 className="prep-title">Learn. Practice.  Master.</h2>
          <p className="prep-subtitle">
            Most learning platforms ask <em>"What course should I finish next?"</em> Loomis helps
            answer: <strong>"What should I learn, practice, and improve next to become job-ready?"</strong>
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="prep-tabs-nav">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              className={`prep-tab-btn ${activeStep === idx ? "is-active" : ""}`}
              onClick={() => setActiveStep(idx)}
              style={{
                "--tab-accent": step.accent,
                "--tab-accent-soft": step.accentSoft,
              }}
            >
              <span className="prep-tab-icon">{step.icon}</span>
              <span className="prep-tab-title">{step.title}</span>
              <span className="prep-tab-num">0{step.id}</span>
            </button>
          ))}
        </div>

        {/* Two-Column Interactive Arena */}
        <div className="prep-arena" id="mastery-section">
          {/* Left Column: Step Sequence List */}
          <div className="prep-path">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                ref={(el) => (itemRefs.current[idx] = el)}
                data-index={idx}
                className={`prep-item ${visible.has(idx) ? "is-visible" : ""} ${
                  activeStep === idx ? "is-selected-step" : ""
                }`}
                style={{ "--accent": step.accent, "--accent-soft": step.accentSoft }}
                onClick={() => setActiveStep(idx)}
              >
                <div className="prep-item-marker">
                  <div className="prep-item-icon">{step.icon}</div>
                  {idx !== steps.length - 1 && <div className="prep-item-line" />}
                </div>

                <div className="prep-item-card">
                  <div className="prep-card-top-row">
                    <span className="prep-item-tag">{step.tag}</span>
                    {activeStep === idx && (
                      <span className="prep-active-pill">Active Preview</span>
                    )}
                  </div>
                  <h3 className="prep-item-title">{step.title}</h3>
                  <p className="prep-item-desc">{step.description}</p>
                  <div className="prep-item-footer">
                    <span className="prep-item-stat">{step.stat}</span>
                    <Link
                      to={step.route}
                      className="prep-direct-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Open Feature</span>
                      <FaArrowRight className="prep-item-arrow" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Live Interactive Sandbox / Simulator */}
          <div className="prep-sandbox-container">
            <div className="prep-sandbox-card">
              {/* Header */}
              <div className="sandbox-header">
                <div className="sandbox-header-left">
                  <div
                    className="sandbox-header-icon"
                    style={{ background: currentStep.accentSoft, color: currentStep.accent }}
                  >
                    {currentStep.icon}
                  </div>
                  <div>
                    <h4 className="sandbox-header-title">{currentStep.title}</h4>
                    <p className="sandbox-header-subtitle">Interactive Platform Simulation</p>
                  </div>
                </div>
                <div className="sandbox-badge">
                  <span className="sandbox-live-dot"></span> Live Demo
                </div>
              </div>


              <div className="sandbox-body">

                {activeStep === 0 && (
                  <div className="sandbox-view view-path">
                    <div className="domain-selector">
                      {Object.keys(SAMPLE_PATH_ROLES).map((role) => (
                        <button
                          key={role}
                          className={`domain-pill ${selectedRole === role ? "is-selected" : ""}`}
                          onClick={() => setSelectedRole(role)}
                        >
                          {role}
                        </button>
                      ))}
                    </div>

                    <div className="path-roadmap-list">
                      {SAMPLE_PATH_ROLES[selectedRole].map((stage, i) => (
                        <div key={stage.title} className="path-stage-row">
                          <span className="path-stage-num">{i + 1}</span>
                          <span className="path-stage-name">{stage.title}</span>
                          <span className={`path-stage-badge badge-${stage.status}`}>
                            {stage.score}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="sandbox-tip-box">
                      <FaLightbulb />
                      <span>
                        <strong>Loomis Path Engine:</strong> As you complete questions, your path
                        dynamically highlights weak spots so you don't get stuck on unmastered concepts.
                      </span>
                    </div>
                  </div>
                )}

                {/* STEP 2: CODING PRACTICE */}
                {activeStep === 1 && (
                  <div className="sandbox-view view-questions">
                    <div className="practice-stats-grid">
                      <div className="practice-stat-box">
                        <span className="p-stat-val">420</span>
                        <span className="p-stat-lbl">Questions Solved</span>
                      </div>
                      <div className="practice-stat-box">
                        <span className="p-stat-val" style={{ color: "#22C55E" }}>84%</span>
                        <span className="p-stat-lbl">Accuracy Rate</span>
                      </div>
                      <div className="practice-stat-box">
                        <span className="p-stat-val" style={{ color: "#F59E0B" }}>12 Days</span>
                        <span className="p-stat-lbl">Active Streak</span>
                      </div>
                    </div>

                    <div className="mock-question-box">
                      <div className="mock-q-meta">
                        <span className="mock-diff-badge">Intermediate · Web & APIs</span>
                        <span className="mock-role-badge">Authentication Focus</span>
                      </div>
                      <p className="mock-q-text">
                        "Implement JWT authentication middleware and explain why stateless tokens require Redis for token revocation."
                      </p>
                    </div>

                    <div className="sandbox-tip-box">
                      <FaCode />
                      <span>
                        <strong>Practice Tracking:</strong> Questions cover Programming (DSA), Development (React, APIs, Django), and CS Fundamentals.
                      </span>
                    </div>
                  </div>
                )}


                {activeStep === 2 && (
                  <div className="sandbox-view view-feedback">
                    <div className="ai-gap-card">
                      <div className="ai-gap-header">
                        <FaRobot className="ai-gap-icon" />
                        <div>
                          <strong>AI Skill-Gap Detection</strong>
                          <p>2 Weak Areas Flagged in Full-Stack Track</p>
                        </div>
                      </div>
                      <p className="ai-gap-quote">
                        "Your React fundamentals are strong (82%), but your API and authentication performance is lower (28%). Focus on REST APIs and authentication before moving to advanced full-stack topics."
                      </p>
                    </div>

                    <div className="ai-action-list">
                      <div className="ai-action-item">
                        <span className="action-step">1</span>
                        <span>Review JWT & Session Auth Fundamentals</span>
                      </div>
                      <div className="ai-action-item">
                        <span className="action-step">2</span>
                        <span>Practice 5 Database Indexing Problems</span>
                      </div>
                    </div>
                  </div>
                )}


                {activeStep === 3 && (
                  <div className="sandbox-view view-analytics">
                    <div className="analytics-metrics-list">
                      <div className="analytics-row">
                        <span className="analytics-lbl">React</span>
                        <div className="analytics-bar-bg">
                          <div className="analytics-bar-fill" style={{ width: "82%", background: "#22C55E" }}></div>
                        </div>
                        <span className="analytics-pct">82%</span>
                      </div>
                      <div className="analytics-row">
                        <span className="analytics-lbl">JavaScript</span>
                        <div className="analytics-bar-bg">
                          <div className="analytics-bar-fill" style={{ width: "76%", background: "#6C3CF0" }}></div>
                        </div>
                        <span className="analytics-pct">76%</span>
                      </div>
                      <div className="analytics-row">
                        <span className="analytics-lbl">REST APIs</span>
                        <div className="analytics-bar-bg">
                          <div className="analytics-bar-fill" style={{ width: "54%", background: "#F59E0B" }}></div>
                        </div>
                        <span className="analytics-pct">54%</span>
                      </div>
                      <div className="analytics-row">
                        <span className="analytics-lbl">Databases & SQL</span>
                        <div className="analytics-bar-bg">
                          <div className="analytics-bar-fill" style={{ width: "41%", background: "#EC4899" }}></div>
                        </div>
                        <span className="analytics-pct">41%</span>
                      </div>
                      <div className="analytics-row">
                        <span className="analytics-lbl">Authentication</span>
                        <div className="analytics-bar-bg">
                          <div className="analytics-bar-fill" style={{ width: "28%", background: "#EF4444" }}></div>
                        </div>
                        <span className="analytics-pct">28%</span>
                      </div>
                    </div>

                    <div className="analytics-trend-banner">
                      <FaChartColumn />
                      <span>
                        <strong>Mastery vs Completion:</strong> Measure what you've actually mastered vs just watched.
                      </span>
                    </div>
                  </div>
                )}


                {activeStep === 4 && (
                  <div className="sandbox-view view-roadmap">
                    <div className="goal-status-box">
                      <div className="goal-status-top">
                        <span className="goal-title">Goal: Internship-Ready in 4 Months</span>
                        <strong className="goal-pct">68% On Track</strong>
                      </div>
                      <div className="goal-track">
                        <div className="goal-fill" style={{ width: "68%" }}></div>
                      </div>
                    </div>

                    <div className="achievements-mini-grid">
                      <div className="achieve-pill unlocked">
                        <FaAward /> First 100 Questions
                      </div>
                      <div className="achieve-pill unlocked">
                        <FaFire /> 12-Day Streak
                      </div>
                      <div className="achieve-pill unlocked">
                        <FaBolt /> React Mastery
                      </div>
                      <div className="achieve-pill locked">
                        🔒 Full-Stack Project MVP
                      </div>
                    </div>
                  </div>
                )}
              </div>


              <div className="sandbox-cta-footer">
                <Link to={currentStep.route} className="sandbox-launch-btn">
                  <span>{currentStep.buttonText}</span>
                  <FaArrowRight />
                </Link>
                <Link to="/main" className="sandbox-secondary-btn">
                  Open Platform Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section className="about-loomis-section" id="about-loomis">
        <div className="about-inner-container">
          <div className="about-header">
            <span className="prep-eyebrow">About Loomis</span>
            <h2 className="about-title">Why We Built Loomis</h2>
            <p className="about-subtitle">
              Most learning platforms focus only on course completion. Loomis focuses on the entire
              journey to help students move from basic coding exercises to genuine job readiness.
            </p>
          </div>

          <div className="about-pillars-grid">
            <div className="about-pillar-card">
              <div className="pillar-num">01</div>
              <h3 className="pillar-title">Learn with Direction</h3>
              <p className="pillar-desc">
                Follow structured learning paths tailored to your career goal (Full-Stack, Backend,
                Frontend) instead of wondering which tutorial to start next.
              </p>
            </div>

            <div className="about-pillar-card">
              <div className="pillar-num">02</div>
              <h3 className="pillar-title">Practice & Validate</h3>
              <p className="pillar-desc">
                Solve coding and conceptual challenges with real-time tracking across attempts, accuracy,
                and topic mastery.
              </p>
            </div>

            <div className="about-pillar-card">
              <div className="pillar-num">03</div>
              <h3 className="pillar-title">AI Skill-Gap Guidance</h3>
              <p className="pillar-desc">
                Our AI continuously analyzes your performance, pinpoints exact weak spots (e.g.
                Database Indexing, Auth), and recommends clear next actions.
              </p>
            </div>

            <div className="about-pillar-card">
              <div className="pillar-num">04</div>
              <h3 className="pillar-title">Become Job-Ready</h3>
              <p className="pillar-desc">
                Set milestone goals (e.g., Job-Ready in 4 Months), track topic mastery percentages,
                and connect your learning directly to your resume.
              </p>
            </div>
          </div>

          <div className="about-quote-banner">
            <p className="quote-text">
              "Don't just learn to complete courses — learn, practice, build, and become job-ready."
            </p>
            <span className="quote-author">— The Loomis Philosophy</span>
          </div>
        </div>
      </section>

  
      <section className="contact-loomis-section" id="contact-section">
        <div className="contact-inner-container">
          <div className="contact-grid">
            {/* Left: Contact info & Discord */}
            <div className="contact-info-col">
              <span className="prep-eyebrow">Get in Touch</span>
              <h2 className="contact-title">Have Questions or Want Custom Learning Guidance?</h2>
              <p className="contact-desc">
                Whether you're a student preparing for your first software engineering role or looking
                for personalized career roadmap advice, we're here to help.
              </p>

              <div className="contact-perks-list">
                <div className="perk-item">
                  <FiCheckCircle className="perk-icon" />
                  <div>
                    <strong>Student & Career Mentorship:</strong> Ask technical and roadmap questions.
                  </div>
                </div>
                <div className="perk-item">
                  <FiCheckCircle className="perk-icon" />
                  <div>
                    <strong>Curriculum Feedback:</strong> Suggest new topics, question sets, or projects.
                  </div>
                </div>
                <div className="perk-item">
                  <FiCheckCircle className="perk-icon" />
                  <div>
                    <strong>Community Discord:</strong> Connect with 12,000+ ambitious engineers.
                  </div>
                </div>
              </div>
            </div>


            <div className="contact-form-card">
              <h3 className="form-card-title">Send Us a Message</h3>
              <p className="form-card-subtitle">We typically reply within 24 hours.</p>

              {contactSubmitted ? (
                <div className="contact-success-state">
                  <FiCheckCircle className="success-icon" />
                  <h4>Message Sent Successfully!</h4>
                  <p>Thanks for reaching out, {contactName || "Engineer"}. Our mentorship team will get back to you shortly.</p>
                  <button className="reset-form-btn" onClick={() => setContactSubmitted(false)}>
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="contact-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Daksh Chaudhary"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="you@university.edu or email@domain.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Target Career Goal</label>
                    <select
                      value={contactGoal}
                      onChange={(e) => setContactGoal(e.target.value)}
                    >
                      <option value="Full-Stack Developer">Full-Stack Developer</option>
                      <option value="Backend Engineer">Backend Engineer</option>
                      <option value="Frontend Engineer">Frontend Engineer</option>
                      <option value="AI / ML Engineer">AI / ML Engineer</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Message / Question</label>
                    <textarea
                      rows="3"
                      placeholder="Tell us about your learning goals or questions..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                    ></textarea>
                  </div>

                  <button type="submit" className="contact-submit-btn">
                    <span>Send Message</span>
                    <FaPaperPlane />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

  
      <footer className="loomis-footer" id="footer">
        {/* Top Ticker: Career Insight & AI Tips */}
        <div className="footer-ticker-bar">
          <div className="footer-ticker-content">
            <span className="ticker-badge">Daily Prep Insight</span>
            <p className="ticker-text">{DAILY_TIPS[currentTipIndex]}</p>
          </div>
          <div className="footer-ticker-controls">
            <button
              onClick={() =>
                setCurrentTipIndex(
                  (prev) => (prev - 1 + DAILY_TIPS.length) % DAILY_TIPS.length
                )
              }
              aria-label="Previous tip"
            >
              ‹
            </button>
            <button
              onClick={() =>
                setCurrentTipIndex((prev) => (prev + 1) % DAILY_TIPS.length)
              }
              aria-label="Next tip"
            >
              ›
            </button>
          </div>
        </div>

        <div className="footer-main-container">
          {/* Top Row: Brand Info */}
          <div className="footer-top-grid">
            <div className="footer-brand-col">
              <div className="footer-logo-row" onClick={scrollToTop}>
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="46" fill="#1E1B4B" />
                  <path
                    d="M 35 28 V 55 A 8 8 0 0 0 43 63 H 47 A 8 8 0 0 0 55 55 V 45 A 8 8 0 0 1 63 37 H 65 A 8 8 0 0 1 73 45 V 68"
                    stroke="#A78BFA"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polygon points="73,54 63,68 83,68" fill="#38BDF8" />
                </svg>
                <span className="footer-brand-name">Loomis</span>
              </div>
              <p className="footer-brand-desc">
                AI-Powered Learning & Job-Readiness Platform. Helping students learn, practice,
                track progress, identify skill gaps, and follow a personalized path to career success.
              </p>
              <div className="footer-status-pill">
                <span className="status-indicator-dot"></span>
                <span>All Learning AI Systems Operational • 99.98% Uptime</span>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="footer-cta-card">
              <h4 className="footer-cta-title">Ready to Start Your Personalized Path?</h4>
              <p className="footer-cta-desc">
                Join thousands of students and engineers mastering skills and becoming job-ready.
              </p>
              <div className="footer-cta-buttons">
                <Link to="/main" className="footer-launch-btn">
                  Launch Learning Dashboard <FaArrowRight />
                </Link>
                <button
                  className="footer-about-btn"
                  onClick={() => {
                    const el = document.getElementById("about-loomis");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Learn Our Philosophy
                </button>
              </div>
            </div>
          </div>

          <div className="footer-divider"></div>

          {/* Nav Links Columns Grid */}
          <div className="footer-nav-grid">
            {/* Col 1 */}
            <div className="footer-nav-col">
              <h5 className="footer-nav-header">
                <FiLayers className="col-header-icon" /> Learning Tracks
              </h5>
              <ul className="footer-links-list">
                <li>
                  <Link to="/main/studyplan">
                    Full-Stack Developer <span className="link-badge">Popular</span>
                  </Link>
                </li>
                <li>
                  <Link to="/main/studyplan">Backend & REST APIs</Link>
                </li>
                <li>
                  <Link to="/main/studyplan">Frontend & Modern React</Link>
                </li>
                <li>
                  <Link to="/main/questionbank">Data Structures & Algorithms</Link>
                </li>
                <li>
                  <Link to="/main/questionbank">SQL & Database Systems</Link>
                </li>
              </ul>
            </div>

            {/* Col 2 */}
            <div className="footer-nav-col">
              <h5 className="footer-nav-header">
                <FaCode className="col-header-icon" /> Core Features
              </h5>
              <ul className="footer-links-list">
                <li>
                  <Link to="/main/studyplan">Personalized Learning Paths</Link>
                </li>
                <li>
                  <Link to="/main/questionbank">Technical Question Bank</Link>
                </li>
                <li>
                  <Link to="/main/aicoach">
                    AI Skill-Gap Analyzer <span className="link-badge new">AI</span>
                  </Link>
                </li>
                <li>
                  <Link to="/main/overview">Topic Mastery Inspector</Link>
                </li>
                <li>
                  <Link to="/main/resumeanalysis">Resume & Career Tools</Link>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="footer-nav-col">
              <h5 className="footer-nav-header">
                <FaBullseye className="col-header-icon" /> Resources
              </h5>
              <ul className="footer-links-list">
                <li>
                  <Link to="/main/studyplan">4-Month Job-Ready Blueprint</Link>
                </li>
                <li>
                  <Link to="/main/questionbank">DSA Problem Patterns</Link>
                </li>
                <li>
                  <Link to="/main/resumeanalysis">ATS Resume Optimization</Link>
                </li>
                <li>
                  <a href="#contact-section">Mentorship Community</a>
                </li>
                <li>
                  <Link to="/main/settings">Student Settings</Link>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="footer-nav-col">
              <h5 className="footer-nav-header">
                <FaShieldHalved className="col-header-icon" /> About & Support
              </h5>
              <ul className="footer-links-list">
                <li>
                  <a
                    href="#about-loomis"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("about-loomis");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    The Loomis Philosophy
                  </a>
                </li>
                <li>
                  <a
                    href="#contact-section"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("contact-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Contact Mentors
                  </a>
                </li>
                <li>
                  <Link to="/main/settings">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/main/settings">Terms of Platform</Link>
                </li>
                <li>
                  <a href="mailto:contact@loomis.ai">contact@loomis.ai</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-divider"></div>

          {/* Bottom Bar: Theme Switcher + Copyright + Social Links + Back to Top */}
          <div className="footer-bottom-bar">
            {/* Theme Toggle Segment */}
            <div className="footer-theme-selector">
              <span className="theme-selector-label">Appearance:</span>
              <div className="theme-segmented-group">
                <button
                  className={`theme-segment-btn ${theme === "light" ? "is-active" : ""}`}
                  onClick={() => setTheme("light")}
                  title="Switch to light mode"
                >
                  <FiSun /> Light
                </button>
                <button
                  className={`theme-segment-btn ${theme === "dark" ? "is-active" : ""}`}
                  onClick={() => setTheme("dark")}
                  title="Switch to dark mode"
                >
                  <FiMoon /> Dark
                </button>
                <button
                  className={`theme-segment-btn ${theme === "system" ? "is-active" : ""}`}
                  onClick={() => setTheme("system")}
                  title="Use system preferences"
                >
                  <FiMonitor /> Auto
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="footer-social-links">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="Loomis on GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="Loomis on X"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="Loomis on LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="Loomis Discord Community"
              >
                <FaDiscord />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label="Loomis YouTube"
              >
                <FaYoutube />
              </a>
            </div>

            {/* Back to Top */}
            <button className="footer-back-to-top" onClick={scrollToTop} aria-label="Back to top">
              <span>Back to top</span>
              <FaArrowUp />
            </button>
          </div>

          <div className="footer-copyright-row">
            <p className="copyright-text">
              © 2026 Loomis — AI-Powered Learning & Job-Readiness Platform. Built for ambitious students and engineers.
            </p>
            <div className="footer-security-badge">
              <FaShieldHalved />
              <span>Job-Ready Learning Framework</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}