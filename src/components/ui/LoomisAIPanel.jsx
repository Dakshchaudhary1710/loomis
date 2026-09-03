import React, { useState } from "react";
import { HiSparkles, HiPaperAirplane, HiChatAlt2, HiRefresh, HiLightBulb } from "react-icons/hi";
import { FaRobot } from "react-icons/fa6";

const PRESET_PROMPTS = [
  "Why am I struggling with recursion?",
  "What should I learn today?",
  "Give me 5 questions based on my weak topics.",
  "Explain React state colocation differently.",
];

export default function LoomisAIPanel() {
  const [messages, setMessages] = useState([
    {
      sender: "loomis",
      text: "Hello Alex! I've analyzed your recent 45 coding attempts. You're making great progress in JavaScript (90%), but your accuracy in React State Management is 58% and SQL Indexing is 28%. What would you like to tackle next?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    // Add user message
    const newMsgs = [...messages, { sender: "user", text: query }];
    setMessages(newMsgs);
    if (!textToSend) setInput("");
    setIsThinking(true);

    setTimeout(() => {
      let aiReply = "Based on your current roadmap and 72% progress, I recommend focusing on state colocation with `useReducer` first, then solving 3 targeted React state problems.";

      if (query.includes("recursion")) {
        aiReply = "Recursion feels tricky because call stacks can be hard to visualize! Your data shows you understand base cases well, but get stuck when return values build back up the stack. Let's break down a simple Binary Tree traversal step-by-step.";
      } else if (query.includes("today")) {
        aiReply = "Today's optimal plan: 1) 35 mins on React State Management, 2) 5 DSA tree problems (where your accuracy is 54%), and 3) 20 mins of SQL indexing review.";
      } else if (query.includes("weak topics")) {
        aiReply = "Here are 5 questions targeted at your weak topics: 1. React useReducer vs Context, 2. B-Tree Index lookup efficiency, 3. JWT Token refresh flow, 4. Tree Level-Order Traversal, 5. Express Error Middleware.";
      } else if (query.includes("differently")) {
        aiReply = "Think of React State like a single source of truth in a company office: if every employee keeps their own local notes, updates get lost. By using state colocation, only the team lead (closest parent component) holds the state!";
      }

      setMessages((prev) => [...prev, { sender: "loomis", text: aiReply }]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <div className="loomis-ai-card">
      <div className="ai-panel-header">
        <div className="ai-branding">
          <div className="ai-avatar-icon">
            <FaRobot />
          </div>
          <div>
            <h3 className="ai-title">Loomis AI Coach</h3>
            <p className="ai-subtitle">Personalized AI study companion tracking your knowledge state</p>
          </div>
        </div>
        <div className="ai-status-pill">
          <span className="live-dot"></span> Active Coach
        </div>
      </div>

      {/* Preset Prompt Chips */}
      <div className="ai-prompt-chips-row">
        <span className="chips-label"><HiLightBulb /> Suggested Prompts:</span>
        <div className="chips-scroll">
          {PRESET_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              className="ai-prompt-chip"
              onClick={() => handleSend(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="ai-chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`ai-message-row ${msg.sender === "user" ? "msg-user" : "msg-loomis"}`}
          >
            {msg.sender === "loomis" && (
              <div className="msg-avatar">
                <HiSparkles />
              </div>
            )}
            <div className="msg-bubble">
              <p>{msg.text}</p>
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="ai-message-row msg-loomis">
            <div className="msg-avatar">
              <HiSparkles />
            </div>
            <div className="msg-bubble thinking-bubble">
              <span>Loomis is calculating optimal study path...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        className="ai-input-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          type="text"
          placeholder="Ask Loomis anything ('Explain recursion', 'Give me 5 questions')..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="ai-send-btn" disabled={!input.trim()}>
          <HiPaperAirplane />
        </button>
      </form>
    </div>
  );
}
