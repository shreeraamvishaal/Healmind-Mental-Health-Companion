import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text:
        "Hi there! I’m MindMate, your mental health companion 🤗. I’m here to listen, support, and be by your side — no matter what you’re going through. What’s on your mind today?"
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const voicesRef = useRef([]);

  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

  const systemInstruction = {
    role: 'user',
    parts: [
      {
        text:
          'You are a gentle and empathetic mental health companion named “MindMate”. Your goal is to support users who are feeling emotionally overwhelmed, anxious, lonely, or depressed. Respond with kindness, patience, and warmth. Avoid judgment or advice overload. Help the user feel understood, validated, and safe to express themselves.'
      }
    ]
  };

  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = speechSynthesis.getVoices();
    };

    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }, []);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`,
        {
          contents: [
            systemInstruction,
            ...newMessages.map((msg) => ({
              role: msg.role,
              parts: [{ text: msg.text }]
            }))
          ]
        }
      );

      const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (reply) {
        setMessages([...newMessages, { role: 'assistant', text: reply }]);
      } else {
        setMessages([...newMessages, { role: 'assistant', text: "I'm here for you, always 💜" }]);
      }
    } catch (err) {
      console.error('Error contacting Gemini API:', err);
      setMessages([...newMessages, { role: 'assistant', text: "Oops! Something went wrong. Try again soon." }]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => v.name === 'Google UK English Female' || v.name === 'Microsoft Zira Desktop - English (United States)');
    utterance.voice = femaleVoice || voices.find(v => v.lang === 'en-US');
    utterance.lang = 'en-US';
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(prev => prev + (prev ? ' ' : '') + transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-700 mb-6 text-center">Talk to Heal 💬</h1>

        <div className="bg-white/70 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-6 h-[70vh] overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-3 p-3 rounded-lg w-fit max-w-[80%] ${
                msg.role === 'user'
                  ? 'ml-auto bg-purple-200 text-right'
                  : 'mr-auto bg-white text-left'
              }`}
            >
              <p className="text-base md:text-lg leading-relaxed text-gray-800 whitespace-pre-line">{msg.text}</p>

              {msg.role === 'assistant' && (
                <button
                  onClick={() => speak(msg.text)}
                  className="mt-2 text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
                >
                  🔊 Speak
                </button>
              )}
            </div>
          ))}

          {loading && (
            <div className="text-purple-500 italic text-sm mt-2">Mindmate is thinking...</div>
          )}
        </div>

        {/* Input Area with Mic Inside */}
        <div className="mt-4 flex gap-2">
          <div className="relative w-full">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Tell me what's on your mind..."
              rows={2}
              className="w-full p-3 pr-12 rounded-lg border shadow resize-none"
            ></textarea>

            <button
            onClick={startListening}
            className={`absolute top-2 right-2 w-11 h-11 flex items-center justify-center mt-2 mr-1
                transition-all duration-300 ease-in-out
                ${listening
                ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                : 'bg-white text-purple-600 hover:bg-purple-100 hover:shadow-lg'}`}
            title="Speak your thoughts"
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2zm-5 8c-1.657 0-3-1.343-3-3h2a1 1 0 0 0 2 0h2c0 1.657-1.343 3-3 3z" />
            </svg>
            </button>

          </div>

          <button
            onClick={sendMessage}
            className="bg-purple-600 text-white px-6 rounded-lg hover:bg-purple-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
