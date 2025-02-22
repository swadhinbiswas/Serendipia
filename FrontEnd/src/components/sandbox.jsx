import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";

const Sandbox = () => {
  const [llmData, setLlmData] = useState(generateRandomData());
  const [output, setOutput] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLlmData(generateRandomData());
      setOutput(
        Math.random() > 0.8
          ? "Error: [$rootScope:inprog] $apply already in progress"
          : "Running Code...",
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white font-mono">
      <div className="flex space-x-4">
        <LLMPanel data={llmData} />
        <PatternRenderer data={llmData} />
        <OutputPanel message={output} />
      </div>
    </div>
  );
};

const LLMPanel = ({ data }) => {
  return (
    <div className="border p-4 w-40 text-xs bg-gray-900 rounded-lg">
      <h3 className="text-center border-b pb-1 mb-2">LLM</h3>
      {data.map((row, index) => (
        <div key={index} className="flex justify-between">
          {row.map((num, i) => (
            <span
              key={i}
              className={num < 0.5 ? "text-red-500" : "text-green-400"}
            >
              {num.toFixed(3)}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

const PatternRenderer = ({ data }) => {
  return (
    <div className="border p-6 bg-gray-800 rounded-lg flex flex-col items-center">
      <h3 className="mb-2">RUNNING CODE...</h3>
      <div className="grid grid-cols-7 gap-1">
        {[...Array(49)].map((_, i) => (
          <motion.span
            key={i}
            className={`text-xl ${i % 2 === 0 ? "text-orange-500" : "text-gray-300"}`}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            *
          </motion.span>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3">CPU: 8 × 🖥 / RAM: 4 GB</p>
    </div>
  );
};

const OutputPanel = ({ message }) => {
  return (
    <div className="border p-4 w-64 text-xs bg-gray-900 rounded-lg">
      <h3 className="text-center border-b pb-1 mb-2">OUTPUT</h3>
      <p
        className={
          message.includes("Error") ? "text-red-500" : "text-green-400"
        }
      >
        {message}
      </p>
    </div>
  );
};

const generateRandomData = () => {
  return Array.from({ length: 6 }, () =>
    Array.from({ length: 3 }, () => Math.random()),
  );
};

export default Sandbox;
