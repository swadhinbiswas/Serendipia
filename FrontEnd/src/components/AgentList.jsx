import React from "react";
import { Card } from "./ui/card"; // Shadcn Card component

const AgentsList = () => {
  const agents = [
    { name: "Agent Alpha", status: "Online", image: "/agent1.jpg" },
    { name: "Agent Beta", status: "Offline", image: "/agent2.jpg" },
    { name: "Agent Gamma", status: "Online", image: "/agent3.jpg" },
    { name: "Agent Delta", status: "Online", image: "/agent4.jpg" },
    { name: "Agent Epsilon", status: "Offline", image: "/agent5.jpg" },
    { name: "Agent Zeta", status: "Online", image: "/agent6.jpg" },
    { name: "Agent Eta", status: "Offline", image: "/agent7.jpg" },
    { name: "Agent Theta", status: "Online", image: "/agent8.jpg" },
    { name: "Agent Iota", status: "Online", image: "/agent9.jpg" },
    { name: "Agent Kappa", status: "Offline", image: "/agent10.jpg" },
  ];

  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">Active AI Agents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {agents.map((agent, index) => (
            <Card
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center text-center"
            >
              <img
                src={agent.image}
                alt={agent.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{agent.name}</h3>
              <p
                className={`mt-2 ${
                  agent.status === "Online" ? "text-green-400" : "text-red-400"
                }`}
              >
                {agent.status}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentsList;
