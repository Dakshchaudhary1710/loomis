import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./aicoach.css";
import AICoachTools from "./AiCoach-contents/AiCoachFeatures/AiCoachtools";
import AIchatBot from "./AiCoach-contents/AiCoachFeatures/aichat/AIchatBot";
import HistoryPanel from "./AiCoach-contents/AiCoachFeatures/HistoryPanel/HistoryPanel";

const STORAGE_KEY = "loomis_ai_conversations";
const ACTIVE_KEY = "loomis_ai_active_id";

const INITIAL_WELCOME = {
  id: "welcome",
  role: "assistant",
  type: "text",
  content:
    "Hey Daksh 👋 I'm your AI Coach. I can build you a study plan, generate practice questions, review your resume, or schedule a mock interview. What do you want to work on?",
};

function createNewConversation(title = "New Conversation") {
  const convId = `conv_${Date.now()}`;
  const initialMessages = [INITIAL_WELCOME];

  return {
    id: convId,
    title: title,
    preview: initialMessages[0].content,
    updatedAt: new Date().toISOString(),
    type: "general",
    messages: initialMessages,
  };
}

export default function Aicoach() {
  const location = useLocation();
  const navigate = useNavigate();

  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    const defaultConv = createNewConversation("General Interview Prep");
    return [defaultConv];
  });

  const [activeId, setActiveId] = useState(() => {
    const savedId = localStorage.getItem(ACTIVE_KEY);
    return savedId || (conversations[0] ? conversations[0].id : null);
  });

  const [externalPrompt, setExternalPrompt] = useState(null);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    if (activeId) {
      localStorage.setItem(ACTIVE_KEY, activeId);
    }
  }, [activeId]);

  // Handle incoming navigation state (e.g. from ResumeAnalysis "Review with AI Coach")
  useEffect(() => {
    if (location.state?.prompt) {
      const promptText = location.state.prompt;
      const newConv = createNewConversation("Resume Review Chat");
      setConversations((prev) => [newConv, ...prev]);
      setActiveId(newConv.id);
      setExternalPrompt(promptText);
      // Clear navigation state
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const activeConversation =
    conversations.find((c) => c.id === activeId) || conversations[0];

  const handleNewChat = () => {
    const newConv = createNewConversation();
    setConversations((prev) => [newConv, ...prev]);
    setActiveId(newConv.id);
    setExternalPrompt(null);
  };

  const handleSelectChat = (id) => {
    setActiveId(id);
    setExternalPrompt(null);
  };

  const handleDeleteChat = (id) => {
    setConversations((prev) => {
      const nextList = prev.filter((c) => c.id !== id);
      if (nextList.length === 0) {
        const fresh = createNewConversation();
        setActiveId(fresh.id);
        return [fresh];
      }
      if (activeId === id) {
        setActiveId(nextList[0].id);
      }
      return nextList;
    });
  };

  const handleSendMessage = (userMsg, botMsg) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id !== activeId) return conv;

        let updatedMessages = [...conv.messages];
        if (userMsg && !updatedMessages.some((m) => m.id === userMsg.id)) {
          updatedMessages.push(userMsg);
        }
        if (botMsg && !updatedMessages.some((m) => m.id === botMsg.id)) {
          updatedMessages.push(botMsg);
        }

        const firstUserMsg = updatedMessages.find((m) => m.role === "user");
        const title = firstUserMsg
          ? firstUserMsg.content.length > 28
            ? firstUserMsg.content.slice(0, 28) + "..."
            : firstUserMsg.content
          : conv.title;

        const lastMsg = updatedMessages[updatedMessages.length - 1];
        const preview = lastMsg ? lastMsg.content : conv.preview;

        let type = "general";
        if (title.toLowerCase().includes("plan")) type = "plan";
        else if (title.toLowerCase().includes("question")) type = "questions";
        else if (title.toLowerCase().includes("schedule")) type = "schedule";

        return {
          ...conv,
          title,
          preview,
          type,
          updatedAt: new Date().toISOString(),
          messages: updatedMessages,
        };
      })
    );
  };

  const handleToolClick = (tool) => {
    if (tool.id === "resume" || tool.title === "Resume Review") {
      navigate("/main/resumeanalysis");
    } else {
      setExternalPrompt(tool.prompt);
    }
  };

  return (
    <div className="aiCoachPage">
      {/* Left Section */}
      <div className="historySection">
        <HistoryPanel
          conversations={conversations}
          activeId={activeId}
          onSelect={handleSelectChat}
          onNew={handleNewChat}
          onDelete={handleDeleteChat}
        />
      </div>

      {/* Center Section */}
      <div className="chatSection">
        <AIchatBot
          activeConversation={activeConversation}
          onSendMessage={handleSendMessage}
          externalPrompt={externalPrompt}
        />
      </div>

      {/* Right Section */}
      <div className="toolsSection">
        <AICoachTools onToolClick={handleToolClick} />
      </div>
    </div>
  );
}