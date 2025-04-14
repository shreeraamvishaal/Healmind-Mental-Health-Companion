import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import robotAnimation from '../assets/robot.json';
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
      {/* Animated Background Glow Orbs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-300 opacity-30 rounded-full filter blur-3xl animate-pulse-slow z-0"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-300 opacity-30 rounded-full filter blur-2xl animate-pulse-slower z-0"></div>

      {/* Centered Robot and Cloud Text */}
      <div className="flex items-center justify-center space-x-6 mb-8 z-10">
        {/* Lottie Robot Animation */}
        <div className="w-52 h-52 -translate-x-3">
          <Lottie animationData={robotAnimation} loop={true} />
        </div>

        {/* Speech Bubble Cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 6, ease: "easeInOut" }}
          className="relative bg-white text-gray-800 px-6 py-4 rounded-[2rem] shadow-lg text-base font-medium border border-purple-200 max-w-xs"
        >
          <span>Hey! We're here to support you 🌸</span>

          {/* Speech Tail */}
          <div className="absolute -left-4 top-6 w-6 h-6 bg-white rounded-full border border-purple-200"></div>
          <div className="absolute -left-2 top-10 w-4 h-4 bg-white rounded-full border border-purple-200"></div>
        </motion.div>
      </div>

      {/* Main Content Card */}
      <div className="z-10 backdrop-blur-md bg-white/60 border border-white/30 rounded-3xl shadow-2xl p-10 max-w-4xl w-full text-center animate-fade-in transform transition-all duration-500 hover:scale-[1.015] hover:shadow-3xl">
        <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 drop-shadow-md">
          HealMind: Your AI-Powered Mental Health Companion
        </h1>
        <p className="text-xl font-medium text-gray-700 mb-4">
          Your mind matters. We’re here to help you feel better, one step at a time.
        </p>
        <p className="text-md text-gray-600 mb-6 leading-relaxed">
          HealMind is your one-stop destination for real-time mood tracking, AI-powered empathetic conversations,
          uplifting content, and immediate crisis support — all while respecting your privacy.
        </p>
        <button
          onClick={() => navigate('/features')}
          className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:scale-105 transform transition duration-300 ease-in-out"
        >
          Get Started
        </button>
      </div>

      <footer className="mt-12 text-sm text-gray-500 z-10">
        Built with 💙 for mental wellness.
      </footer>
    </div>
  );
}

export default Home;
