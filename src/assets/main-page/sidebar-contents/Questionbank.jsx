import React, { useEffect, useMemo, useState } from "react";
import "./questionbank.css";

/**
 * Question Bank
 * -------------
 * Full page: stat tiles, filter bar (category/pattern/difficulty/company/role),
 * question list (left) + detail panel (right) with tabs, and a
 * "Practice Now" compiler modal.
 *
 * Question data is generated from small metadata tables below instead of
 * being hand-written one-by-one — swap the generators for a real API call
 * (e.g. GET /api/questions) and the rest of the component keeps working,
 * as long as the response shape matches what generateCategoryQuestions()
 * / generateRoleQuestions() produce.
 */

/* ============================== METADATA ============================== */

const COMPANY_META = {
  google: { label: "G", color: "#4285F4" },
  amazon: { label: "a", color: "#FF9900" },
  microsoft: { label: "M", color: "#5E5E5E" },
  meta: { label: "∞", color: "#0668E1" },
  bloomberg: { label: "B", color: "#000000" },
};

const COMPANY_COMBOS = [
  ["google", "amazon", "microsoft"],
  ["amazon", "meta", "bloomberg"],
  ["google", "meta"],
  ["microsoft", "bloomberg", "amazon"],
  ["google", "amazon", "meta", "microsoft"],
];

const UPDATED_CYCLE = ["1 day ago", "3 days ago", "5 days ago", "1 week ago", "2 weeks ago"];
const DIFFICULTY_CYCLE = ["Easy", "Medium", "Hard"];

// Category -> icon / color / the patterns that live inside that category
const CATEGORY_META = {
  Arrays: { icon: "🔢", color: "#22C55E", patterns: ["Two Pointers", "Sliding Window", "Prefix Sum", "Kadane's Algorithm", "Hash Map"] },
  Tree: { icon: "🌳", color: "#F97316", patterns: ["DFS", "BFS", "Binary Search Tree", "Tree Recursion"] },
  Design: { icon: "🗄️", color: "#EF4444", patterns: ["Hash Map + Linked List", "Heap", "Trie"] },
  JavaScript: { icon: "🌐", color: "#22C55E", patterns: ["Closures", "Event Loop", "Prototypes", "DOM & Events"] },
  Queue: { icon: "📚", color: "#F97316", patterns: ["Two Stacks", "Circular Buffer", "Monotonic Queue"] },
  "Dynamic Programming": { icon: "🧮", color: "#8B5CF6", patterns: ["Memoization", "Tabulation", "0/1 Knapsack"] },
  Graphs: { icon: "🕸️", color: "#0EA5E9", patterns: ["DFS", "BFS", "Union Find", "Topological Sort"] },
  Strings: { icon: "🔤", color: "#EC4899", patterns: ["Sliding Window", "Two Pointers", "Backtracking"] },
  "Linked List": { icon: "🔗", color: "#14B8A6", patterns: ["Fast & Slow Pointers", "Reversal", "Dummy Node"] },
  Sorting: { icon: "📶", color: "#F59E0B", patterns: ["Merge Sort", "Quick Sort", "Binary Search"] },
};

const CATEGORY_PARAM = {
  Arrays: "nums",
  Tree: "root",
  Design: "params",
  JavaScript: "input",
  Queue: "queue",
  "Dynamic Programming": "n",
  Graphs: "graph",
  Strings: "s",
  "Linked List": "head",
  Sorting: "arr",
};

// Role -> icon / color / the topics that stand in for "patterns" in that role
const ROLE_META = {
  Frontend: { icon: "🖥️", color: "#0EA5E9", topics: ["React", "CSS", "Accessibility", "Browser APIs", "Performance"] },
  Backend: { icon: "🛠️", color: "#8B5CF6", topics: ["REST APIs", "Databases", "System Design", "Authentication", "Caching"] },
  "Full Stack": { icon: "🧩", color: "#F59E0B", topics: ["React", "REST APIs", "Databases", "System Design", "CSS"] },
  Data: { icon: "📊", color: "#22C55E", topics: ["SQL", "Statistics", "ETL Pipelines", "Machine Learning", "Data Modeling"] },
};

const ROLE_PARAM = {
  Frontend: "props",
  Backend: "req",
  "Full Stack": "input",
  Data: "data",
};

