import { useState, useEffect, useRef } from "react";
import { Send, Upload, Mic } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatComponent() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "labratbot" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const userMessage = { id: messages.length + 1, text: newMessage, sender: "You" };
    setMessages([...messages, userMessage]);
    setNewMessage("");

    setTimeout(() => {
      const botReply = {
        id: messages.length + 2,
        text: "I am just a demo. A bigger version of me is coming soon. 🚀",
        sender: "labratbot",
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const userMessage = { id: messages.length + 1, text: `Uploaded file: ${file.name}`, sender: "You" };
      setMessages([...messages, userMessage]);
    }
  };

  const handleVoiceInput = () => {
    // Mock voice input
    const userMessage = { id: messages.length + 1, text: "Voice message: Hello Labratbot!", sender: "You" };
    setMessages([...messages, userMessage]);
  };

  return (
    <div className="flex flex-col flex-grow h-full w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 p-3 scrollbar-thin scrollbar-thumb-gray-600">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-3 rounded-xl text-sm max-w-xs break-words shadow-md ${
              msg.sender === "You"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-700 text-white self-start"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
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
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <input
          type="file"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-all shadow-md cursor-pointer">
          <Upload className="text-white" size={22} />
        </label>
        <button
          onClick={handleVoiceInput}
          className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-all shadow-md"
        >
          <Mic className="text-white" size={22} />
        </button>
        <button
          onClick={sendMessage}
          className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-all shadow-md"
        >
          <Send className="text-white" size={22} />
        </button>
      </div>
    </div>
  );
}