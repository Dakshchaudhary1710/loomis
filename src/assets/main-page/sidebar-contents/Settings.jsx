import { useState } from "react";
import { Link } from "react-router-dom";
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
  return (
    <div className="settings-panel">
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
        <input type="text" defaultValue="" placeholder="Your name" className="settings-input" />
      </Field>

      <Field label="Email" description="Used for login and notifications.">
        <input type="email" defaultValue="" placeholder="you@example.com" className="settings-input" />
      </Field>

      <Field label="Time zone">
        <select className="settings-select" defaultValue="ist">
          <option value="ist">India Standard Time (IST)</option>
          <option value="pst">Pacific Time (PST)</option>
          <option value="est">Eastern Time (EST)</option>
          <option value="utc">UTC</option>
        </select>
      </Field>

      <Field label="Password" description="Change your account password.">
        <button type="button" className="settings-btn-secondary">Change password</button>
      </Field>
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
  const [focus, setFocus] = useState(["Data Structures & Algorithms"]);

  const toggleFocus = (topic) => {
    setFocus((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  return (
    <div className="settings-panel">
      <Field label="Daily study goal" description="Minutes per day to keep your streak.">
        <select className="settings-select" defaultValue="30">
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
          <option value="90">1.5 hours</option>
        </select>
      </Field>

      <Field label="Preferred study time">
        <select className="settings-select" defaultValue="evening">
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
      </Field>

      <Field label="Difficulty level">
        <select className="settings-select" defaultValue="intermediate">
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </Field>

      <Field label="Focus topics" description="Your roadmap prioritizes these.">
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
    </div>
  );
}

function MentorPanel() {
  const [autoSuggest, setAutoSuggest] = useState(true);

  return (
    <div className="settings-panel">
      <Field label="Mentor tone">
        <select className="settings-select" defaultValue="encouraging">
          <option value="encouraging">Encouraging</option>
          <option value="direct">Direct</option>
          <option value="balanced">Balanced</option>
        </select>
      </Field>

      <Field label="Response length">
        <select className="settings-select" defaultValue="concise">
          <option value="concise">Concise</option>
          <option value="detailed">Detailed</option>
        </select>
      </Field>

      <Toggle
        label="Auto-suggest next topic"
        description="Let the mentor recommend what to study after each session."
        checked={autoSuggest}
        onChange={() => setAutoSuggest((v) => !v)}
      />
    </div>
  );
}

const NOTIFICATION_ITEMS = [
  { key: "email", label: "Email notifications", description: "Account and security updates." },
  { key: "reminders", label: "Study reminders", description: "Nudge me if I miss a daily goal." },
  { key: "weekly", label: "Weekly performance summary", description: "A recap every Monday." },
  { key: "mentor", label: "AI Mentor replies", description: "When the mentor responds to a message." },
];

function NotificationsPanel() {
  const [prefs, setPrefs] = useState({ email: true, reminders: true, weekly: true, mentor: false });
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
  const [theme, setTheme] = useState("light");
  const options = ["light", "dark", "system"];

  return (
    <div className="settings-panel">
      <Field label="Theme">
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
        description="Add an extra step when signing in."
        checked={twoFactor}
        onChange={() => setTwoFactor((v) => !v)}
      />

      <Field label="Active sessions" description="This device is currently signed in.">
        <button type="button" className="settings-btn-secondary">Log out other devices</button>
      </Field>

      <Field label="Your data" description="Download a copy of your account data.">
        <button type="button" className="settings-btn-secondary">
          <FiDownload /> Export data
        </button>
      </Field>

      <div className="settings-danger-zone">
        <div>
          <p className="settings-danger-title">Log out</p>
          <p className="settings-field-desc">Sign out of Loomis on this device.</p>
        </div>
        <button type="button" className="settings-btn-secondary">
          <FiLogOut /> Log out
        </button>
      </div>

      <div className="settings-danger-zone">
        <div>
          <p className="settings-danger-title">Delete account</p>
          <p className="settings-field-desc">Permanently remove your account and all study data.</p>
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
          <p className="settings-plan-name">Free plan</p>
          <p className="settings-field-desc">
            Core roadmap, weekly performance, and limited AI Mentor messages.
          </p>
        </div>
        <button type="button" className="settings-btn-primary">Upgrade to Pro</button>
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
          <p>Manage your account, study preferences, and AI Mentor.</p>
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