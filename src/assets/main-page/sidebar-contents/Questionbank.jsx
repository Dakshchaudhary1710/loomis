import React, { useMemo, useState } from "react";
import "./questionBank.css";

/**
 * Question Bank
 * -------------
 * Full page: stat tiles, filter bar, question list (left) + detail
 * panel (right) with tabs (Question / Answer / AI Explanation /
 * Follow-ups / Similar).
 *
 * Everything runs on mock data below — swap `QUESTIONS` for a fetch to
 * your backend (e.g. GET /api/questions) and the rest keeps working.
 */

const COMPANY_META = {
  google: { label: "G", color: "#4285F4" },
  amazon: { label: "a", color: "#FF9900" },
  microsoft: { label: "M", color: "#5E5E5E" },
  meta: { label: "∞", color: "#0668E1" },
  bloomberg: { label: "B", color: "#000000" },
};

const QUESTIONS = [
  {
    id: "q1",
    title: "Two Sum",
    difficulty: "Easy",
    icon: "</>",
    iconColor: "#22C55E",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    tags: ["Arrays", "Hash Table"],
    companies: ["google", "amazon", "microsoft"],
    updated: "3 days ago",
    bookmarked: true,
    acceptanceRate: "49.1%",
    avgTime: "12 mins",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
    ],
    answer:
      "Use a hash map to store each number's index as you iterate. For each number, check if target minus that number already exists in the map — if so, you've found your pair in a single pass, giving O(n) time.",
    aiExplanation:
      "The brute-force approach checks every pair, which costs O(n²). The hash map trick trades space for time: by remembering numbers you've already seen, you can look up the complement instantly instead of scanning again. This is a common pattern for 'find a pair that satisfies a condition' problems.",
    followUps: [
      "What if the array is sorted — can you solve it in O(1) space?",
      "What if there can be multiple valid pairs and you need all of them?",
      "How would this change if the input was a stream instead of a fixed array?",
    ],
    similar: ["3Sum", "Two Sum II - Input Array Is Sorted", "Subarray Sum Equals K"],
  },
  {
    id: "q2",
    title: "Binary Tree Inorder Traversal",
    difficulty: "Medium",
    icon: "🌳",
    iconColor: "#F97316",
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    tags: ["Tree"],
    companies: ["google", "meta", "amazon"],
    updated: "5 days ago",
    bookmarked: false,
    acceptanceRate: "72.4%",
    avgTime: "9 mins",
    examples: [{ input: "root = [1,null,2,3]", output: "[1,3,2]" }],
    answer:
      "Recursively traverse left subtree, visit the node, then traverse right subtree. An iterative version uses an explicit stack to simulate the recursion.",
    aiExplanation:
      "Inorder traversal on a binary search tree visits nodes in sorted order, which is why this pattern shows up so often — it's the foundation for validating BSTs, finding the kth smallest element, and more.",
    followUps: ["Can you do this iteratively without recursion?", "How would you do a Morris traversal in O(1) space?"],
    similar: ["Binary Tree Preorder Traversal", "Validate Binary Search Tree", "Kth Smallest Element in a BST"],
  },
  {
    id: "q3",
    title: "LRU Cache Design",
    difficulty: "Hard",
    icon: "🗄️",
    iconColor: "#EF4444",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
    tags: ["Design", "Hash Table", "Linked List"],
    companies: ["amazon", "microsoft", "bloomberg"],
    updated: "1 week ago",
    bookmarked: false,
    acceptanceRate: "41.3%",
    avgTime: "22 mins",
    examples: [{ input: "capacity = 2; put(1,1); put(2,2); get(1); put(3,3); get(2)", output: "1, then -1 (evicted)" }],
    answer:
      "Combine a hash map (for O(1) lookup) with a doubly linked list (for O(1) reordering/eviction). The map stores key → node; the list tracks recency order, moving accessed nodes to the front and evicting from the back.",
    aiExplanation:
      "The key insight is that neither structure alone gets you O(1) for both get and put — a hash map alone can't track order cheaply, and a linked list alone can't look up in O(1). Combining them is the classic trade-off.",
    followUps: ["How would you make this thread-safe?", "How would an LFU (least frequently used) cache differ?"],
    similar: ["LFU Cache", "Design Twitter", "All O`one Data Structure"],
  },
  {
    id: "q4",
    title: "What is Event Delegation in JavaScript?",
    difficulty: "Easy",
    icon: "🌐",
    iconColor: "#22C55E",
    description: "Explain the concept of event delegation in JavaScript with an example.",
    tags: ["JavaScript"],
    companies: ["google", "meta", "microsoft"],
    updated: "1 week ago",
    bookmarked: false,
    acceptanceRate: "88.0%",
    avgTime: "6 mins",
    examples: [],
    answer:
      "Event delegation attaches a single listener to a parent element instead of individual listeners on each child, relying on event bubbling. When a child is clicked, the event bubbles up and the parent's handler can check event.target to figure out which child triggered it.",
    aiExplanation:
      "This matters most for performance and dynamically added elements — instead of re-attaching listeners every time you add a new list item, one listener on the parent automatically covers new children too.",
    followUps: ["When would event delegation NOT be the right choice?", "How does stopPropagation() interact with delegation?"],
    similar: ["Explain the JavaScript Event Loop", "What is Debouncing vs Throttling?"],
  },
  {
    id: "q5",
    title: "Implement Stack using Queues",
    difficulty: "Medium",
    icon: "📚",
    iconColor: "#F97316",
    description: "Implement a last-in-first-out (LIFO) stack using only two queues.",
    tags: ["Design", "Queue"],
    companies: ["google", "meta", "amazon"],
    updated: "1 week ago",
    bookmarked: false,
    acceptanceRate: "64.7%",
    avgTime: "10 mins",
    examples: [{ input: "push(1); push(2); top(); pop()", output: "2, then 2" }],
    answer:
      "Push the new element into an empty queue, then dequeue and re-enqueue all older elements behind it — this makes the most recently pushed element sit at the front of the queue, mimicking LIFO order.",
    aiExplanation:
      "This is a good exercise in translating between FIFO and LIFO semantics by shifting where the 'cost' of the operation lives — here push is O(n) instead of pop, unlike a normal stack.",
    followUps: ["Can you make pop O(1) instead of push?", "How would you implement a queue using two stacks instead?"],
    similar: ["Implement Queue using Stacks", "Design Circular Queue"],
  },
];