/* ============================== HELPERS ============================== */

function slug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function accRate(difficulty, index) {
  const base = difficulty === "Easy" ? 82 : difficulty === "Medium" ? 58 : 33;
  const wobble = (index % 5) * 2 - 4; // -4..+4
  return `${Math.max(15, Math.min(96, base + wobble)).toFixed(1)}%`;
}

function avgTimeFor(difficulty, index) {
  const base = difficulty === "Easy" ? 7 : difficulty === "Medium" ? 15 : 24;
  return `${base + (index % 3)} mins`;
}

function makeStarter(fnName, param) {
  return {
    javascript: `function ${fnName}(${param}) {\n  // your code here\n}`,
    python: `def ${fnName}(${param}):\n    # your code here\n    pass`,
    java: `class Solution {\n    public void ${fnName}(/* ${param} */) {\n        // your code here\n    }\n}`,
    cpp: `void ${fnName}(/* ${param} */) {\n    // your code here\n}`,
  };
}

/* ============================== SEED QUESTIONS ============================== */
/* The 5 original, fully hand-written questions — kept as-is, now tagged
   with category + pattern + starter code so they slot into the generated set. */

const SEED_QUESTIONS = [
  {
    id: "q1",
    title: "Two Sum",
    difficulty: "Easy",
    icon: "🔢",
    iconColor: "#22C55E",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    tags: ["Arrays"],
    category: "Arrays",
    pattern: "Hash Map",
    role: null,
    companies: ["google", "amazon", "microsoft"],
    updated: "3 days ago",
    bookmarked: true,
    attempted: true,
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
    starterCode: makeStarter("twoSum", "nums, target"),
  },
  {
    id: "q2",
    title: "Binary Tree Inorder Traversal",
    difficulty: "Medium",
    icon: "🌳",
    iconColor: "#F97316",
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    tags: ["Tree"],
    category: "Tree",
    pattern: "DFS",
    role: null,
    companies: ["google", "meta", "amazon"],
    updated: "5 days ago",
    bookmarked: false,
    attempted: false,
    acceptanceRate: "72.4%",
    avgTime: "9 mins",
    examples: [{ input: "root = [1,null,2,3]", output: "[1,3,2]" }],
    answer:
      "Recursively traverse left subtree, visit the node, then traverse right subtree. An iterative version uses an explicit stack to simulate the recursion.",
    aiExplanation:
      "Inorder traversal on a binary search tree visits nodes in sorted order, which is why this pattern shows up so often — it's the foundation for validating BSTs, finding the kth smallest element, and more.",
    followUps: ["Can you do this iteratively without recursion?", "How would you do a Morris traversal in O(1) space?"],
    similar: ["Binary Tree Preorder Traversal", "Validate Binary Search Tree", "Kth Smallest Element in a BST"],
    starterCode: makeStarter("inorderTraversal", "root"),
  },
  {
    id: "q3",
    title: "LRU Cache Design",
    difficulty: "Hard",
    icon: "🗄️",
    iconColor: "#EF4444",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
    tags: ["Design"],
    category: "Design",
    pattern: "Hash Map + Linked List",
    role: null,
    companies: ["amazon", "microsoft", "bloomberg"],
    updated: "1 week ago",
    bookmarked: false,
    attempted: true,
    acceptanceRate: "41.3%",
    avgTime: "22 mins",
    examples: [{ input: "capacity = 2; put(1,1); put(2,2); get(1); put(3,3); get(2)", output: "1, then -1 (evicted)" }],
    answer:
      "Combine a hash map (for O(1) lookup) with a doubly linked list (for O(1) reordering/eviction). The map stores key → node; the list tracks recency order, moving accessed nodes to the front and evicting from the back.",
    aiExplanation:
      "The key insight is that neither structure alone gets you O(1) for both get and put — a hash map alone can't track order cheaply, and a linked list alone can't look up in O(1). Combining them is the classic trade-off.",
    followUps: ["How would you make this thread-safe?", "How would an LFU (least frequently used) cache differ?"],
    similar: ["LFU Cache", "Design Twitter", "All O`one Data Structure"],
    starterCode: makeStarter("LRUCache", "capacity"),
  },
  {
    id: "q4",
    title: "What is Event Delegation in JavaScript?",
    difficulty: "Easy",
    icon: "🌐",
    iconColor: "#22C55E",
    description: "Explain the concept of event delegation in JavaScript with an example.",
    tags: ["JavaScript"],
    category: "JavaScript",
    pattern: "DOM & Events",
    role: null,
    companies: ["google", "meta", "microsoft"],
    updated: "1 week ago",
    bookmarked: false,
    attempted: false,
    acceptanceRate: "88.0%",
    avgTime: "6 mins",
    examples: [],
    answer:
      "Event delegation attaches a single listener to a parent element instead of individual listeners on each child, relying on event bubbling. When a child is clicked, the event bubbles up and the parent's handler can check event.target to figure out which child triggered it.",
    aiExplanation:
      "This matters most for performance and dynamically added elements — instead of re-attaching listeners every time you add a new list item, one listener on the parent automatically covers new children too.",
    followUps: ["When would event delegation NOT be the right choice?", "How does stopPropagation() interact with delegation?"],
    similar: ["Explain the JavaScript Event Loop", "What is Debouncing vs Throttling?"],
    starterCode: makeStarter("handleDelegatedClick", "event"),
  },
  {
    id: "q5",
    title: "Implement Stack using Queues",
    difficulty: "Medium",
    icon: "📚",
    iconColor: "#F97316",
    description: "Implement a last-in-first-out (LIFO) stack using only two queues.",
    tags: ["Queue"],
    category: "Queue",
    pattern: "Two Stacks",
    role: null,
    companies: ["google", "meta", "amazon"],
    updated: "1 week ago",
    bookmarked: false,
    attempted: false,
    acceptanceRate: "64.7%",
    avgTime: "10 mins",
    examples: [{ input: "push(1); push(2); top(); pop()", output: "2, then 2" }],
    answer:
      "Push the new element into an empty queue, then dequeue and re-enqueue all older elements behind it — this makes the most recently pushed element sit at the front of the queue, mimicking LIFO order.",
    aiExplanation:
      "This is a good exercise in translating between FIFO and LIFO semantics by shifting where the 'cost' of the operation lives — here push is O(n) instead of pop, unlike a normal stack.",
    followUps: ["Can you make pop O(1) instead of push?", "How would you implement a queue using two stacks instead?"],
    similar: ["Implement Queue using Stacks", "Design Circular Queue"],
    starterCode: makeStarter("MyStack", ""),
  },
];

