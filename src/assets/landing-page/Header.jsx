import { useState } from "react";
import "./header.css";
import Modal from "./login-page/Modal";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const landpageTop = [
  { id: 1, title: "Home", target: "hero" },
  { id: 2, title: "Learning Paths", target: "learning-paths" },
  { id: 3, title: "Topic Mastery", target: "mastery-section" },
  { id: 4, title: "About Loomis", target: "about-loomis" },
  { id: 5, title: "Contact", target: "contact-section" },
];

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showPricing, setShowPricing] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleNavClick = (item) => {
    if (item.target === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(item.target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleGetPro = () => {
    setShowPricing(false);
    setIsLogin(false);
    setShowLogin(true);
  };

  return (
    <>
      <div className="full-head">
        <div className="left-part" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="left-title-icon">
            <svg
              width="50"
              height="50"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="46" fill="#E7EDF5" stroke="#3F5F8F" strokeWidth="4" />
              <path
                d="M 35 28 V 55 A 8 8 0 0 0 43 63 H 47 A 8 8 0 0 0 55 55 V 45 A 8 8 0 0 1 63 37 H 65 A 8 8 0 0 1 73 45 V 68"
                stroke="#3F5F8F"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polygon points="73,54 63,68 83,68" fill="#5E8065" />
            </svg>
          </div>
          <div className="left-title">Loomis</div>
        </div>

        <div className="middle-part">
          {landpageTop.map((item) => (
            <div
              className="middle-elements"
              key={item.id}
              onClick={() => handleNavClick(item)}
            >
              {item.title}
            </div>
          ))}
        </div>

        <div className="right-part">
          <div className="right-end">
           
           

            <div
              className="right-end-1"
              onClick={() => {
                setShowLogin(true);
                setIsLogin(true);
              }}
            >
              Login
            </div>

            <button className="right-end-2" onClick={() => setShowPricing(true)}>
              <FaCrown style={{ color: "#FFFFFF", fontSize: "15px", marginRight: "8px" }} />
              <span>Upgrade To Pro</span>
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={showLogin} onClose={() => setShowLogin(false)}>
        {isLogin ? (
          <>
            <h2>Welcome Back</h2>

            <input type="email" placeholder="Email" />

            <input type="password" placeholder="Password" />

            <button>Login</button>

            <p>
              Don't have an account?{" "}
              <span
                onClick={() => setIsLogin(false)}
                style={{
                  color: "#3F5F8F",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Create Account
              </span>
            </p>
          </>
        ) : (
          <>
            <h2>Create Account</h2>

            <input type="text" placeholder="Full Name" required />

            <input type="email" placeholder="Email Address" />

            <input type="password" placeholder="Password" />

            <input type="password" placeholder="Confirm Password" />

            <select defaultValue="">
              <option value="" disabled>
                Select Experience
              </option>

              <option>Student</option>
              <option>Fresher</option>
              <option>0 - 1 Years</option>
              <option>1 - 3 Years</option>
              <option>3+ Years</option>
            </select>

            <button>Create Account</button>

            <p>
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                style={{
                  color: "#3F5F8F",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Login
              </span>
            </p>
          </>
        )}
      </Modal>

      <Modal isOpen={showPricing} onClose={() => setShowPricing(false)}>
        <h2>Upgrade to Loomis Pro</h2>
        <p className="pricing-subtitle">
          Unlock unlimited AI skill-gap diagnosis, personalized milestones, and full career intelligence.
        </p>

        <div className="pricing-plans">
          <div className="pricing-card">
            <p className="pricing-card-name">Starter</p>
            <p className="pricing-card-price">
              $0<span>/month</span>
            </p>
            <ul className="pricing-card-features">
              <li>Core 4-Month Roadmap</li>
              <li>Basic coding questions (50)</li>
              <li>Weekly progress metrics</li>
            </ul>
          </div>

          <div className="pricing-card pricing-card--pro">
            <p className="pricing-card-badge">Most Popular</p>
            <p className="pricing-card-name">Pro Engineer</p>
            <p className="pricing-card-price">
              $12<span>/month</span>
            </p>
            <ul className="pricing-card-features">
              <li>Everything in Starter</li>
              <li>Unlimited AI Skill-Gap Analysis</li>
              <li>Granular Subtopic Mastery Insights</li>
              <li>500+ Curated Problems & Solutions</li>
              <li>ATS Resume Optimization Engine</li>
            </ul>
            <button className="pricing-cta" onClick={handleGetPro}>
              <FaCrown style={{ color: "#FFFFFF", fontSize: "15px", marginRight: "8px" }} />
              Get Loomis Pro
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}