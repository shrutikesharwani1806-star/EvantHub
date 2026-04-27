import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../utils/axiosInstance";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hey there! 👋 I'm EventHub AI. How can I help you today?" }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.auth);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, open]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    const userMessage = { from: "user", text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const response = await axios.post("/api/chat", { text: userMessage.text }, config);
      setMessages(prev => [...prev, { from: "bot", text: response.data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { from: "bot", text: "Sorry, I am having trouble connecting to the server right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {open && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50 flex flex-col overflow-hidden animate-in">
          <div className="p-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">
                🤖
              </div>
              <div>
                <p className="text-white font-semibold text-sm">EventHub AI</p>
                <p className="text-white/70 text-xs">Always online</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-all text-sm"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 p-4 space-y-3 h-80 max-h-80 overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.from === "user"
                      ? "bg-violet-600 text-white rounded-br-md"
                      : "bg-white/5 border border-white/10 text-slate-200 rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed bg-white/5 border border-white/10 text-slate-200 rounded-bl-md">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-white/5">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={user ? "Ask me anything..." : "Please login to chat"}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={!user || loading}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-violet-500/50 transition-colors disabled:opacity-50"
              />
              <button 
                onClick={handleSend}
                disabled={!user || loading}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white flex items-center justify-center hover:from-violet-500 hover:to-fuchsia-500 transition-all shrink-0 disabled:opacity-50"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white flex items-center justify-center shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-110 transition-all duration-300 text-2xl"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
