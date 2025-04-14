import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Features from './pages/Features';
import MoodBooster from './pages/MoodBooster';
import MoodAnalysis from './pages/MoodAnalysis';
import Chatbot from './pages/Chatbot';
import CrisisSupport from './pages/CrisisSupport';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/moodbooster" element={<MoodBooster />} />
        <Route path="/mood-analysis" element={<MoodAnalysis />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/crisis-support" element={<CrisisSupport />} />
        {/* Other routes will go here later */}
        
      </Routes>
    </Router>
  );
}

export default App;