/* ============================== GENERATORS ============================== */

function generateCategoryQuestions() {
  const categories = Object.keys(CATEGORY_META);
  const seededCounts = {};
  SEED_QUESTIONS.forEach((q) => {
    seededCounts[q.category] = (seededCounts[q.category] || 0) + 1;
  });

  const result = [...SEED_QUESTIONS];
  let globalIndex = SEED_QUESTIONS.length;

  categories.forEach((cat) => {
    const meta = CATEGORY_META[cat];
    const already = seededCounts[cat] || 0;
    const toGenerate = 10 - already; // 10 per category, 100 total

    for (let i = 0; i < toGenerate; i++) {
      const pattern = meta.patterns[i % meta.patterns.length];
      const difficulty = DIFFICULTY_CYCLE[globalIndex % DIFFICULTY_CYCLE.length];
      const companies = COMPANY_COMBOS[globalIndex % COMPANY_COMBOS.length];
      const param = CATEGORY_PARAM[cat];
      const n = already + i + 1;

      result.push({
        id: `cat-${slug(cat)}-${n}`,
        title: `${cat} #${n} — ${pattern}`,
        difficulty,
        icon: meta.icon,
        iconColor: meta.color,
        description: `Practice the ${pattern} pattern with a ${difficulty.toLowerCase()} ${cat.toLowerCase()} problem.`,
        tags: [cat],
        category: cat,
        pattern,
        role: null,
        companies,
        updated: UPDATED_CYCLE[globalIndex % UPDATED_CYCLE.length],
        bookmarked: globalIndex % 7 === 0,
        attempted: globalIndex % 3 === 0,
        acceptanceRate: accRate(difficulty, globalIndex),
        avgTime: avgTimeFor(difficulty, globalIndex),
        examples: [{ input: "See problem statement", output: "Varies by input" }],
        answer: `Apply the ${pattern} pattern: identify the invariant it relies on, then adapt the template to this ${cat.toLowerCase()} problem.`,
        aiExplanation: `This problem fits ${pattern} because it lets you avoid brute-force complexity by exploiting structure already present in the input.`,
        followUps: [
          "How would you adapt this if the input were much larger?",
          "Can you solve a variant of this with an extra constraint added?",
        ],
        similar: [`${cat} Pattern Practice`, `${pattern} Deep Dive`],
        starterCode: makeStarter("solve", param),
      });
      globalIndex++;
    }
  });

  return result;
}

