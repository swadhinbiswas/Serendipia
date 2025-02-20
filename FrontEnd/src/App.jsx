import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PromptPalDashboard from "./pages/PromptPalDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        {/* Define the home route */}
        <Route path="/" element={<PromptPalDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