const CATEGORY_OPTIONS = ["All Categories", "Arrays", "Tree", "Design", "JavaScript", "Queue"];
const DIFFICULTY_OPTIONS = ["All Difficulties", "Easy", "Medium", "Hard"];
const COMPANY_OPTIONS = ["All Companies", "Google", "Amazon", "Microsoft", "Meta", "Bloomberg"];
const ROLE_OPTIONS = ["All Roles", "Frontend", "Backend", "Full Stack", "Data"];
const TABS = ["All Questions", "Bookmarked", "Attempted", "Recently Added"];
const DETAIL_TABS = ["Question", "Answer", "AI Explanation", "Follow-ups", "Similar"];

export default function QuestionBank() {
  const [questions, setQuestions] = useState(QUESTIONS);
  const [selectedId, setSelectedId] = useState(QUESTIONS[0].id);
  const [activeListTab, setActiveListTab] = useState("All Questions");
  const [activeDetailTab, setActiveDetailTab] = useState("Question");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [difficulty, setDifficulty] = useState("All Difficulties");
  const [company, setCompany] = useState("All Companies");
  const [role, setRole] = useState("All Roles");

  const selected = questions.find((q) => q.id === selectedId) ?? null;

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      if (activeListTab === "Bookmarked" && !q.bookmarked) return false;
      if (activeListTab === "Attempted" && !q.attempted) return false;
      if (search.trim() && !q.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== "All Categories" && !q.tags.includes(category)) return false;
      if (difficulty !== "All Difficulties" && q.difficulty !== difficulty) return false;
      if (company !== "All Companies" && !q.companies.includes(company.toLowerCase())) return false;
      return true;
    });
  }, [questions, activeListTab, search, category, difficulty, company]);

  function toggleBookmark(id) {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, bookmarked: !q.bookmarked } : q)));
  }

  function resetFilters() {
    setSearch("");
    setCategory("All Categories");
    setDifficulty("All Difficulties");
    setCompany("All Companies");
    setRole("All Roles");
  }

  const stats = {
    total: questions.length * 491, // mock scaling to resemble a real bank size
    bookmarked: questions.filter((q) => q.bookmarked).length + 30,
    attempted: 420,
    accuracy: 84,
  };

  return (
    <div className="qb">
      {/* ---------- Header ---------- */}
      <div className="qb__header">
        <div>
          <h1 className="qb__title">Question Bank</h1>
          <p className="qb__subtitle">Practice interview questions by topic, company, or difficulty.</p>
        </div>
      
      </div>

      {/* ---------- Stat tiles ---------- */}
      <div className="qb__stats">
        <StatTile icon="</>" iconBg="#EFEBFF" label="Total Questions" value={stats.total.toLocaleString()} note="+120 this week" noteColor="#22C55E" />
        <StatTile icon="🔖" iconBg="#E6F9EF" label="Bookmarked" value={stats.bookmarked} note="View all" noteColor="#6E56E8" />
        <StatTile icon="🎯" iconBg="#FFF1E6" label="Attempted" value={stats.attempted} note="View all" noteColor="#6E56E8" />
        <StatTile icon="📊" iconBg="#E8F1FF" label="Avg. Accuracy" value={`${stats.accuracy}%`} note="+7% this week" noteColor="#22C55E" />
      </div>

      {/* ---------- Filter bar ---------- */}
      <div className="qb__filters">
        <div className="qb__search">
          <span className="qb__search-icon">🔍</span>
          <input placeholder="Search in questions..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Dropdown value={category} onChange={setCategory} options={CATEGORY_OPTIONS} />
        <Dropdown value={difficulty} onChange={setDifficulty} options={DIFFICULTY_OPTIONS} />
        <Dropdown value={company} onChange={setCompany} options={COMPANY_OPTIONS} />
        <Dropdown value={role} onChange={setRole} options={ROLE_OPTIONS} />
        <button className="qb__reset-btn" onClick={resetFilters}>
          ↺ Reset
        </button>
      </div>

      {/* ---------- Body: list + detail ---------- */}
      <div className="qb__body">
        <div className="qb__list-col">
          <div className="qb__list-header">
            <div className="qb__tabs">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  className={`qb__tab ${activeListTab === tab ? "qb__tab--active" : ""}`}
                  onClick={() => setActiveListTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <Dropdown value="Sort by: Latest" onChange={() => {}} options={["Sort by: Latest", "Sort by: Difficulty", "Sort by: Acceptance"]} plain />
          </div>

          <div className="qb__list">
            {filtered.length === 0 && <div className="qb__empty">No questions match your filters.</div>}
            {filtered.map((q) => (
              <QuestionListItem
                key={q.id}
                question={q}
                isSelected={q.id === selectedId}
                onSelect={() => {
                  setSelectedId(q.id);
                  setActiveDetailTab("Question");
                }}
                onToggleBookmark={() => toggleBookmark(q.id)}
              />
            ))}
          </div>
        </div>

        <div className="qb__detail-col">
          {selected ? (
            <QuestionDetail
              question={selected}
              activeTab={activeDetailTab}
              onTabChange={setActiveDetailTab}
              onClose={() => setSelectedId(null)}
              onToggleBookmark={() => toggleBookmark(selected.id)}
            />
          ) : (
            <div className="qb__detail-empty">Select a question to see details.</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Sub-components ------------------------------ */

function StatTile({ icon, iconBg, label, value, note, noteColor }) {
  return (
    <div className="qb-stat">
      <div className="qb-stat__icon" style={{ background: iconBg }}>
        {icon}
      </div>
      <div>
        <div className="qb-stat__label">{label}</div>
        <div className="qb-stat__value">{value}</div>
        <div className="qb-stat__note" style={{ color: noteColor }}>
          {note}
        </div>
      </div>
    </div>
  );
}

function Dropdown({ value, onChange, options, plain }) {
  return (
    <select className={`qb-dropdown ${plain ? "qb-dropdown--plain" : ""}`} value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function CompanyBadges({ companies }) {
  const shown = companies.slice(0, 3);
  const extra = companies.length - shown.length;
  return (
    <div className="qb-companies">
      {shown.map((c) => {
        const meta = COMPANY_META[c] ?? { label: "?", color: "#999" };
        return (
          <span key={c} className="qb-company-badge" style={{ background: meta.color }} title={c}>
            {meta.label}
          </span>
        );
      })}
      {extra > 0 && <span className="qb-company-more">+{extra}</span>}
    </div>
  );
}

function DifficultyBadge({ difficulty }) {
  const map = {
    Easy: { bg: "#E6F9EF", color: "#16A34A" },
    Medium: { bg: "#FFF1E0", color: "#D97706" },
    Hard: { bg: "#FDE8E8", color: "#DC2626" },
  };
  const style = map[difficulty] ?? map.Easy;
  return (
    <span className="qb-difficulty" style={{ background: style.bg, color: style.color }}>
      {difficulty}
    </span>
  );
}

function QuestionListItem({ question, isSelected, onSelect, onToggleBookmark }) {
  return (
    <div className={`qb-item ${isSelected ? "qb-item--active" : ""}`} onClick={onSelect}>
      <div className="qb-item__icon" style={{ background: `${question.iconColor}1A`, color: question.iconColor }}>
        {question.icon}
      </div>

      <div className="qb-item__body">
        <div className="qb-item__top">
          <DifficultyBadge difficulty={question.difficulty} />
        </div>
        <div className="qb-item__title">{question.title}</div>
        <p className="qb-item__desc">{question.description}</p>
        <div className="qb-item__tags">
          {question.tags.map((t) => (
            <span key={t} className="qb-tag">
              {t}
            </span>
          ))}
        </div>
        <div className="qb-item__footer">
          <CompanyBadges companies={question.companies} />
          <span className="qb-item__updated">{question.updated}</span>
        </div>
      </div>

      <button
        className={`qb-item__bookmark ${question.bookmarked ? "qb-item__bookmark--active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleBookmark();
        }}
        aria-label="Toggle bookmark"
      >
        🔖
      </button>
    </div>
  );
}

function QuestionDetail({ question, activeTab, onTabChange, onClose, onToggleBookmark }) {
  return (
    <div className="qb-detail">
      <div className="qb-detail__header">
        <div>
          <div className="qb-detail__title-row">
            <h2>{question.title}</h2>
            <DifficultyBadge difficulty={question.difficulty} />
          </div>
          <div className="qb-detail__tags">
            {question.tags.map((t) => (
              <span key={t} className="qb-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
        <button className="qb-detail__close" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      <div className="qb-detail__asked">
        <span>Asked in:</span>
        <CompanyBadges companies={question.companies} />
      </div>

      <div className="qb-detail__tabs">
        {DETAIL_TABS.map((tab) => (
          <button
            key={tab}
            className={`qb-detail__tab ${activeTab === tab ? "qb-detail__tab--active" : ""}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="qb-detail__content">
        {activeTab === "Question" && (
          <>
            <p className="qb-detail__desc">{question.description}</p>
            {question.examples.map((ex, i) => (
              <div key={i} className="qb-example">
                <div className="qb-example__label">Example {i + 1}:</div>
                <div className="qb-example__box">
                  <div><strong>Input:</strong> {ex.input}</div>
                  <div><strong>Output:</strong> {ex.output}</div>
                  {ex.explanation && <div><strong>Explanation:</strong> {ex.explanation}</div>}
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === "Answer" && <p className="qb-detail__desc">{question.answer}</p>}

        {activeTab === "AI Explanation" && <p className="qb-detail__desc">{question.aiExplanation}</p>}

        {activeTab === "Follow-ups" && (
          <ul className="qb-detail__list">
            {question.followUps.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        )}

        {activeTab === "Similar" && (
          <ul className="qb-detail__list qb-detail__list--links">
            {question.similar.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="qb-detail__meta">
        <div>
          <div className="qb-detail__meta-label">Acceptance Rate</div>
          <div className="qb-detail__meta-value">{question.acceptanceRate}</div>
        </div>
        <div>
          <div className="qb-detail__meta-label">Difficulty</div>
          <div className="qb-detail__meta-value" style={{ color: question.difficulty === "Easy" ? "#16A34A" : question.difficulty === "Medium" ? "#D97706" : "#DC2626" }}>
            {question.difficulty}
          </div>
        </div>
        <div>
          <div className="qb-detail__meta-label">Avg. Time</div>
          <div className="qb-detail__meta-value">{question.avgTime}</div>
        </div>
      </div>

      <div className="qb-detail__actions">
        <button className="qb-btn qb-btn--ghost">✨ AI Explain</button>
        <button className="qb-btn qb-btn--primary">▶ Practice Now</button>
        <button className={`qb-btn qb-btn--ghost ${question.bookmarked ? "qb-btn--bookmarked" : ""}`} onClick={onToggleBookmark}>
          🔖 {question.bookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div>
    </div>
  );
}