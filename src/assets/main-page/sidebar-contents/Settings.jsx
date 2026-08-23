import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import {
  FiSettings,
  FiUser,
  FiBookOpen,
  FiCpu,
  FiBell,
  FiSun,
  FiShield,
  FiCreditCard,
  FiCamera,
  FiDownload,
  FiLogOut,
  FiTrash2,
  FiCheck,
} from "react-icons/fi";
import "./Settings.css";

function Field({ label, description, children }) {
  return (
    <div className="settings-field">
      <div className="settings-field-label">
        <p>{label}</p>
        {description && <p className="settings-field-desc">{description}</p>}
      </div>
      <div className="settings-field-control">{children}</div>
    </div>
  );
}

function Toggle({ label, description, checked, onChange }) {
  return (
    <label className="settings-toggle-row">
      <div>
        <p className="settings-toggle-label">{label}</p>
        {description && <p className="settings-field-desc">{description}</p>}
      </div>
      <span className={`settings-switch ${checked ? "is-on" : ""}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="settings-switch-input"
        />
        <span className="settings-switch-track">
          <span className="settings-switch-thumb" />
        </span>
      </span>
    </label>
  );
}

function ProfilePanel() {
  const [name, setName] = useState(() => localStorage.getItem("loomis_user_name") || "Daksh Chaudhary");
  const [email, setEmail] = useState(() => localStorage.getItem("loomis_user_email") || "daksh@example.com");
  const [timeZone, setTimeZone] = useState(() => localStorage.getItem("loomis_user_tz") || "ist");
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = () => {
    localStorage.setItem("loomis_user_name", name);
    localStorage.setItem("loomis_user_email", email);
    localStorage.setItem("loomis_user_tz", timeZone);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  return (
    <div className="settings-panel">
      {savedMessage && (
        <div style={{ padding: "10px 14px", background: "#dcfce7", color: "#16a34a", borderRadius: "8px", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px" }}>
          <FiCheck /> Profile settings saved successfully!
        </div>
      )}

      <div className="settings-avatar-row">
        <div className="settings-avatar">DC</div>
        <div>
          <button type="button" className="settings-btn-secondary">
            <FiCamera /> Change photo
          </button>
          <p className="settings-field-desc">JPG or PNG, 2MB max.</p>
        </div>
      </div>

      <Field label="Full name">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="settings-input"
        />
      </Field>

      <Field label="Email" description="Used for login and AI Coach notifications.">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="settings-input"
        />
      </Field>

      <Field label="Time zone">
        <select
          className="settings-select"
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
        >
          <option value="ist">India Standard Time (IST)</option>
          <option value="pst">Pacific Time (PST)</option>
          <option value="est">Eastern Time (EST)</option>
          <option value="utc">UTC</option>
        </select>
      </Field>

      <div style={{ marginTop: "12px", display: "flex", justifyContent: "flex-end" }}>
        <button type="button" className="settings-btn-primary" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

const FOCUS_TOPICS = [
  "Data Structures & Algorithms",
  "System Design",
  "Behavioral",
  "SQL & Databases",
  "Frontend",
  "Backend",
];

function StudyPanel() {
  const [goal, setGoal] = useState(() => localStorage.getItem("loomis_study_goal") || "30");
  const [preferredTime, setPreferredTime] = useState(() => localStorage.getItem("loomis_study_time") || "evening");
  const [level, setLevel] = useState(() => localStorage.getItem("loomis_study_level") || "intermediate");
  const [focus, setFocus] = useState(["Data Structures & Algorithms", "System Design"]);
  const [saved, setSaved] = useState(false);

  const toggleFocus = (topic) => {
    setFocus((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSave = () => {
    localStorage.setItem("loomis_study_goal", goal);
    localStorage.setItem("loomis_study_time", preferredTime);
    localStorage.setItem("loomis_study_level", level);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="settings-panel">
      {saved && (
        <div style={{ padding: "10px 14px", background: "#dcfce7", color: "#16a34a", borderRadius: "8px", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px" }}>
          <FiCheck /> Study preferences updated!
        </div>
      )}

      <Field label="Daily study goal" description="Minutes per day to maintain your streak.">
        <select
          className="settings-select"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
          <option value="90">1.5 hours</option>
        </select>
      </Field>

      <Field label="Preferred study time">
        <select
          className="settings-select"
          value={preferredTime}
          onChange={(e) => setPreferredTime(e.target.value)}
        >
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
      </Field>

      <Field label="Target difficulty level">
        <select
          className="settings-select"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </Field>

      <Field label="Focus topics" description="Your study roadmap prioritizes these.">
        <div className="settings-chip-group">
          {FOCUS_TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              className={`settings-chip ${focus.includes(topic) ? "is-selected" : ""}`}
              onClick={() => toggleFocus(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      </Field>

      <div style={{ marginTop: "12px", display: "flex", justifyContent: "flex-end" }}>
        <button type="button" className="settings-btn-primary" onClick={handleSave}>
          Save Preferences
        </button>
      </div>
    </div>
  );
}

function MentorPanel() {
  const [tone, setTone] = useState("encouraging");
  const [responseLength, setResponseLength] = useState("detailed");
  const [autoSuggest, setAutoSuggest] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="settings-panel">
      {saved && (
        <div style={{ padding: "10px 14px", background: "#dcfce7", color: "#16a34a", borderRadius: "8px", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "6px" }}>
          <FiCheck /> AI Mentor configuration saved!
        </div>
      )}

      <Field label="Mentor tone">
        <select
          className="settings-select"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="encouraging">Encouraging & Supportive</option>
          <option value="direct">Direct & Technical</option>
          <option value="balanced">Balanced</option>
        </select>
      </Field>

      <Field label="Response length">
        <select
          className="settings-select"
          value={responseLength}
          onChange={(e) => setResponseLength(e.target.value)}
        >
          <option value="concise">Concise & Bullet Points</option>
          <option value="detailed">Detailed & Step-by-Step</option>
        </select>
      </Field>

      <Toggle
        label="Auto-suggest next topic"
        description="Let the AI Mentor recommend what to study next based on your progress."
        checked={autoSuggest}
        onChange={() => setAutoSuggest((v) => !v)}
      />

      <div style={{ marginTop: "12px", display: "flex", justifyContent: "flex-end" }}>
        <button type="button" className="settings-btn-primary" onClick={handleSave}>
          Save Mentor Settings
        </button>
      </div>
    </div>
  );
}

const NOTIFICATION_ITEMS = [
  { key: "email", label: "Email notifications", description: "Account security and weekly study digest." },
  { key: "reminders", label: "Daily study reminders", description: "Get nudged if you miss your daily goal." },
  { key: "weekly", label: "Weekly performance recap", description: "Performance report sent every Monday." },
  { key: "mentor", label: "AI Mentor replies", description: "Notify when AI Mentor generates recommendations." },
];

function NotificationsPanel() {
  const [prefs, setPrefs] = useState({ email: true, reminders: true, weekly: true, mentor: true });
  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="settings-panel">
      {NOTIFICATION_ITEMS.map((item) => (
        <Toggle
          key={item.key}
          label={item.label}
          description={item.description}
          checked={prefs[item.key]}
          onChange={() => toggle(item.key)}
        />
      ))}
    </div>
  );
}

function AppearancePanel() {
  const { theme, setTheme } = useTheme();
  const options = ["light", "dark", "system"];

  return (
    <div className="settings-panel">
      <Field
        label="Theme"
        description="Choose your preferred color theme. Dark mode applies globally across all dashboards."
      >
        <div className="settings-segmented">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`settings-segmented-btn ${theme === opt ? "is-active" : ""}`}
              onClick={() => setTheme(opt)}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
      </Field>
    </div>
  );
}

function PrivacyPanel() {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="settings-panel">
      <Toggle
        label="Two-factor authentication"
        description="Add an extra layer of security when logging into Loomis."
        checked={twoFactor}
        onChange={() => setTwoFactor((v) => !v)}
      />

      <Field label="Active sessions" description="This device is currently signed in.">
        <button type="button" className="settings-btn-secondary">Log out other sessions</button>
      </Field>

      <Field label="Your study data" description="Export your progress, notes, and AI chat history.">
        <button type="button" className="settings-btn-secondary">
          <FiDownload /> Export data
        </button>
      </Field>

      <div className="settings-danger-zone">
        <div>
          <p className="settings-danger-title">Log out</p>
          <p className="settings-field-desc">Sign out of Loomis on this browser session.</p>
        </div>
        <button type="button" className="settings-btn-secondary">
          <FiLogOut /> Log out
        </button>
      </div>

      <div className="settings-danger-zone">
        <div>
          <p className="settings-danger-title">Delete account</p>
          <p className="settings-field-desc">Permanently remove your account and all study history.</p>
        </div>
        <button type="button" className="settings-btn-danger">
          <FiTrash2 /> Delete account
        </button>
      </div>
    </div>
  );
}

function BillingPanel() {
  return (
    <div className="settings-panel">
      <div className="settings-plan-card">
        <div>
          <p className="settings-plan-name">Pro Plan — Active</p>
          <p className="settings-field-desc">
            Unlimited AI Coach messages, custom study roadmaps, and resume ATS analysis.
          </p>
        </div>
        <button type="button" className="settings-btn-primary">Manage Plan</button>
      </div>
    </div>
  );
}

const TABS = [
  { id: "profile", label: "Profile", icon: FiUser, panel: ProfilePanel },
  { id: "study", label: "Study preferences", icon: FiBookOpen, panel: StudyPanel },
  { id: "mentor", label: "AI Mentor", icon: FiCpu, panel: MentorPanel },
  { id: "notifications", label: "Notifications", icon: FiBell, panel: NotificationsPanel },
  { id: "appearance", label: "Appearance", icon: FiSun, panel: AppearancePanel },
  { id: "privacy", label: "Privacy & security", icon: FiShield, panel: PrivacyPanel },
  { id: "billing", label: "Billing", icon: FiCreditCard, panel: BillingPanel },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const active = TABS.find((t) => t.id === activeTab) ?? TABS[0];
  const ActivePanel = active.panel;

  return (
    <div className="settings-page">
      <div className="settings-header">
        <FiSettings className="settings-header-icon" />
        <div>
          <h1>Settings</h1>
          <p>Manage your account, theme, study preferences, and AI Mentor.</p>
        </div>
      </div>

      <div className="settings-layout">
        <nav className="settings-nav">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`settings-nav-item ${activeTab === id ? "is-active" : ""}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon className="settings-nav-icon" />
              {label}
            </button>
          ))}
        </nav>

        <div className="settings-content">
          <h2 className="settings-content-title">{active.label}</h2>
          <ActivePanel />
        </div>
      </div>
    </div>
  );
}

export function SettingsButton() {
  return (
    <Link to="/main/settings" className="settings-trigger-btn">
      <FiSettings className="settings-trigger-icon" />
      Settings
    </Link>
  );
}