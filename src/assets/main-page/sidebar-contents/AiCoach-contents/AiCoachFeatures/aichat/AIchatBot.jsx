import React, { useState, useRef, useEffect } from "react";
import "./AIchatBot.css";

/**
 * AI Coach Chatbot
 * -----------------
 * Drop-in chat panel for the "AI chatbot" area of your AI Interview Coach app.
 *
 * HOW THIS IS WIRED FOR NOW (mock mode):
 * - `sendToBackend()` is the ONLY function you need to replace later.
 *   Right now it fakes a network delay and returns canned/generated
 *   responses based on simple keyword matching + quick actions.
 * - When you build the real backend, replace the body of `sendToBackend`
 *   with a `fetch("/api/chat", {...})` call to your Claude-powered endpoint
 *   (see the tool-calling flow discussed earlier). Keep the same return
 *   shape: { role: "assistant", type: "text" | "plan" | "questions" | "schedule", content, data }
 *   and everything else (UI, state, rendering) keeps working unchanged.
 *
 * QUICK ACTIONS:
 * The chips under the input map to canned prompts. In production these
 * would still just send a normal user message — the backend's tool-calling
 * logic decides what to do with it, exactly like a typed message would.
 */

const QUICK_ACTIONS = [
  { id: "plan", label: "📅 Build a study plan", prompt: "Help me build a 2-week study plan for backend interviews" },
  { id: "questions", label: "❓ Generate questions", prompt: "Generate 5 behavioral interview questions" },
  { id: "schedule", label: "🗓️ Schedule a session", prompt: "Schedule a mock interview for this Friday at 5 PM" },
];

const INITIAL_MESSAGE = {
  id: "welcome",
  role: "assistant",
  type: "text",
  content:
    "Hey Daksh 👋 I'm your AI Coach. I can build you a study plan, generate practice questions, or schedule a mock interview. What do you want to work on?",
};

export default function AIchatBot() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  async function handleSend(text) {
    const trimmed = (text ?? input).trim();
    if (!trimmed || isTyping) return;

    const userMessage = { id: crypto.randomUUID(), role: "user", type: "text", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const reply = await sendToBackend(trimmed, messages);
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), ...reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          type: "text",
          content: "Something went wrong on my end. Mind trying that again?",
        },
      ]);
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
          <div className="coach-chat__title">AI Coach</div>
          <div className="coach-chat__status">
            <span className="coach-chat__dot" />
            Online
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
          placeholder="Ask about a study plan, questions, or scheduling..."
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
        <div className="coach-card__label">📅 Study Plan</div>
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
/*
  Replace this whole function with a real API call, e.g.:

  async function sendToBackend(text, history) {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, history }),
    });
    if (!res.ok) throw new Error("Chat request failed");
    return res.json(); // { role: "assistant", type, content, data }
  }
*/
async function sendToBackend(text) {
  await new Promise((r) => setTimeout(r, 700 + Math.random() * 500)); // simulate latency
  const lower = text.toLowerCase();

  if (lower.includes("study plan") || lower.includes("plan")) {
    return {
      role: "assistant",
      type: "plan",
      content: "Here's a starter 3-day plan — I can extend this or focus it on a specific company.",
      data: {
        days: [
          { day: 1, focus: "Data Structures", tasks: ["Arrays & Strings review", "10 LeetCode easy problems", "Read on Hashmaps"] },
          { day: 2, focus: "System Design Basics", tasks: ["Load balancing & caching", "Design a URL shortener", "Watch 1 mock design interview"] },
          { day: 3, focus: "Behavioral Prep", tasks: ["STAR method review", "Prep 3 stories", "Mock behavioral Q&A"] },
        ],
      },
    };
  }

  if (lower.includes("question")) {
    return {
      role: "assistant",
      type: "questions",
      content: "Here are 5 behavioral questions to practice:",
      data: {
        questions: [
          "Tell me about a time you disagreed with a teammate. How did you handle it?",
          "Describe a project where you had to learn something new quickly.",
          "Tell me about a time you missed a deadline. What happened?",
          "Give an example of when you had to persuade someone to see things your way.",
          "Describe a situation where you took initiative without being asked.",
        ],
      },
    };
  }

  if (lower.includes("schedule")) {
    return {
      role: "assistant",
      type: "schedule",
      content: "Done — I've booked this in for you.",
      data: { type: "Mock Interview", date: "Friday, Aug 14", time: "5:00 PM" },
    };
  }

  return {
    role: "assistant",
    type: "text",
    content:
      "I can help with that! Try asking me to build a study plan, generate practice questions, or schedule a mock interview session.",
  };
}