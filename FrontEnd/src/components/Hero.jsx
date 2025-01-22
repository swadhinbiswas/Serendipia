import React from "react";
import { Button } from "./ui/button"; // Shadcn Button component

const Hero = () => {
  return (
    <div className="bg-gray-800 text-white py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">
          Empower Your Workflow with AI Agents
        </h1>
        <p className="text-xl mb-8">
          Automate tasks, analyze data, and make smarter decisions with our AI
          agents.
        </p>
        <Button className="bg-blue-600 px-8 py-3 rounded-lg hover:bg-blue-700">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Hero;