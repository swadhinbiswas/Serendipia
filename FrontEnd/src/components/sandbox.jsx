import { useState, useEffect } from "react";

const Sandbox = () => {
  const [llmData, setLlmData] = useState(generateRandomData());
  const [output, setOutput] = useState("System initialized. Ready for input...");

  useEffect(() => {
    const interval = setInterval(() => {
      setLlmData(generateRandomData());
      setOutput(
        Math.random() > 0.8
          ? "Error: [$rootScope:inprog] $apply already in progress"
          : "Processing neural pathways... OK"
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white font-mono p-8">
      <div className="flex flex-col md:flex-row gap-6 max-w-6xl w-full">
        <div className="flex-1">
          <LLMPanel data={llmData} />
        </div>
        <div className="flex-1">
          <PatternRenderer />
        </div>
        <div className="flex-1">
          <OutputPanel message={output} />
        </div>
      </div>
    </div>
  );
};

const LLMPanel = ({ data }) => {
  return (
    <div className="border border-cyan-500/30 p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm shadow-lg shadow-cyan-500/20">
      <h3 className="text-center border-b border-cyan-500/30 pb-2 mb-4 text-cyan-400 font-bold">Neural Network Status</h3>
      <div className="space-y-2">
        {data.map((row, index) => (
          <div key={index} className="flex justify-between bg-gray-800/50 p-2 rounded">
            {row.map((num, i) => (
              <span
                key={i}
                className={`${
                  num < 0.5 ? "text-red-400" : "text-emerald-400"
                } font-bold tracking-wider`}
                style={{
                  textShadow: num < 0.5 ? "0 0 10px rgba(239, 68, 68, 0.5)" : "0 0 10px rgba(52, 211, 153, 0.5)"
                }}
              >
                {num.toFixed(3)}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const PatternRenderer = () => {
  return (
    <div className="border border-purple-500/30 p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm shadow-lg shadow-purple-500/20">
      <h3 className="text-center text-lg font-bold text-purple-400 mb-6">QUANTUM PROCESSOR</h3>
      <div className="grid grid-cols-7 gap-3 mb-6">
        {Array.from({ length: 49 }).map((_, i) => (
          <span
            key={i}
            className={`text-xl flex items-center justify-center ${
              i % 2 === 0 ? "text-purple-500" : "text-purple-300"
            }`}
            style={{
              animation: `pulse ${1 + (i % 3) * 0.2}s infinite`,
              opacity: 0.3 + (i % 5) * 0.1,
              textShadow: "0 0 10px rgba(147, 51, 234, 0.5)"
            }}
          >
            {["⬡", "⬢", "◆", "◇"][i % 4]}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center text-xs text-purple-300 border-t border-purple-500/30 pt-4">
        <span>CPU: 8 × 🖥</span>
        <span className="animate-pulse">ACTIVE</span>
        <span>RAM: 4 GB</span>
      </div>
    </div>
  );
};

const OutputPanel = ({ message = "" }) => {
  return (
    <div className="border border-emerald-500/30 p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm shadow-lg shadow-emerald-500/20">
      <h3 className="text-center border-b border-emerald-500/30 pb-2 mb-4 text-emerald-400 font-bold">System Output</h3>
      <div className="min-h-32">
        <p
          className={`${
            message?.includes("Error") ? "text-red-400" : "text-emerald-400"
          } font-bold tracking-wide`}
          style={{
            textShadow: message?.includes("Error")
              ? "0 0 10px rgba(239, 68, 68, 0.5)"
              : "0 0 10px rgba(52, 211, 153, 0.5)"
          }}
        >
          {message}
        </p>
        <div className="mt-4 space-y-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-1 bg-emerald-500/20 rounded"
              style={{
                width: `${100 - i * 20}%`,
                animation: `pulse ${1 + i * 0.2}s infinite`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const generateRandomData = () => {
  return Array.from({ length: 6 }, () =>
    Array.from({ length: 3 }, () => Math.random())
  );
};

export default Sandbox;