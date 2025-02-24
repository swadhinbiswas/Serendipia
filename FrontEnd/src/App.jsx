import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PromptPalDashboard from "./pages/PromptPalDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";


function App() {


  return (
    <Router>
      <Routes>

        <Route path="/" element={<PromptPalDashboard />} />
        <Route path="/home"element={<Homepage/>}/>

      </Routes>
    </Router>
  );
}

export default App;


//  Ceake Commit