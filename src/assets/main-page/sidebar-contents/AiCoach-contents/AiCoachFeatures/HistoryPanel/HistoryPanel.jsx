import React, { useMemo, useState } from "react";
import "./HistoryPanel.css";

/**
 * History Panel
 * -------------
 * Lists past AI Coach conversations (grouped by date), lets the user
 * search, resume a past chat, start a new one, or delete an old one.
 *
 * INTEGRATION:
 * This component is "dumb" — it just renders `conversations` and calls
 * back up to the parent (`onSelect`, `onNew`, `onDelete`). The parent
 * owns the actual list + which one is active, so it can talk to
 * AICoachChat.jsx too. See AICoachLayout.jsx for a full wiring example.
 *
 * Expected conversation shape:
 * {
 *   id: string,
 *   title: string,          // e.g. first user message, truncated
 *   preview: string,        // short snippet for the list item
 *   updatedAt: string | Date,
 *   type: "plan" | "questions" | "schedule" | "general"
 * }
 */

const TYPE_ICON = {
  plan: "📅",
  questions: "❓",
  schedule: "🗓️",
  general: "💬",
};

export default function HistoryPanel({
  conversations = [],
  activeId,
  onSelect,
  onNew,
  onDelete,
}) {
  const [query, setQuery] = useState("");

  const grouped = useMemo(
    () => groupByDate(filterConversations(conversations, query)),
    [conversations, query]
  );

  return (
    <div className="history-panel">
      <div className="history-panel__header">
        <h2 className="history-panel__title">History</h2>
        <button
          className="history-panel__new-btn"
          onClick={onNew}
          title="Start new chat"
        >
          + New
        </button>
      </div>

      <div className="history-panel__search">
        <span className="history-panel__search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search conversations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="history-panel__list">
        {grouped.length === 0 && (
          <div className="history-panel__empty">
            <p>No conversations yet</p>
            <span>Start chatting with your AI Coach to see history here.</span>
          </div>
        )}

        {grouped.map((group) => (
          <div key={group.label} className="history-panel__group">
            <div className="history-panel__group-label">{group.label}</div>
            {group.items.map((conv) => (
              <ConversationItem
                key={conv.id}
                conv={conv}
                isActive={conv.id === activeId}
                onSelect={() => onSelect(conv.id)}
                onDelete={() => onDelete(conv.id)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ConversationItem({ conv, isActive, onSelect, onDelete }) {
  return (
    <div
      className={`history-item ${isActive ? "history-item--active" : ""}`}
      onClick={onSelect}
    >
      <div className="history-item__icon">{TYPE_ICON[conv?.type] ?? "💬"}</div>
      <div className="history-item__body">
        <div className="history-item__title">{conv?.title}</div>
        <div className="history-item__preview">{conv?.preview}</div>
      </div>
      <button
        className="history-item__delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        title="Delete conversation"
        aria-label="Delete conversation"
      >
        ✕
      </button>
    </div>
  );
}

/* ------------------------------ helpers ------------------------------ */

function filterConversations(conversations = [], query = "") {
  const list = conversations ?? [];
  if (!query.trim()) return list;
  const q = query.toLowerCase();
  return list.filter(
    (c) =>
      c?.title?.toLowerCase().includes(q) ||
      c?.preview?.toLowerCase().includes(q)
  );
}

function groupByDate(conversations = []) {
  const list = conversations ?? [];
  const now = new Date();
  const today = startOfDay(now);
  const yesterday = startOfDay(new Date(now - 86400000));
  const weekAgo = startOfDay(new Date(now - 6 * 86400000));

  const buckets = {
    Today: [],
    Yesterday: [],
    "Previous 7 Days": [],
    Older: [],
  };

  [...list]
    .sort((a, b) => new Date(b?.updatedAt) - new Date(a?.updatedAt))
    .forEach((c) => {
      const d = startOfDay(new Date(c?.updatedAt));
      if (d.getTime() === today.getTime()) buckets.Today.push(c);
      else if (d.getTime() === yesterday.getTime()) buckets.Yesterday.push(c);
      else if (d.getTime() >= weekAgo.getTime()) buckets["Previous 7 Days"].push(c);
      else buckets.Older.push(c);
    });

  return Object.entries(buckets)
    .filter(([, items]) => items.length > 0)
    .map(([label, items]) => ({ label, items }));
}

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}