function generateRoleQuestions(role) {
  const meta = ROLE_META[role];
  const param = ROLE_PARAM[role] || "input";
  const result = [];
  let idx = 0;

  meta.topics.forEach((topic) => {
    for (let i = 0; i < 10; i++) {
      const difficulty = DIFFICULTY_CYCLE[idx % DIFFICULTY_CYCLE.length];
      const companies = COMPANY_COMBOS[idx % COMPANY_COMBOS.length];
      const n = i + 1;

      result.push({
        id: `role-${slug(role)}-${slug(topic)}-${n}`,
        title: `${role} #${idx + 1} — ${topic}`,
        difficulty,
        icon: meta.icon,
        iconColor: meta.color,
        description: `A ${difficulty.toLowerCase()} ${role} interview question focused on ${topic}.`,
        tags: [topic],
        category: topic,
        pattern: topic,
        role,
        companies,
        updated: UPDATED_CYCLE[idx % UPDATED_CYCLE.length],
        bookmarked: idx % 8 === 0,
        attempted: idx % 4 === 0,
        acceptanceRate: accRate(difficulty, idx),
        avgTime: avgTimeFor(difficulty, idx),
        examples: [{ input: "See problem statement", output: "Varies by input" }],
        answer: `Walk through ${topic} from first principles, then apply it to the scenario described above.`,
        aiExplanation: `${topic} questions like this test whether you understand the trade-offs involved, not just the syntax.`,
        followUps: [
          `How would your approach change at scale for ${topic}?`,
          "What would you monitor or test to catch regressions here?",
        ],
        similar: [`${topic} Fundamentals`, `${role} System Walkthrough`],
        starterCode: makeStarter("solve", param),
      });
      idx++;
    }
  });

  return result; // 50 total (5 topics x 10)
}

const CATEGORY_QUESTIONS = generateCategoryQuestions(); // 100 total
const ROLE_QUESTIONS = {
  Frontend: generateRoleQuestions("Frontend"),
  Backend: generateRoleQuestions("Backend"),
  "Full Stack": generateRoleQuestions("Full Stack"),
  Data: generateRoleQuestions("Data"),
}; // 50 each

const DIFFICULTY_OPTIONS = ["All Difficulties", "Easy", "Medium", "Hard"];
const COMPANY_OPTIONS = ["All Companies", "Google", "Amazon", "Microsoft", "Meta", "Bloomberg"];
const ROLE_OPTIONS = ["All Roles", "Frontend", "Backend", "Full Stack", "Data"];
const TABS = ["All Questions", "Bookmarked", "Attempted", "Recently Added"];
const DETAIL_TABS = ["Question", "Answer", "AI Explanation", "Follow-ups", "Similar"];
const LANGUAGES = [
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "cpp", label: "C++" },
];

/* ============================== MAIN COMPONENT ============================== */

