import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sentiment from 'sentiment';

const InsightBlock = ({ title, data }) => (
  <div>
    <h3 className="text-xl font-semibold text-purple-800">{title}</h3>
    <ul className="list-disc list-inside text-gray-700 space-y-1">
      {data.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  </div>
);

const MoodAnalysis = () => {
  const [input, setInput] = useState('');
  const [moods, setMoods] = useState([]);
  const [color, setColor] = useState('');
  const [score, setScore] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const moodRef = useRef(null);

  const [insights, setInsights] = useState({
    reasons: [],
    tips: [],
    avoid: [],
    reminders: [],
  });

  const emotionMap = {
    Happy: {
      keywords: ['happy', 'grateful', 'excited', 'joyful'],
      emoji: '😊',
      color: 'from-green-200 to-green-100',
      reason: "You're feeling light, joyful or appreciative.",
      tips: ['Celebrate your wins 🎉', 'Reflect on what made you feel this way 📝', 'Share your joy with others 💬'],
      avoid: ['Don’t overthink — enjoy the moment 🌈'],
      reminders: ['You deserve happiness 💜'],
    },
    Sad: {
      keywords: ['sad', 'depressed', 'down', 'worthless', 'hopeless', 'heartbroken'],
      emoji: '😔',
      color: 'from-red-200 to-red-100',
      reason: "You're showing signs of sadness, low mood, or hopelessness.",
      tips: ['Talk to someone or journal your feelings 💬', 'Listen to gentle music 🎧', 'Go outside for fresh air or a walk 🌿'],
      avoid: ['Avoid isolating or bottling it in'],
      reminders: ['Your feelings are valid, and this will pass 💜'],
    },
    Anxious: {
      keywords: ['anxious', 'worried', 'nervous', 'overthinking', 'tense', 'pressure'],
      emoji: '😰',
      color: 'from-yellow-100 to-yellow-200',
      reason: 'You may be feeling overwhelmed or mentally tense.',
      tips: ['Do a 5-minute grounding or breathing exercise 🧘', 'Write down your thoughts to declutter 📝', 'Step away from screens for a bit 📵'],
      avoid: ['Avoid spiraling thoughts and overstimulation'],
      reminders: ['One thing at a time — you’ve got this 💜'],
    },
    Angry: {
      keywords: ['angry', 'frustrated', 'mad', 'irritated'],
      emoji: '😡',
      color: 'from-orange-100 to-red-100',
      reason: "You're showing signs of frustration or irritability.",
      tips: ['Step away and breathe deeply 🧘', 'Try physical release (shake, stretch, punch pillow) 💢', 'Journal your triggers safely 📝'],
      avoid: ['Avoid reacting instantly or lashing out'],
      reminders: ['You’re in control, even when it doesn’t feel like it 💜'],
    },
  };

  const handleAnalyze = () => {
    if (input.trim().length < 10) {
      setMoods([]);
      setInsights({ reasons: [], tips: [], avoid: [], reminders: [] });
      setMessage('⚠ Please describe your feelings in more detail for better analysis.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    setTimeout(() => {
      const sentiment = new Sentiment();
      const result = sentiment.analyze(input);
      const lowerInput = input.toLowerCase();
      setScore(result.score);

      let scoredMoods = [];

      Object.entries(emotionMap).forEach(([mood, data]) => {
        const keywordHits = data.keywords.filter(word => lowerInput.includes(word)).length;
        let scoreBoost = 0;

        if (mood === 'Happy' && result.score > 2) scoreBoost = 2;
        if (mood === 'Sad' && result.score < -2) scoreBoost = 2;
        if (mood === 'Anxious' && lowerInput.includes('nervous')) scoreBoost = 1;
        if (mood === 'Angry' && lowerInput.includes('irritated')) scoreBoost = 1;

        const moodScore = keywordHits + scoreBoost;

        if (moodScore > 0) {
          scoredMoods.push({ mood, score: moodScore, ...data });
        }
      });

      scoredMoods.sort((a, b) => b.score - a.score);
      const topScore = scoredMoods[0]?.score || 0;
      const filteredMoods = scoredMoods.filter(m => m.score >= topScore);

      if (filteredMoods.length === 0) {
        filteredMoods.push({
          mood: 'Neutral',
          emoji: '😐',
          color: 'from-gray-200 to-gray-100',
          reason: 'You seem to be reflecting or unsure, which is valid.',
          tips: ['Free-write your thoughts for deeper reflection ✍', 'Try light meditation or nature walk 🌱'],
          avoid: ['Avoid trying to force emotion'],
          reminders: ['Emotional balance includes feeling nothing — that’s okay 🌿'],
        });
      }

      setColor(filteredMoods[0].color);
      setMoods(filteredMoods);

      const mergedInsights = {
        reasons: filteredMoods.map(m => m.reason),
        tips: filteredMoods.flatMap(m => m.tips),
        avoid: filteredMoods.flatMap(m => m.avoid),
        reminders: filteredMoods.flatMap(m => m.reminders),
      };

      setInsights(mergedInsights);
      setIsLoading(false);

      // Scroll into view after short delay
      setTimeout(() => {
        moodRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }, 800);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      setMessage("⚠ Your browser doesn't support voice recognition.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + (prev ? ' ' : '') + transcript);
      setMessage('');
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      const errors = {
        'no-speech': "🔇 We didn’t catch that. Try speaking again when you’re ready.",
        'not-allowed': "🎙️ We need microphone access to hear you.",
        default: "💭 Hmm, something went wrong. Try again when you feel ready 🌿",
      };
      setMessage(errors[event.error] || errors.default);
    };

    recognition.start();
  };

  const suggestFeatures = () => {
    if (moods.some(m => ['Sad', 'Anxious', 'Angry'].includes(m.mood))) {
      return (
        <div className="mt-8 text-center space-y-3 animate-fade-in">
            <p className="text-purple-700 font-medium">Need extra support?</p>
            <div className="flex justify-center gap-4">
                <button
                onClick={() => navigate('/moodbooster')}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition"
                >
                🎵 Try Mood Booster
                </button>
                <button
                onClick={() => navigate('/chatbot')}
                className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition"
                >
                💬 Talk to Heal
                </button>
            </div>
            </div>


      );
    }
    return null;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${color || 'from-purple-100 via-pink-100 to-blue-100'} p-6 transition-all duration-500`}>
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-purple-700">Mood Analysis 🧠</h1>
        <p className="mb-4 text-gray-600">Describe your thoughts and let us reflect your mixed emotions with care.</p>

        <div className="relative w-full mb-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Example: I'm feeling grateful for support, but so tired and overwhelmed..."
            rows={4}
            className="w-full p-4 pr-14 border rounded-xl resize-none shadow-md"
          />

          <button
            onClick={startListening}
            className={`absolute top-2 right-2 w-10 h-10 flex items-center justify-center bg-white
              transition-all duration-300 ease-in-out
              ${isListening ? 'bg-purple-100 animate-pulse ring-2 ring-purple-300' : 'hover:bg-purple-50'}`}
            title="Click to speak"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-700" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2zm-5 8c-1.657 0-3-1.343-3-3h2a1 1 0 0 0 2 0h2c0 1.657-1.343 3-3 3z" />
            </svg>
          </button>

          {message && (
            <p className="text-base text-purple-700 font-medium mt-2 text-left whitespace-pre-line animate-fade-in-soft">
              {message}
            </p>
          )}
        </div>

        <button
          onClick={handleAnalyze}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition mb-4"
        >
          Analyze My Mood
        </button>

        {isLoading && (
          <div className="text-purple-600 font-medium text-lg animate-pulse mb-6">
            Reflecting on your emotions... 🧠💭
          </div>
        )}

        {!isLoading && moods.length > 0 && (
          <div ref={moodRef}>
            <div className="bg-white/70 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-8 max-w-xl mx-auto text-left">
              <div className="text-center mb-4">
                <h2 className="text-3xl font-bold text-purple-700">Detected Moods</h2>
                <div className="flex justify-center gap-3 mt-2 flex-wrap">
                  {moods.map((m, idx) => (
                    <span key={idx} className="text-2xl">{m.emoji} {m.mood}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <InsightBlock title="Why you might feel this way:" data={insights.reasons} />
                <InsightBlock title="What you can do to improve your mood:" data={insights.tips} />
                <InsightBlock title="Things to avoid right now:" data={insights.avoid} />
                <InsightBlock title="Gentle reminders:" data={insights.reminders} />
              </div>
            </div>
            {suggestFeatures()}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodAnalysis;
