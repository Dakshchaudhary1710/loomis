import React, { useState, useRef, useEffect } from "react";
import "./AIchatBot.css";

const QUICK_ACTIONS = [
  { id: "plan", label: "📅 Build a study plan", prompt: "Help me build a 2-week study plan for backend interviews" },
  { id: "questions", label: "❓ Generate questions", prompt: "Generate 5 behavioral interview questions" },
  { id: "schedule", label: "🗓️ Schedule a session", prompt: "Schedule a mock interview for this Friday at 5 PM" },
];

export default function AIchatBot({ activeConversation, onSendMessage, externalPrompt }) {
  const messages = activeConversation?.messages || [];
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (externalPrompt) {
      handleSend(externalPrompt);
    }
  }, [externalPrompt]);

  async function handleSend(text) {
    const trimmed = (text ?? input).trim();
    if (!trimmed || isTyping) return;

    const userMessage = { id: crypto.randomUUID(), role: "user", type: "text", content: trimmed };
    setInput("");
    setIsTyping(true);

    // Temporarily notify parent of user message
    onSendMessage && onSendMessage(userMessage, null);

    try {
      const replyData = await sendToBackend(trimmed);
      const botMessage = { id: crypto.randomUUID(), ...replyData };
      onSendMessage && onSendMessage(userMessage, botMessage);
    } catch (err) {
      const errorMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        type: "text",
        content: "Something went wrong on my end. Mind trying that again?",
      };
      onSendMessage && onSendMessage(userMessage, errorMessage);
    } finally {
      setIsTyping(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="coach-chat">
      <div className="coach-chat__header">
        <div className="coach-chat__avatar">🤖</div>
        <div>
          <div className="coach-chat__title">
            {activeConversation?.title || "AI Coach Chat"}
          </div>
          <div className="coach-chat__status">
            <span className="coach-chat__dot" />
            Online & Ready
          </div>
        </div>
      </div>

      <div className="coach-chat__messages" ref={scrollRef}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingBubble />}
      </div>

      <div className="coach-chat__quick-actions">
        {QUICK_ACTIONS.map((qa) => (
          <button
            key={qa.id}
            className="coach-chat__chip"
            onClick={() => handleSend(qa.prompt)}
            disabled={isTyping}
          >
            {qa.label}
          </button>
        ))}
      </div>

      <div className="coach-chat__input-row">
        <textarea
          className="coach-chat__input"
          placeholder="Ask about a study plan, resume feedback, or interview prep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          className="coach-chat__send"
          onClick={() => handleSend()}
          disabled={isTyping || !input.trim()}
          aria-label="Send message"
        >
          ➤
        </button>
      </div>
    </div>
  );
}

/* ---------------------------- Message renderers --------------------------- */

function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={`coach-msg-row ${isUser ? "coach-msg-row--user" : ""}`}>
      {!isUser && <div className="coach-msg-avatar">🤖</div>}
      <div className={`coach-msg ${isUser ? "coach-msg--user" : "coach-msg--bot"}`}>
        {message.type === "text" && <p>{message.content}</p>}
        {message.type === "plan" && <StudyPlanCard data={message.data} intro={message.content} />}
        {message.type === "questions" && <QuestionListCard data={message.data} intro={message.content} />}
        {message.type === "schedule" && <ScheduleCard data={message.data} intro={message.content} />}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="coach-msg-row">
      <div className="coach-msg-avatar">🤖</div>
      <div className="coach-msg coach-msg--bot coach-msg--typing">
        <span className="coach-typing-dot" />
        <span className="coach-typing-dot" />
        <span className="coach-typing-dot" />
      </div>
    </div>
  );
}

