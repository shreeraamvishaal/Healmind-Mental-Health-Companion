import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Features() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Mood Analysis',
      description: 'Analyze your current mood in real-time using sentiment detection.',
      route: '/mood-analysis',
      emoji: '🧠',
    },
    {
      title: 'Talk to Heal 🤖',
      description: 'Talk to an empathetic AI, fine-tuned to support your mental well-being.',
      route: '/chatbot',
      emoji: '💬',
    },
    {
      title: 'Mood Booster',
      description: 'Get uplifting music, podcasts, and videos tailored to your mood.',
      route: '/moodbooster',
      emoji: '🎵',
    },
    {
      title: 'Crisis Support',
      description: 'Access helplines and emergency numbers when you need urgent help.',
      route: '/crisis-support',
      emoji: '🚨',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center px-6 py-10">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 leading-relaxed"
        >
        Choose What You Need Today ♥️<span className="align-middle"></span>
        </motion.h1>


      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl w-full">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: index * 0.3 }}
            onClick={() => navigate(feature.route)}
            className="cursor-pointer p-6 rounded-3xl bg-white/60 backdrop-blur-lg border border-white/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
          >
            <div className="text-4xl mb-4 drop-shadow-sm">{feature.emoji}</div>

            <h2 className="text-2xl font-semibold text-indigo-700 mb-2">{feature.title}</h2>
            <p className="text-gray-700">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-500">
        HealMind is always here for you 💙
      </footer>
    </div>
  );
}

export default Features;
  