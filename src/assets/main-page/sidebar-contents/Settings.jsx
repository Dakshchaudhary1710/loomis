import { useEffect, useRef, useState } from "react";
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
  FiAlertTriangle,
} from "react-icons/fi";
import "./Settings.css";

/* -------------------------------------------------------------------- */
/*  Small shared building blocks                                        */
/* -------------------------------------------------------------------- */

function useStoredState(key, initial) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored !== null ? stored : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}

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

/** Toast used by every panel so "saved" feedback looks and behaves the same everywhere. */
function SavedToast({ show, message = "Saved" }) {
  return (
    <div className={`settings-toast ${show ? "is-visible" : ""}`} role="status" aria-live="polite">
      <FiCheck />
      <span>{message}</span>
    </div>
  );
}

function useSavedToast(duration = 2200) {
  const [show, setShow] = useState(false);
  const timeoutRef = useRef(null);

  const trigger = () => {
    setShow(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShow(false), duration);
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return [show, trigger];
}

function initialsFromName(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "?";
}

/* -------------------------------------------------------------------- */
/*  Profile                                                              */
/* -------------------------------------------------------------------- */

function ProfilePanel() {
  const [name, setName] = useStoredState("loomis_user_name", "Daksh Chaudhary");
  const [email, setEmail] = useStoredState("loomis_user_email", "daksh@example.com");
  const [timeZone, setTimeZone] = useStoredState("loomis_user_tz", "ist");
  const [avatar, setAvatar] = useStoredState("loomis_user_avatar", "");
  const [saved, trigger] = useSavedToast();
  const fileInputRef = useRef(null);

  const handlePhotoPick = () => fileInputRef.current?.click();

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      window.alert("Please choose an image under 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => trigger();

  return (
    <div className="settings-panel">
      <SavedToast show={saved} message="Profile settings saved" />

      <div className="settings-avatar-row">
        {avatar ? (
          <img src={avatar} alt="Profile avatar" className="settings-avatar settings-avatar-img" />
        ) : (
          <div className="settings-avatar">{initialsFromName(name)}</div>
        )}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg"
            onChange={handlePhotoChange}
            style={{ display: "none" }}
          />
          <button type="button" className="settings-btn-secondary" onClick={handlePhotoPick}>
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

      <Field label="Email" description="Used for login and AI Mentor notifications.">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="settings-input"
        />
      </Field>

      <Field label="Time zone">
        <select className="settings-select" value={timeZone} onChange={(e) => setTimeZone(e.target.value)}>
          <option value="ist">India Standard Time (IST)</option>
          <option value="pst">Pacific Time (PST)</option>
          <option value="est">Eastern Time (EST)</option>
          <option value="utc">UTC</option>
        </select>
      </Field>

      <div className="settings-panel-footer">
        <button type="button" className="settings-btn-primary" onClick={handleSave}>
          Save changes
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Study preferences                                                    */
/* -------------------------------------------------------------------- */

const FOCUS_TOPICS = [
  "Data Structures & Algorithms",
  "System Design",
  "Behavioral",
  "SQL & Databases",
  "Frontend",
  "Backend",
];

function StudyPanel() {
  const [goal, setGoal] = useStoredState("loomis_study_goal", "30");
  const [preferredTime, setPreferredTime] = useStoredState("loomis_study_time", "evening");
  const [level, setLevel] = useStoredState("loomis_study_level", "intermediate");
  const [focus, setFocus] = useStoredState(
    "loomis_study_focus",
    JSON.stringify(["Data Structures & Algorithms", "System Design"])
  );
  const [saved, trigger] = useSavedToast();

  const focusList = JSON.parse(focus);

  const toggleFocus = (topic) => {
    const next = focusList.includes(topic)
      ? focusList.filter((t) => t !== topic)
      : [...focusList, topic];
    setFocus(JSON.stringify(next));
  };

  return (
    <div className="settings-panel">
      <SavedToast show={saved} message="Study preferences updated" />

      <Field label="Daily study goal" description="Minutes per day to maintain your streak.">
        <select className="settings-select" value={goal} onChange={(e) => setGoal(e.target.value)}>
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
        <select className="settings-select" value={level} onChange={(e) => setLevel(e.target.value)}>
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
              className={`settings-chip ${focusList.includes(topic) ? "is-selected" : ""}`}
              onClick={() => toggleFocus(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      </Field>

      <div className="settings-panel-footer">
        <button type="button" className="settings-btn-primary" onClick={trigger}>
          Save preferences
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  AI Mentor                                                            */
/* -------------------------------------------------------------------- */

function MentorPanel() {
  const [tone, setTone] = useStoredState("loomis_mentor_tone", "encouraging");
  const [responseLength, setResponseLength] = useStoredState("loomis_mentor_length", "detailed");
  const [autoSuggest, setAutoSuggest] = useStoredState("loomis_mentor_autosuggest", "true");
  const [saved, trigger] = useSavedToast();

  return (
    <div className="settings-panel">
      <SavedToast show={saved} message="AI Mentor configuration saved" />

      <Field label="Mentor tone">
        <select className="settings-select" value={tone} onChange={(e) => setTone(e.target.value)}>
          <option value="encouraging">Encouraging & supportive</option>
          <option value="direct">Direct & technical</option>
          <option value="balanced">Balanced</option>
        </select>
      </Field>

      <Field label="Response length">
        <select
          className="settings-select"
          value={responseLength}
          onChange={(e) => setResponseLength(e.target.value)}
        >
          <option value="concise">Concise & bullet points</option>
          <option value="detailed">Detailed & step-by-step</option>
        </select>
      </Field>

      <Toggle
        label="Auto-suggest next topic"
        description="Let the AI Mentor recommend what to study next based on your progress."
        checked={autoSuggest === "true"}
        onChange={() => setAutoSuggest(autoSuggest === "true" ? "false" : "true")}
      />

      <div className="settings-panel-footer">
        <button type="button" className="settings-btn-primary" onClick={trigger}>
          Save mentor settings
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Notifications                                                        */
/* -------------------------------------------------------------------- */

const NOTIFICATION_ITEMS = [
  { key: "email", label: "Email notifications", description: "Account security and weekly study digest." },
  { key: "reminders", label: "Daily study reminders", description: "Get nudged if you miss your daily goal." },
  { key: "weekly", label: "Weekly performance recap", description: "Performance report sent every Monday." },
  { key: "mentor", label: "AI Mentor replies", description: "Notify when AI Mentor generates recommendations." },
];

const DEFAULT_NOTIFICATION_PREFS = { email: true, reminders: true, weekly: true, mentor: true };

function NotificationsPanel() {
  const [prefsRaw, setPrefsRaw] = useStoredState(
    "loomis_notification_prefs",
    JSON.stringify(DEFAULT_NOTIFICATION_PREFS)
  );
  const prefs = { ...DEFAULT_NOTIFICATION_PREFS, ...JSON.parse(prefsRaw) };

  const toggle = (key) => setPrefsRaw(JSON.stringify({ ...prefs, [key]: !prefs[key] }));

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

/* -------------------------------------------------------------------- */
/*  Appearance                                                           */
/* -------------------------------------------------------------------- */

const THEME_OPTIONS = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
];

function AppearancePanel() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="settings-panel">
      <Field
        label="Theme"
        description="Choose your preferred color theme. Dark mode applies globally across all dashboards."
      >
        <div className="settings-segmented" role="radiogroup" aria-label="Theme">
          {THEME_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={theme === opt.id}
              className={`settings-segmented-btn ${theme === opt.id ? "is-active" : ""}`}
              onClick={() => setTheme(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Field>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Privacy & security                                                   */
/* -------------------------------------------------------------------- */

function PrivacyPanel() {
  const [twoFactor, setTwoFactor] = useStoredState("loomis_2fa", "false");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [exported, triggerExport] = useSavedToast();

  const handleExport = () => {
    const data = {
      profile: {
        name: localStorage.getItem("loomis_user_name"),
        email: localStorage.getItem("loomis_user_email"),
        timeZone: localStorage.getItem("loomis_user_tz"),
      },
      study: {
        goal: localStorage.getItem("loomis_study_goal"),
        preferredTime: localStorage.getItem("loomis_study_time"),
        level: localStorage.getItem("loomis_study_level"),
        focus: JSON.parse(localStorage.getItem("loomis_study_focus") || "[]"),
      },
      mentor: {
        tone: localStorage.getItem("loomis_mentor_tone"),
        responseLength: localStorage.getItem("loomis_mentor_length"),
      },
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "loomis-study-data.json";
    link.click();
    URL.revokeObjectURL(url);
    triggerExport();
  };

  const handleLogout = () => {
    window.location.href = "/login";
  };

  const handleDeleteAccount = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    // Wire this up to your real delete-account endpoint before shipping.
    setConfirmDelete(false);
  };

  return (
    <div className="settings-panel">
      <SavedToast show={exported} message="Data export downloaded" />

      <Toggle
        label="Two-factor authentication"
        description="Add an extra layer of security when logging into Loomis."
        checked={twoFactor === "true"}
        onChange={() => setTwoFactor(twoFactor === "true" ? "false" : "true")}
      />

      <Field label="Active sessions" description="This device is currently signed in.">
        <button type="button" className="settings-btn-secondary">
          Log out other sessions
        </button>
      </Field>

      <Field label="Your study data" description="Export your progress, notes, and AI chat history.">
        <button type="button" className="settings-btn-secondary" onClick={handleExport}>
          <FiDownload /> Export data
        </button>
      </Field>

      <div className="settings-danger-zone">
        <div>
          <p className="settings-danger-title">Log out</p>
          <p className="settings-field-desc">Sign out of Loomis on this browser session.</p>
        </div>
        <button type="button" className="settings-btn-secondary" onClick={handleLogout}>
          <FiLogOut /> Log out
        </button>
      </div>

      <div className="settings-danger-zone">
        <div>
          <p className="settings-danger-title">Delete account</p>
          <p className="settings-field-desc">
            {confirmDelete
              ? "This can't be undone. Click again to permanently delete your account."
              : "Permanently remove your account and all study history."}
          </p>
        </div>
        <button
          type="button"
          className={`settings-btn-danger ${confirmDelete ? "is-confirming" : ""}`}
          onClick={handleDeleteAccount}
        >
          {confirmDelete ? <FiAlertTriangle /> : <FiTrash2 />}
          {confirmDelete ? "Confirm delete" : "Delete account"}
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Billing                                                              */
/* -------------------------------------------------------------------- */

function BillingPanel() {
  return (
    <div className="settings-panel">
      <div className="settings-plan-card">
        <div>
          <span className="settings-plan-badge">Active</span>
          <p className="settings-plan-name">Pro Plan</p>
          <p className="settings-field-desc">
            Unlimited AI Mentor messages, custom study roadmaps, and resume ATS analysis.
          </p>
        </div>
        <button type="button" className="settings-btn-primary">
          Manage plan
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Page shell                                                           */
/* -------------------------------------------------------------------- */

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
        <span className="settings-header-icon-wrap">
          <FiSettings className="settings-header-icon" />
        </span>
        <div>
          <h1>Settings</h1>
          <p>Manage your account, theme, study preferences, and AI Mentor.</p>
        </div>
      </div>

      <div className="settings-layout">
        <nav className="settings-nav" aria-label="Settings sections">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`settings-nav-item ${activeTab === id ? "is-active" : ""}`}
              onClick={() => setActiveTab(id)}
              aria-current={activeTab === id ? "page" : undefined}
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