export default function QuestionBank() {
  const [categoryQuestions, setCategoryQuestions] = useState(CATEGORY_QUESTIONS);
  const [roleQuestionsMap, setRoleQuestionsMap] = useState(ROLE_QUESTIONS);

  const [selectedId, setSelectedId] = useState(CATEGORY_QUESTIONS[0].id);
  const [activeListTab, setActiveListTab] = useState("All Questions");
  const [activeDetailTab, setActiveDetailTab] = useState("Question");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [pattern, setPattern] = useState("All Patterns");
  const [difficulty, setDifficulty] = useState("All Difficulties");
  const [company, setCompany] = useState("All Companies");
  const [role, setRole] = useState("All Roles");

  const [practiceQuestion, setPracticeQuestion] = useState(null);

  const activeBank = role === "All Roles" ? categoryQuestions : roleQuestionsMap[role];

  // Reset dataset-specific filters whenever the role dataset changes
  useEffect(() => {
    setCategory("All Categories");
    setPattern("All Patterns");
    setActiveListTab("All Questions");
    setSelectedId(activeBank[0]?.id ?? null);
    setActiveDetailTab("Question");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const categoryOptions = useMemo(() => {
    const list = role === "All Roles" ? Object.keys(CATEGORY_META) : ROLE_META[role].topics;
    return ["All Categories", ...list];
  }, [role]);

  const patternOptions = useMemo(() => {
    const source = category === "All Categories" ? activeBank : activeBank.filter((q) => q.tags.includes(category));
    return ["All Patterns", ...new Set(source.map((q) => q.pattern))];
  }, [activeBank, category]);

  const selected = activeBank.find((q) => q.id === selectedId) ?? null;

  const filtered = useMemo(() => {
    const base = activeBank.filter((q) => {
      if (search.trim() && !q.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (category !== "All Categories" && !q.tags.includes(category)) return false;
      if (pattern !== "All Patterns" && q.pattern !== pattern) return false;
      if (difficulty !== "All Difficulties" && q.difficulty !== difficulty) return false;
      if (company !== "All Companies" && !q.companies.includes(company.toLowerCase())) return false;
      return true;
    });

    if (activeListTab === "Bookmarked") return base.filter((q) => q.bookmarked);
    if (activeListTab === "Attempted") return base.filter((q) => q.attempted);
    if (activeListTab === "Recently Added") return base.slice(0, 5);
    return base;
  }, [activeBank, activeListTab, search, category, pattern, difficulty, company]);

  function toggleBookmark(id) {
    if (role === "All Roles") {
      setCategoryQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, bookmarked: !q.bookmarked } : q)));
    } else {
      setRoleQuestionsMap((prev) => ({
        ...prev,
        [role]: prev[role].map((q) => (q.id === id ? { ...q, bookmarked: !q.bookmarked } : q)),
      }));
    }
  }

  function resetFilters() {
    setSearch("");
    setCategory("All Categories");
    setPattern("All Patterns");
    setDifficulty("All Difficulties");
    setCompany("All Companies");
    setRole("All Roles");
  }

  const stats = useMemo(() => {
    const total = activeBank.length;
    const bookmarked = activeBank.filter((q) => q.bookmarked).length;
    const attempted = activeBank.filter((q) => q.attempted).length;
    const accuracy = total
      ? Math.round(activeBank.reduce((sum, q) => sum + parseFloat(q.acceptanceRate), 0) / total)
      : 0;
    return { total, bookmarked, attempted, accuracy };
  }, [activeBank]);

  return (
    <div className="qb">
      {/* ---------- Header ---------- */}
      <div className="qb__header">
        <div>
          <h1 className="qb__title">Question Bank</h1>
          <p className="qb__subtitle">Practice interview questions by topic, pattern, company, or role.</p>
        </div>
      </div>

      {/* ---------- Stat tiles ---------- */}
      <div className="qb__stats">
        <StatTile icon="</>" iconBg="#EFEBFF" label="Total Questions" value={stats.total} note={role === "All Roles" ? "Across all categories" : `${role} role`} noteColor="#6E56E8" />
        <StatTile icon="🔖" iconBg="#E6F9EF" label="Bookmarked" value={stats.bookmarked} note="View all" noteColor="#6E56E8" />
        <StatTile icon="🎯" iconBg="#FFF1E6" label="Attempted" value={stats.attempted} note="View all" noteColor="#6E56E8" />
        <StatTile icon="📊" iconBg="#E8F1FF" label="Avg. Accuracy" value={`${stats.accuracy}%`} note="Across current view" noteColor="#22C55E" />
      </div>

      {/* ---------- Filter bar ---------- */}
      <div className="qb__filters">
        <div className="qb__search">
          <span className="qb__search-icon">🔍</span>
          <input placeholder="Search in questions..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Dropdown
          value={category}
          onChange={(v) => {
            setCategory(v);
            setPattern("All Patterns");
          }}
          options={categoryOptions}
        />
        <Dropdown value={pattern} onChange={setPattern} options={patternOptions} />
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
                  {tab === "Recently Added" ? " (5)" : ""}
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
              onPracticeNow={() => setPracticeQuestion(selected)}
            />
          ) : (
            <div className="qb__detail-empty">Select a question to see details.</div>
          )}
        </div>
      </div>

      {practiceQuestion && (
        <CompilerModal question={practiceQuestion} onClose={() => setPracticeQuestion(null)} />
      )}
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

