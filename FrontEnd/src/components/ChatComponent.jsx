import axios from "axios";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CLOUDFLARE_ACCOUNT_ID = import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID || "75d57ab4302336d8355064edcb3a9ffd";
const CLOUDFLARE_AUTH_TOKEN = import.meta.env.VITE_CLOUDFLARE_AUTH_TOKEN || "aq39k0KEpJGVXUQCX2-TZhbFvbTs4LFPxWGDWY-m";

export default function ChatComponent() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I am the LABRAT ,Born Redy to Help.Now I am expert On answering TextBased Questions.Just A DEMO .Feel Free To ASK ME !", sender: "labratbot" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "You",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    try {
      const payload = {
        accountId: CLOUDFLARE_ACCOUNT_ID,
        authToken: CLOUDFLARE_AUTH_TOKEN,
        message: newMessage,
      };

      const response = await axios.post("/api", payload, {
        headers: { "Content-Type": "application/json" },
      });

      let botFullResponse = response.data?.result?.response || "Bot response not available";

      // Extract text after </think>
      const thinkEndIndex = botFullResponse.indexOf("</think>");
      if (thinkEndIndex !== -1) {
        botFullResponse = botFullResponse.substring(thinkEndIndex + "</think>".length).trim();
        // Remove newlines
        botFullResponse = botFullResponse.replace(/\n/g, "");
      }

      const botReply = { id: messages.length + 2, text: "", sender: "labratbot" };
      setMessages((prevMessages) => [...prevMessages, botReply]);

      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < botFullResponse.length) {
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === botReply.id ? { ...msg, text: botFullResponse.slice(0, index + 1) } : msg
            )
          );
          index++;
        } else {
          clearInterval(typingInterval);
          setIsLoading(false);
        }
      }, 50);
    } catch (error) {
      console.error("Error:", error);

      const botReply = {
        id: messages.length + 2,
        text: "Sorry, I couldn't process your request right now. Please try again later.",
        sender: "labratbot",
      };

      setMessages((prevMessages) => [...prevMessages, botReply]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-grow h-full w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-4 p-4 scrollbar-thin scrollbar-thumb-gray-600">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "labratbot" && (
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png" // Replace with your bot avatar path
                alt="Bot Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div
              className={`p-3 rounded-xl text-sm max-w-xs break-words shadow-md ${msg.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}
            >
              {msg.text}
              {msg.sender === "labratbot" && msg.text === "" && isLoading && (
                <span className="ml-1">I am thinking...</span>
              )}
            </div>
          </motion.div>
        ))}
        {isLoading && messages[messages.length - 1].sender === "You" &&(
          <div className="flex items-start">
            <img
              src="/bot_avatar.png" // Replace with your bot avatar path
              alt="Bot Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="bg-gray-700 text-white p-3 rounded-xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatRef}></div>
      </div>
      <div className="flex items-center gap-3 border-t border-gray-700 p-3 bg-gray-900/80 backdrop-blur-lg rounded-b-xl">
        <input
          type="text"
          className="flex-1 p-3 rounded-full bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !isLoading && sendMessage()}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          className={`p-3 rounded-full transition-all shadow-md ${isLoading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={isLoading}
        >
          <Send className="text-white" size={22} />
        </button>
      </div>
    </div>
  );
}