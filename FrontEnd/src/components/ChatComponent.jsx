import { useState, useEffect, useRef } from "react";
import { Send, Upload, Mic } from "lucide-react";
import { motion } from "framer-motion";

const CLOUDFLARE_ACCOUNT_ID = import.meta.env.VITE_CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_AUTH_TOKEN = import.meta.env.VITE_CLOUDFLARE_AUTH_TOKEN;

export default function ChatComponent() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "labratbot" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    const userMessage = { id: messages.length + 1, text: newMessage, sender: "You" };
    setMessages([...messages, userMessage]);
    setNewMessage("");
    setIsLoading(true);

    try {
      // Using mode: "no-cors" as specified
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/deepseek-ai/deepseek-r1-distill-qwen-32b`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${CLOUDFLARE_AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              { role: "system", content: "You are a friendly assistant" },
              { role: "user", content: newMessage },
            ],
          }),
          // mode: "no-cors",
        }
      );

      // Since with no-cors we can't read the response, we'll simulate a response
      // In a production app, you would need a different approach like a proxy server
      setTimeout(() => {
        const botReply = {
          id: messages.length + 2,
          // Using a placeholder response since we can't access the real one with no-cors
          text: "I received your message. With no-cors mode enabled, I can't show the actual API response, but this is where it would appear.",
          sender: "labratbot",
        };
        setMessages((prev) => [...prev, botReply]);
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      console.error("Error with fetch operation:", error);
      const botReply = {
        id: messages.length + 2,
        text: "Sorry, I couldn't process your request right now. Please try again later.",
        sender: "labratbot"
      };
      setMessages((prev) => [...prev, botReply]);
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const userMessage = { id: messages.length + 1, text: `Uploaded file: ${file.name}`, sender: "You" };
      setMessages([...messages, userMessage]);
      // Here you would typically process the file upload
    }
  };

  const handleVoiceInput = () => {
    // This is a placeholder. In a real app you would integrate with the Web Speech API
    alert("Voice input feature is coming soon!");
  };

  return (
    <div className="flex flex-col flex-grow h-full w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 scrollbar-thin scrollbar-thumb-gray-600">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start ${
              msg.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "labratbot" && (
              <div className="mr-2 flex-shrink-0">
                <img
                  src="/api/placeholder/40/40"
                  alt="Bot avatar"
                  className="w-8 h-8 rounded-full bg-blue-600 p-1"
                />
              </div>
            )}
            <div
              className={`p-3 rounded-xl text-sm max-w-xs md:max-w-md lg:max-w-lg break-words shadow-md ${
                msg.sender === "You"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex items-start">
            <div className="mr-2 flex-shrink-0">
              <img
                src="/api/placeholder/40/40"
                alt="Bot avatar"
                className="w-8 h-8 rounded-full bg-blue-600 p-1"
              />
            </div>
            <div className="bg-gray-700 text-white p-3 rounded-xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatRef}></div>
      </div>

      {/* Chat Input */}
      <div className="flex items-center gap-3 border-t border-gray-700 p-3 bg-gray-900/80 backdrop-blur-lg rounded-b-xl">
        <input
          type="text"
          className="flex-1 p-3 rounded-full bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !isLoading && sendMessage()}
          disabled={isLoading}
        />
        <input
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
          disabled={isLoading}
        />
        <label
          htmlFor="file-upload"
          className={`p-3 rounded-full transition-all shadow-md cursor-pointer ${
            isLoading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <Upload className="text-white" size={22} />
        </label>
        <button
          onClick={handleVoiceInput}
          className={`p-3 rounded-full transition-all shadow-md ${
            isLoading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isLoading}
        >
          <Mic className="text-white" size={22} />
        </button>
        <button
          onClick={sendMessage}
          className={`p-3 rounded-full transition-all shadow-md ${
            isLoading ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={isLoading}
        >
          <Send className="text-white" size={22} />
        </button>
      </div>
    </div>
  );
}