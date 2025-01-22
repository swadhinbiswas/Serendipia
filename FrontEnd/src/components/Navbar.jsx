import React from "react";
import { Button } from "./ui/button"; // Shadcn Button component

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-10 mr-4" />
        <span className="text-xl font-bold">AI Agents</span>
      </div>
      <div className="flex space-x-6">
        <a href="#pricing" className="hover:text-gray-400">
          Pricing
        </a>
        <a href="#docs" className="hover:text-gray-400">
          Documentation
        </a>
        <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
          Sign In
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;