function StudyPlanCard({ intro, data }) {
  return (
    <div>
      {intro && <p className="coach-card-intro">{intro}</p>}
      <div className="coach-card coach-card--plan">
        <div className="coach-card__label">📅 Custom Study Plan</div>
        {data.days.map((day) => (
          <div key={day.day} className="coach-plan-day">
            <div className="coach-plan-day__title">Day {day.day} — {day.focus}</div>
            <ul>
              {day.tasks.map((task, i) => (
                <li key={i}>{task}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestionListCard({ intro, data }) {
  return (
    <div>
      {intro && <p className="coach-card-intro">{intro}</p>}
      <div className="coach-card coach-card--questions">
        <div className="coach-card__label">❓ Practice Questions</div>
        <ol className="coach-question-list">
          {data.questions.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function ScheduleCard({ intro, data }) {
  return (
    <div>
      {intro && <p className="coach-card-intro">{intro}</p>}
      <div className="coach-card coach-card--schedule">
        <div className="coach-card__label">🗓️ Session Scheduled</div>
        <div className="coach-schedule-row"><span>Type</span><strong>{data.type}</strong></div>
        <div className="coach-schedule-row"><span>Date</span><strong>{data.date}</strong></div>
        <div className="coach-schedule-row"><span>Time</span><strong>{data.time}</strong></div>
        <button className="coach-card__action">Add to calendar</button>
      </div>
    </div>
  );
}

/* ------------------------------ Mock backend ------------------------------ */

async function sendToBackend(text) {
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
  const lower = text.toLowerCase();

  if (lower.includes("resume")) {
    return {
      role: "assistant",
      type: "text",
      content:
        "📄 **Resume Review Analysis Summary**:\n\n1. **Keywords & ATS**: Add explicit technologies like TypeScript, Docker, and AWS to match high-frequency ATS filters.\n2. **Impact Metrics**: Quantify your achievements (e.g., 'Improved page load speed by 35%').\n3. **Formatting**: Ensure single-column standard margins for maximum parser compatibility.\n\nWould you like me to generate tailored bullet points for your experience section?",
    };
  }

  if (lower.includes("study plan") || lower.includes("plan")) {
    return {
      role: "assistant",
      type: "plan",
      content: "Here's a 3-day targeted study plan customized for your technical prep:",
      data: {
        days: [
          { day: 1, focus: "Data Structures & Strings", tasks: ["Review Sliding Window & Two Pointers", "Solve 5 LeetCode Mediums", "Brush up Hashmaps"] },
          { day: 2, focus: "System Architecture", tasks: ["Load balancing & Redis caching", "Design a Scalable URL Shortener", "Study DB indexing"] },
          { day: 3, focus: "Behavioral & STAR Method", tasks: ["Prepare 3 Leadership stories", "Practice Conflict Resolution responses", "Mock interview simulation"] },
        ],
      },
    };
  }

  if (lower.includes("question")) {
    return {
      role: "assistant",
      type: "questions",
      content: "Here are 5 recommended practice questions:",
      data: {
        questions: [
          "Tell me about a technical decision you made that you later regretted. How did you pivot?",
          "How do you approach optimizing a slow database query in production?",
          "Describe a situation where you had to push back on unrealistic product specifications.",
          "Explain how you design microservices for high availability and fault tolerance.",
          "Give an example of how you mentored a junior developer or onboarded a new teammate.",
        ],
      },
    };
  }

  if (lower.includes("schedule")) {
    return {
      role: "assistant",
      type: "schedule",
      content: "Great! I have scheduled your mock interview session.",
      data: { type: "Fullstack Mock Interview", date: "Friday, Aug 28", time: "5:00 PM" },
    };
  }

  if (lower.includes("google") || lower.includes("company")) {
    return {
      role: "assistant",
      type: "text",
      content:
        "🎯 **Google Interview Preparation Strategy**:\n\n1. **Coding (2 Rounds)**: Focus heavily on Graphs (BFS/DFS), Dynamic Programming, and Tree Traversals.\n2. **System Design (1 Round)**: Be ready to talk about latency, throughput, consistency models, and distributed locks.\n3. **Googliness / Behavioral**: Focus on collaborative decision making, handling ambiguity, and user-first product mindset.",
    };
  }

  return {
    role: "assistant",
    type: "text",
    content:
      "I'm here to coach you! You can ask me to review your resume, build a customized study plan, practice behavioral questions, or prepare for company-specific rounds.",
  };
}