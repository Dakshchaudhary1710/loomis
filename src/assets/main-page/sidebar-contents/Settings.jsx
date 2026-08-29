import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import {
  FiSettings,
  FiUser,
  FiSun,
  FiBookOpen,
  FiBell,
  FiShield,
  FiAlertOctagon,
  FiCamera,
  FiEdit2,
  FiCheck,
  FiAlertTriangle,
  FiLock,
  FiMonitor,
  FiLogOut,
  FiTrash2,
  FiUserX,
  FiZap,
  FiCode,
  FiAward,
  FiCalendar,
  FiX,
  FiMoon,
  FiCpu,
} from "react-icons/fi";
import "./Settings.css";

/* ===================================================================== */
/*  Shared building blocks                                               */
/*  (These mirror SettingsSidebar / SettingsSection / Toggle / SelectField*/
/*   / RadioCard from the brief — kept in-file since Loomis doesn't yet   */
/*   have a dedicated shared-settings-components folder to plug into.)   */
/* ===================================================================== */

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

function initialsFromName(name) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "?"
  );
}

/** A labelled row: text on the left, a single control on the right. */
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

/** Standard <select> wrapped to match Loomis input styling. */
function SelectField({ value, onChange, options, ariaLabel }) {
  return (
    <select className="settings-select" value={value} onChange={onChange} aria-label={ariaLabel}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function Toggle({ label, description, checked, onChange, emphasized = false }) {
  return (
    <label className={`settings-toggle-row ${emphasized ? "is-emphasized" : ""}`}>
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

/** Selectable card used for theme choice / daily-goal choice, with an optional preview swatch. */
function RadioCard({ label, description, selected, onClick, preview, icon: Icon }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      className={`settings-radio-card ${selected ? "is-selected" : ""}`}
      onClick={onClick}
    >
      {preview}
      <span className="settings-radio-card-body">
        {Icon && <Icon className="settings-radio-card-icon" />}
        <span className="settings-radio-card-label">{label}</span>
        {description && <span className="settings-radio-card-desc">{description}</span>}
      </span>
      {selected && <FiCheck className="settings-radio-card-check" />}
    </button>
  );
}

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

/** Save button that flips to a checkmarked "Saved" state for a moment after saving. */
function SaveButton({ onSave, label = "Save changes" }) {
  const [justSaved, setJustSaved] = useState(false);

  const handleClick = () => {
    onSave();
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1800);
  };

  return (
    <button type="button" className="settings-btn-primary" onClick={handleClick}>
      {justSaved ? (
        <>
          <FiCheck /> Saved
        </>
      ) : (
        label
      )}
    </button>
  );
}

/* ===================================================================== */
/*  1. Account                                                            */
/* ===================================================================== */

function AccountPanel() {
  const [name, setName] = useStoredState("loomis_user_name", "Daksh Chaudhary");
  const [email, setEmail] = useStoredState("loomis_user_email", "daksh@example.com");
  const [username, setUsername] = useStoredState("loomis_user_username", "daksh_codes");
  const [college, setCollege] = useStoredState("loomis_user_college", "");
  const [gradYear, setGradYear] = useStoredState("loomis_user_gradyear", "2026");
  const [bio, setBio] = useStoredState("loomis_user_bio", "");
  const [avatar, setAvatar] = useStoredState("loomis_user_avatar", "");

  const [editing, setEditing] = useState(false);
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

  const handleSave = () => {
    setEditing(false);
    trigger();
  };

  const stats = [
    { icon: FiCalendar, label: "Account created", value: "Jan 12, 2025" },
    { icon: FiZap, label: "Current streak", value: "18 days" },
    { icon: FiCode, label: "Problems solved", value: "212" },
    { icon: FiAward, label: "Current level", value: "Level 7 · Intermediate" },
  ];

  return (
    <div className="settings-panel">
      <SavedToast show={saved} message="Profile saved" />

      {/* Profile */}
      <div className="settings-subsection">
        <div className="settings-subsection-header">
          <h3>Profile</h3>
          {!editing && (
            <button type="button" className="settings-btn-secondary" onClick={() => setEditing(true)}>
              <FiEdit2 /> Edit profile
            </button>
          )}
        </div>

        <div className="settings-avatar-row">
          {avatar ? (
            <img src={avatar} alt="Profile avatar" className="settings-avatar settings-avatar-img" />
          ) : (
            <div className="settings-avatar">{initialsFromName(name)}</div>
          )}
          {editing && (
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
          )}
        </div>

        <Field label="Full name">
          <input
            type="text"
            className="settings-input"
            value={name}
            disabled={!editing}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </Field>

        <Field label="Email" description="Used for login and account notifications.">
          <input
            type="email"
            className="settings-input"
            value={email}
            disabled={!editing}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </Field>

        <Field label="Username">
          <input
            type="text"
            className="settings-input"
            value={username}
            disabled={!editing}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
        </Field>

        <Field label="College / University">
          <input
            type="text"
            className="settings-input"
            value={college}
            disabled={!editing}
            onChange={(e) => setCollege(e.target.value)}
            placeholder="e.g. Delhi Technological University"
          />
        </Field>

        <Field label="Graduation year">
          <SelectField
            value={gradYear}
            onChange={(e) => setGradYear(e.target.value)}
            ariaLabel="Graduation year"
            options={Array.from({ length: 8 }, (_, i) => {
              const y = String(2023 + i);
              return { value: y, label: y };
            })}
          />
        </Field>

        <Field label="Short bio" description="A one-line intro shown on your public profile.">
          <textarea
            className="settings-input settings-textarea"
            value={bio}
            disabled={!editing}
            maxLength={160}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Aspiring backend engineer, DSA enthusiast."
          />
        </Field>

        {editing && (
          <div className="settings-panel-footer">
            <button type="button" className="settings-btn-secondary" onClick={() => setEditing(false)}>
              Cancel
            </button>
            <SaveButton onSave={handleSave} />
          </div>
        )}
      </div>

      {/* Account information */}
      <div className="settings-subsection">
        <div className="settings-subsection-header">
          <h3>Account information</h3>
        </div>
        <div className="settings-stat-grid">
          {stats.map(({ icon: Icon, label, value }) => (
            <div className="settings-stat-card" key={label}>
              <span className="settings-stat-icon-wrap">
                <Icon className="settings-stat-icon" />
              </span>
              <div>
                <p className="settings-stat-value">{value}</p>
                <p className="settings-stat-label">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===================================================================== */
/*  2. Appearance                                                         */
/* ===================================================================== */

function AppearancePanel() {
  const { theme, setTheme } = useTheme();
  const [compactSidebar, setCompactSidebar] = useStoredState("loomis_compact_sidebar", "false");
  const [reduceAnimations, setReduceAnimations] = useStoredState("loomis_reduce_motion", "false");
  const [dashboardTips, setDashboardTips] = useStoredState("loomis_dashboard_tips", "true");
  const [saved, trigger] = useSavedToast();

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduceAnimations === "true");
    document.documentElement.classList.toggle("compact-sidebar", compactSidebar === "true");
  }, [reduceAnimations, compactSidebar]);

  const themeOptions = [
    { id: "light", label: "Light", icon: FiSun, swatchClass: "is-light" },
    { id: "dark", label: "Dark", icon: FiMoon, swatchClass: "is-dark" },
    { id: "system", label: "System", icon: FiMonitor, swatchClass: "is-system" },
  ];

  return (
    <div className="settings-panel">
      <SavedToast show={saved} message="Appearance saved" />

      <div className="settings-subsection">
        <div className="settings-subsection-header">
          <h3>Theme</h3>
        </div>
        <div className="settings-radio-card-grid" role="radiogroup" aria-label="Theme">
          {themeOptions.map((opt) => (
            <RadioCard
              key={opt.id}
              label={opt.label}
              icon={opt.icon}
              selected={theme === opt.id}
              onClick={() => setTheme(opt.id)}
              preview={
                <span className={`settings-theme-preview ${opt.swatchClass}`}>
                  <span className="settings-theme-preview-bar" />
                  <span className="settings-theme-preview-line" />
                  <span className="settings-theme-preview-line short" />
                </span>
              }
            />
          ))}
        </div>
      </div>

      <div className="settings-subsection">
        <div className="settings-subsection-header">
          <h3>Interface</h3>
        </div>

        <Toggle
          label="Compact sidebar"
          description="Show a narrower sidebar with icon-only navigation."
          checked={compactSidebar === "true"}
          onChange={() => setCompactSidebar(compactSidebar === "true" ? "false" : "true")}
        />
        <Toggle
          label="Reduce animations"
          description="Minimize motion across transitions and hover effects."
          checked={reduceAnimations === "true"}
          onChange={() => setReduceAnimations(reduceAnimations === "true" ? "false" : "true")}
        />
        <Toggle
          label="Show dashboard tips"
          description="Display helpful hints and callouts across your dashboard."
          checked={dashboardTips === "true"}
          onChange={() => setDashboardTips(dashboardTips === "true" ? "false" : "true")}
        />
      </div>

      <div className="settings-panel-footer">
        <SaveButton onSave={trigger} />
      </div>
    </div>
  );
}

/* ===================================================================== */
/*  3. Learning Preferences                                               */
/* ===================================================================== */

const DAILY_GOAL_OPTIONS = [
  { value: "30", label: "30 minutes" },
  { value: "60", label: "1 hour" },
  { value: "120", label: "2 hours" },
  { value: "180", label: "3+ hours" },
];

const FOCUS_OPTIONS = [
  "DSA",
  "Full-Stack Development",
  "AI / ML",
  "Databases",
  "Computer Science Fundamentals",
  "System Design",
];

function LearningPreferencesPanel() {
  const [dailyGoal, setDailyGoal] = useStoredState("loomis_daily_goal", "60");
  const [difficulty, setDifficulty] = useStoredState("loomis_difficulty", "intermediate");
  const [language, setLanguage] = useStoredState("loomis_language", "cpp");
  const [weeklyGoal, setWeeklyGoal] = useStoredState("loomis_weekly_goal", "10");
  const [focusRaw, setFocusRaw] = useStoredState(
    "loomis_learning_focus",
    JSON.stringify(["DSA", "System Design"])
  );
  const [saved, trigger] = useSavedToast();

  const focus = JSON.parse(focusRaw);
  const toggleFocus = (topic) => {
    const next = focus.includes(topic) ? focus.filter((t) => t !== topic) : [...focus, topic];
    setFocusRaw(JSON.stringify(next));
  };

  return (
    <div className="settings-panel">
      <SavedToast show={saved} message="Learning preferences saved" />

      <Field label="Daily learning goal" description="How much time you want to commit each day.">
        <div className="settings-pill-group" role="radiogroup" aria-label="Daily learning goal">
          {DAILY_GOAL_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={dailyGoal === opt.value}
              className={`settings-pill ${dailyGoal === opt.value ? "is-selected" : ""}`}
              onClick={() => setDailyGoal(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Preferred difficulty">
        <div className="settings-segmented" role="radiogroup" aria-label="Preferred difficulty">
          {["beginner", "intermediate", "advanced"].map((level) => (
            <button
              key={level}
              type="button"
              role="radio"
              aria-checked={difficulty === level}
              className={`settings-segmented-btn ${difficulty === level ? "is-active" : ""}`}
              onClick={() => setDifficulty(level)}
            >
              {level[0].toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Learning focus" description="Pick the areas your roadmap should prioritize.">
        <div className="settings-chip-group">
          {FOCUS_OPTIONS.map((topic) => (
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

      <Field label="Preferred programming language">
        <SelectField
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          ariaLabel="Preferred programming language"
          options={[
            { value: "cpp", label: "C++" },
            { value: "java", label: "Java" },
            { value: "python", label: "Python" },
            { value: "javascript", label: "JavaScript" },
          ]}
        />
      </Field>

      <Field label="Weekly goal" description="Target number of problems or tasks per week.">
        <SelectField
          value={weeklyGoal}
          onChange={(e) => setWeeklyGoal(e.target.value)}
          ariaLabel="Weekly goal"
          options={[5, 10, 15, 20, 25, 30].map((n) => ({ value: String(n), label: `${n} per week` }))}
        />
      </Field>

      <div className="settings-panel-footer">
        <SaveButton onSave={trigger} label="Save preferences" />
      </div>
    </div>
  );
}

/* ===================================================================== */
/*  4. Notifications                                                      */
/* ===================================================================== */

const NOTIFICATION_GROUPS = [
  {
    id: "learning",
    title: "Learning",
    items: [
      { key: "dailyReminders", label: "Daily learning reminders", description: "A nudge if you haven't studied yet today." },
      { key: "goalReminders", label: "Goal reminders", description: "Alerts when you're close to missing your daily goal." },
      { key: "streakReminders", label: "Streak reminders", description: "Warnings before your streak resets." },
      { key: "weeklySummary", label: "Weekly progress summary", description: "A recap of your week, sent every Monday." },
    ],
  },
  {
    id: "coding",
    title: "Coding",
    items: [
      { key: "problemRecs", label: "New problem recommendations", description: "Suggestions based on your recent activity." },
      { key: "contestReminders", label: "Contest reminders", description: "Get notified before contests you're registered for." },
      { key: "achievementNotifs", label: "Achievement notifications", description: "Celebrate badges and milestones as you earn them." },
    ],
  },
  {
    id: "career",
    title: "Career",
    items: [
      { key: "internshipOpps", label: "Internship opportunities", description: "New internships matching your profile." },
      { key: "resumeReminders", label: "Resume reminders", description: "Keep your resume fresh and ATS-ready." },
      { key: "jobReadiness", label: "Job-readiness recommendations", description: "Tips to strengthen your job-readiness score." },
    ],
  },
];

const ALL_NOTIFICATION_KEYS = NOTIFICATION_GROUPS.flatMap((g) => g.items.map((i) => i.key));
const DEFAULT_NOTIFICATION_PREFS = Object.fromEntries(ALL_NOTIFICATION_KEYS.map((k) => [k, true]));

function NotificationsPanel() {
  const [prefsRaw, setPrefsRaw] = useStoredState(
    "loomis_notification_prefs",
    JSON.stringify(DEFAULT_NOTIFICATION_PREFS)
  );
  const prefs = { ...DEFAULT_NOTIFICATION_PREFS, ...JSON.parse(prefsRaw) };
  const allOn = ALL_NOTIFICATION_KEYS.every((k) => prefs[k]);

  const toggle = (key) => setPrefsRaw(JSON.stringify({ ...prefs, [key]: !prefs[key] }));

  const toggleAll = () => {
    const next = Object.fromEntries(ALL_NOTIFICATION_KEYS.map((k) => [k, !allOn]));
    setPrefsRaw(JSON.stringify(next));
  };

  return (
    <div className="settings-panel">
      <Toggle
        label="Enable all notifications"
        description="Turn every notification below on or off at once."
        checked={allOn}
        onChange={toggleAll}
        emphasized
      />

      {NOTIFICATION_GROUPS.map((group) => (
        <div className="settings-subsection" key={group.id}>
          <div className="settings-subsection-header">
            <h3>{group.title}</h3>
          </div>
          {group.items.map((item) => (
            <Toggle
              key={item.key}
              label={item.label}
              description={item.description}
              checked={prefs[item.key]}
              onChange={() => toggle(item.key)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/* ===================================================================== */
/*  5. Privacy & Security                                                 */
/* ===================================================================== */

function PrivacySecurityPanel() {
  const [visibility, setVisibility] = useStoredState("loomis_profile_visibility", "public");
  const [showActivity, setShowActivity] = useStoredState("loomis_show_activity", "true");
  const [showAchievements, setShowAchievements] = useStoredState("loomis_show_achievements", "true");
  const [showStreak, setShowStreak] = useStoredState("loomis_show_streak", "true");
  const [saved, trigger] = useSavedToast();

  return (
    <div className="settings-panel">
      <SavedToast show={saved} message="Privacy settings saved" />

      <div className="settings-subsection">
        <div className="settings-subsection-header">
          <h3>Privacy</h3>
        </div>

        <Field label="Profile visibility">
          <div className="settings-segmented" role="radiogroup" aria-label="Profile visibility">
            {[
              { id: "public", label: "Public" },
              { id: "connections", label: "Connections only" },
              { id: "private", label: "Private" },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={visibility === opt.id}
                className={`settings-segmented-btn ${visibility === opt.id ? "is-active" : ""}`}
                onClick={() => setVisibility(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </Field>

        <Toggle
          label="Show coding activity"
          description="Let others see your problem-solving activity."
          checked={showActivity === "true"}
          onChange={() => setShowActivity(showActivity === "true" ? "false" : "true")}
        />
        <Toggle
          label="Show achievements"
          description="Display your earned badges on your public profile."
          checked={showAchievements === "true"}
          onChange={() => setShowAchievements(showAchievements === "true" ? "false" : "true")}
        />
        <Toggle
          label="Show learning streak"
          description="Display your current streak to other students."
          checked={showStreak === "true"}
          onChange={() => setShowStreak(showStreak === "true" ? "false" : "true")}
        />
      </div>

      <div className="settings-subsection">
        <div className="settings-subsection-header">
          <h3>Security</h3>
        </div>
        <div className="settings-security-actions">
          <button type="button" className="settings-btn-secondary">
            <FiLock /> Change password
          </button>
          <button type="button" className="settings-btn-secondary">
            <FiMonitor /> Manage active sessions
          </button>
          <button type="button" className="settings-btn-secondary">
            <FiLogOut /> Sign out of all devices
          </button>
        </div>
      </div>

      <div className="settings-panel-footer">
        <SaveButton onSave={trigger} />
      </div>
    </div>
  );
}

/* ===================================================================== */
/*  6. Danger Zone                                                        */
/* ===================================================================== */

function DeleteAccountModal({ open, onClose, onConfirm }) {
  const [confirmText, setConfirmText] = useState("");

  useEffect(() => {
    if (!open) setConfirmText("");
  }, [open]);

  if (!open) return null;

  const canDelete = confirmText.trim() === "DELETE";

  return (
    <div className="settings-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="delete-account-title">
      <div className="settings-modal">
        <div className="settings-modal-header">
          <span className="settings-modal-icon-wrap">
            <FiAlertTriangle className="settings-modal-icon" />
          </span>
          <button type="button" className="settings-modal-close" onClick={onClose} aria-label="Close">
            <FiX />
          </button>
        </div>

        <h3 id="delete-account-title" className="settings-modal-title">
          Delete your Loomis account?
        </h3>
        <p className="settings-modal-message">
          This action is permanent. Deleting your account removes your learning progress, solved
          problems, achievements, and saved resume data. This cannot be undone.
        </p>

        <label className="settings-modal-input-label" htmlFor="delete-confirm-input">
          Type <strong>DELETE</strong> to confirm
        </label>
        <input
          id="delete-confirm-input"
          type="text"
          className="settings-input"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="DELETE"
          autoComplete="off"
        />

        <div className="settings-modal-actions">
          <button type="button" className="settings-btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="settings-btn-danger is-confirming"
            disabled={!canDelete}
            onClick={onConfirm}
          >
            <FiTrash2 /> Delete account
          </button>
        </div>
      </div>
    </div>
  );
}

function DangerZonePanel() {
  const [deactivating, setDeactivating] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDeactivate = () => {
    setDeactivating(true);
    setTimeout(() => setDeactivating(false), 1600);
  };

  const handleConfirmDelete = () => {
    // Wire this up to the real delete-account endpoint before shipping.
    setDeleteModalOpen(false);
    setDeleted(true);
  };

  return (
    <div className="settings-panel">
      <p className="settings-field-desc">
        These actions affect your entire Loomis account. Please proceed carefully.
      </p>

      <div className="settings-danger-zone">
        <div>
          <p className="settings-danger-title">Deactivate account</p>
          <p className="settings-field-desc">
            Temporarily hide your profile and pause activity. You can reactivate anytime by logging back in.
          </p>
        </div>
        <button type="button" className="settings-btn-danger" onClick={handleDeactivate}>
          <FiUserX /> {deactivating ? "Deactivating…" : "Deactivate account"}
        </button>
      </div>

      <div className="settings-danger-zone">
        <div>
          <p className="settings-danger-title">Delete account</p>
          <p className="settings-field-desc">
            Permanently delete your account and all associated data. This cannot be undone.
          </p>
        </div>
        <button type="button" className="settings-btn-danger" onClick={() => setDeleteModalOpen(true)}>
          <FiTrash2 /> Delete account
        </button>
      </div>

      {deleted && (
        <p className="settings-field-desc" role="status">
          Your account has been scheduled for deletion. (Demo only — connect this to your delete-account API.)
        </p>
      )}

      <DeleteAccountModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

/* ===================================================================== */
/*  Page shell                                                            */
/* ===================================================================== */

const TABS = [
  { id: "account", label: "Account", icon: FiUser, panel: AccountPanel },
  { id: "appearance", label: "Appearance", icon: FiSun, panel: AppearancePanel },
  { id: "learning", label: "Learning Preferences", icon: FiBookOpen, panel: LearningPreferencesPanel },
  { id: "notifications", label: "Notifications", icon: FiBell, panel: NotificationsPanel },
  { id: "privacy", label: "Privacy & Security", icon: FiShield, panel: PrivacySecurityPanel },
  { id: "danger", label: "Danger Zone", icon: FiAlertOctagon, panel: DangerZonePanel, isDanger: true },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");
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
          <p>Manage your account and personalize your Loomis experience.</p>
        </div>
      </div>

      <div className="settings-layout">
        <nav className="settings-nav" aria-label="Settings sections">
          {TABS.map(({ id, label, icon: Icon, isDanger }) => (
            <button
              key={id}
              type="button"
              className={`settings-nav-item ${activeTab === id ? "is-active" : ""} ${
                isDanger ? "is-danger" : ""
              }`}
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