function PatternBadge({ pattern }) {
  if (!pattern) return null;
  return <span className="qb-pattern">{pattern}</span>;
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
          <PatternBadge pattern={question.pattern} />
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

function QuestionDetail({ question, activeTab, onTabChange, onClose, onToggleBookmark, onPracticeNow }) {
  return (
    <div className="qb-detail">
      <div className="qb-detail__header">
        <div>
          <div className="qb-detail__title-row">
            <h2>{question.title}</h2>
            <DifficultyBadge difficulty={question.difficulty} />
            <PatternBadge pattern={question.pattern} />
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
        <button className="qb-btn qb-btn--primary" onClick={onPracticeNow}>▶ Practice Now</button>
        <button className={`qb-btn qb-btn--ghost ${question.bookmarked ? "qb-btn--bookmarked" : ""}`} onClick={onToggleBookmark}>
          🔖 {question.bookmarked ? "Bookmarked" : "Bookmark"}
        </button>
      </div>
    </div>
  );
}

/* ------------------------------ Compiler Modal ------------------------------ */

function CompilerModal({ question, onClose }) {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(question.starterCode.javascript);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState(null);

  function handleLanguageChange(lang) {
    setLanguage(lang);
    setCode(question.starterCode[lang]);
    setOutput(null);
  }

  function handleRun() {
    setRunning(true);
    setOutput(null);
    setTimeout(() => {
      setRunning(false);
      setOutput({
        type: "run",
        lines: [
          "Running your code against sample test cases...",
          "✓ Test case 1 passed",
          "✓ Test case 2 passed",
          "All sample tests passed. Try Submit to run the full suite.",
        ],
      });
    }, 700);
  }

  function handleSubmit() {
    setRunning(true);
    setOutput(null);
    setTimeout(() => {
      setRunning(false);
      const runtime = 48 + Math.floor(Math.random() * 60);
      const beats = 55 + Math.floor(Math.random() * 40);
      setOutput({
        type: "submit",
        lines: [
          "Accepted ✅",
          `Runtime: ${runtime} ms (beats ${beats}% of ${language} submissions)`,
          "Memory: 42.1 MB",
        ],
      });
    }, 1000);
  }

  return (
    <div className="qb-compiler-overlay" onClick={onClose}>
      <div className="qb-compiler" onClick={(e) => e.stopPropagation()}>
        {/* Left: problem panel */}
        <div className="qb-compiler__left">
          <div className="qb-compiler__problem-header">
            <h3>{question.title}</h3>
            <DifficultyBadge difficulty={question.difficulty} />
          </div>
          <PatternBadge pattern={question.pattern} />
          <p className="qb-compiler__desc">{question.description}</p>

          {question.examples.map((ex, i) => (
            <div key={i} className="qb-example">
              <div className="qb-example__label">Example {i + 1}:</div>
              <div className="qb-example__box">
                <div><strong>Input:</strong> {ex.input}</div>
                <div><strong>Output:</strong> {ex.output}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: editor + console */}
        <div className="qb-compiler__right">
          <div className="qb-compiler__toolbar">
            <select
              className="qb-compiler__lang-select"
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              {LANGUAGES.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
            <button className="qb-compiler__close" onClick={onClose} aria-label="Close compiler">
              ✕
            </button>
          </div>

          <textarea
            className="qb-compiler__editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />

          <div className="qb-compiler__actions">
            <button className="qb-btn qb-btn--ghost" onClick={handleRun} disabled={running}>
              {running ? "Running..." : "▶ Run"}
            </button>
            <button className="qb-btn qb-btn--primary" onClick={handleSubmit} disabled={running}>
              {running ? "Submitting..." : "Submit"}
            </button>
          </div>

          <div className={`qb-compiler__console ${output?.type === "submit" ? "qb-compiler__console--accepted" : ""}`}>
            {!output && !running && <p className="qb-compiler__console-hint">Output will appear here after you Run or Submit.</p>}
            {running && <p className="qb-compiler__console-hint">Compiling and running against test cases…</p>}
            {output && output.lines.map((line, i) => <p key={i}>{line}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
}