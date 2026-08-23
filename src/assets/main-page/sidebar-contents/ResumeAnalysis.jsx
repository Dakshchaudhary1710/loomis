import "./ResumeAnalysis.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaFileUpload,
  FaBriefcase,
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
  FaRobot,
} from "react-icons/fa";

export default function ResumeAnalysis() {
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [analysis, setAnalysis] = useState({
    resumeScore: 82,
    atsScore: 76,
    jobMatch: 71,
    matchedSkills: ["React", "JavaScript", "HTML", "CSS", "REST APIs", "Git"],
    missingSkills: ["TypeScript", "Docker", "AWS", "GraphQL", "CI/CD"],
  });

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
    }
  };

  const handleAnalyze = () => {
    if (!resume) {
      alert("Please upload your resume file first.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please enter a job description to compare with.");
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysis({
        resumeScore: 88,
        atsScore: 82,
        jobMatch: 79,
        matchedSkills: ["React", "JavaScript", "HTML", "CSS", "Node.js", "Redux"],
        missingSkills: ["TypeScript", "Docker", "AWS", "Kubernetes"],
      });
    }, 900);
  };

  const handleReviewWithAiCoach = () => {
    const prompt = `Review my Resume Analysis results:\n- Overall Score: ${analysis.resumeScore}/100\n- ATS Score: ${analysis.atsScore}/100\n- Job Match: ${analysis.jobMatch}/100\n- Matched Skills: ${analysis.matchedSkills.join(", ")}\n- Missing Skills: ${analysis.missingSkills.join(", ")}\n\nHow can I improve my resume to bridge these gaps for my target role?`;

    navigate("/main/aicoach", {
      state: {
        prompt: prompt,
      },
    });
  };

  return (
    <div className="resume-analysis">
      {/* ================= HEADER ================= */}
      <div className="resume-analysis-header">
        <div>
          <h1>Resume Analysis</h1>
          <p>
            Analyze your resume and compare it with target job descriptions for AI-powered feedback.
          </p>
        </div>
      </div>

      {/* ================= INPUT SECTION ================= */}
      <div className="input-grid">
        {/* RESUME UPLOAD */}
        <div className="input-card">
          <div className="card-heading">
            <div className="heading-icon">
              <FaFileUpload />
            </div>
            <div>
              <h2>Your Resume</h2>
              <p>Upload your latest resume</p>
            </div>
          </div>

          <label className="upload-area">
            <FaFileUpload className="upload-icon" />

            {resume ? (
              <>
                <h3>{resume.name}</h3>
                <p>Resume uploaded successfully</p>
              </>
            ) : (
              <>
                <h3>Upload your resume</h3>
                <p>Drag & drop or click to upload</p>
                <span>PDF, DOC or DOCX</span>
              </>
            )}

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
            />
          </label>
        </div>

        {/* JOB DESCRIPTION */}
        <div className="input-card">
          <div className="card-heading">
            <div className="heading-icon">
              <FaBriefcase />
            </div>
            <div>
              <h2>Job Description</h2>
              <p>Add the job description you are targeting</p>
            </div>
          </div>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
          />

          <div className="character-count">
            {jobDescription.length} characters
          </div>
        </div>
      </div>

      {/* ================= ANALYZE & COMPARE ================= */}
      <div className="analyze-compare">
        <div className="analyze-compare-content">
          <div className="compare-icon">
            <FaChartLine />
          </div>
          <div>
            <h2>Ready to analyze your resume?</h2>
            <p>
              Compare your resume with the job description to discover your match score, missing skills, and actionable areas for improvement.
            </p>
          </div>
        </div>

        <button
          className="analyze-compare-btn"
          onClick={handleAnalyze}
          disabled={isAnalyzing}
        >
          <FaChartLine />
          {isAnalyzing ? "Analyzing..." : "Analyze & Compare"}
        </button>
      </div>

      {/* ================= ANALYSIS RESULTS ================= */}
      <div className="analysis-results">
        <div className="results-heading">
          <div>
            <h2>Analysis Results</h2>
            <p>
              See how well your resume matches the target job description.
            </p>
          </div>

          <button
            className="review-with-ai-btn"
            onClick={handleReviewWithAiCoach}
          >
            <FaRobot />
            Review with AI Coach
          </button>
        </div>

        {/* SCORE CARDS */}
        <div className="score-grid">
          {/* Resume Score */}
          <div className="score-card">
            <h3>Resume Score</h3>
            <div className="score-value">
              {analysis.resumeScore}
              <span>/100</span>
            </div>
            <p>Overall resume quality</p>
          </div>

          {/* ATS Score */}
          <div className="score-card">
            <h3>ATS Score</h3>
            <div className="score-value">
              {analysis.atsScore}
              <span>/100</span>
            </div>
            <p>ATS compatibility rating</p>
          </div>

          {/* Job Match */}
          <div className="score-card">
            <h3>Job Match</h3>
            <div className="score-value">
              {analysis.jobMatch}
              <span>/100</span>
            </div>
            <p>Target job alignment</p>
          </div>
        </div>

        {/* ================= SKILL COMPARISON ================= */}
        <div className="comparison-grid">
          {/* MATCHED SKILLS */}
          <div className="comparison-card">
            <div className="comparison-heading">
              <FaCheckCircle />
              <div>
                <h3>Matched Skills</h3>
                <p>
                  Key competencies identified in both your resume and job description.
                </p>
              </div>
            </div>

            {analysis.matchedSkills.length === 0 ? (
              <div className="empty-analysis">
                <p>No matched skills yet.</p>
                <span>Upload your resume and analyze it.</span>
              </div>
            ) : (
              <div className="skills-list">
                {analysis.matchedSkills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            )}
          </div>

          {/* MISSING SKILLS */}
          <div className="comparison-card">
            <div className="comparison-heading">
              <FaTimesCircle />
              <div>
                <h3>Missing Skills</h3>
                <p>
                  Important skills listed in the job description that could improve your match.
                </p>
              </div>
            </div>

            {analysis.missingSkills.length === 0 ? (
              <div className="empty-analysis">
                <p>No missing skills yet.</p>
                <span>Analyze your resume to find gaps.</span>
              </div>
            ) : (
              <div className="skills-list">
                {analysis.missingSkills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}