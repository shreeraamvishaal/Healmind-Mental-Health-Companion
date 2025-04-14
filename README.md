# 🧠 Heal Mind – AI-Powered Mental Health Companion  
**Project-X (24 Hour) Hackathon 2025**  
**Presented by:** Team Glitch  
**Built by:** Shree Raam Vishaal K
---

## 📌 Problem

Early signs of mental health issues often go unnoticed, leading to delayed intervention and worsening of emotional and psychological conditions.

---

## ❓ Problem Statement

**Challenge**: Accurately detecting mental health issues while ensuring user privacy and ethical AI usage.

---

## 🌟 Introduction

Ever felt like no one really understands what you’re going through?  
Talking about mental health is tough, and finding the right kind of support is even tougher. That’s why we’re building **Heal Mind**—an AI-powered companion that listens, adapts, and truly understands you.

Whether you're feeling overwhelmed by stress, anxiety, or heartbreak, Heal Mind responds with empathy—offering emotional validation, supportive conversations, mood analysis, and even uplifting music or podcast recommendations based on how you're feeling.

---

## 💡 Solution Overview

Heal Mind empowers individuals by offering:

- 🎭 **Mood Analysis** – Detect emotions from user text input using NLP & sentiment analysis
- 🤖 **Advanced Chatbot** – Conversational support for mental health-related concerns
- 🎧 **Mood Booster** – Recommends music, podcasts, and relaxation tools based on mood
- 📞 **Crisis Support** – Instantly accessible emergency helplines for multiple countries
- 📍 **Nearby Support** – Uses free geolocation APIs to suggest nearby support centers

---

## 🔧 Technical Approach

We’re using an **interactive UI** combined with a sentiment detection backend to:

- Analyze user input and detect emotional state
- Provide personalized content suggestions
- Ensure fast and secure user interaction handling

---

## 🛠️ Tech Stack

| Layer      | Tools / Frameworks |
|------------|--------------------|
| **Frontend**  | React, Tailwind CSS |
| **Backend**   | FastAPI, Node.js |
| **APIs**      | YouTube Data API, OpenCage Geocoder, external AI APIs |
| **AI & NLP**  | Hugging Face Transformers, Gemini Flash |
| **Security**  | Secured APIs, privacy-compliant storage |

---

## 🚧 Implementation Plan & Key Challenges

- 🧠 **Accurate Mood Detection** – Fine-tuned NLP models
- 🎯 **Smart Recommendations** – Mapping emotions to content
- 🔗 **Seamless Integration** – Unifying APIs, AI models, and UI
- 🔐 **Privacy & Security** – Responsible handling of sensitive data

---

## 📸 Visuals

> *demo video*
    https://drive.google.com/file/d/1JKW0GIITOHy17bBOFsdKjq3mKT3jbd1A/view?usp=sharing
---

## 📥 Installation

    ```bash
    # Clone the repository
    git clone http://gitlab.digilabs.ai/Project-X-Hackathon-2025/Project-X-Hackathon-2025-Level-2/Glitch.git

    # Navigate into the directory
    cd Glitch

    # Install dependencies
    npm install

    #get API keys
    create new environment file .env within src as src/.env
    get youtube api key and initialize as below 
    REACT_APP_YOUTUBE_API_KEY=your_api_key

    get gemini api key and initialize as below
    REACT_APP_GEMINI_API_KEY=your_api_key

    # Start the app
    npm start

    ⚠️ Requirements: Node.js v16+, npm or yarn


## 🚀 Usage

      1. Launch the app with npm start

      2. Allow location access when prompted for Nearby Support

      3. Start chatting with the AI for mood-based support

      4. Receive tailored content like music, podcasts, and calming tools

      5. Access 24/7 helpline numbers from your country in a single tap

## 🗺️ Supported Countries for Crisis Support

    1. 🇮🇳 India

    2. 🇺🇸 USA

    3. 🇨🇦 Canada

    4. 🇦🇺 Australia

    5. 🇫🇷 France

    6. 🇩🇪 Germany

    7. 🇨🇳 China

    8. 🇯🇵 Japan

## 🛣️ Roadmap

    1.  🌍 Scalability – Handle large concurrent user sessions

    2.  🔐 Secure Authentication – login & encryption features

    3.  🧑‍⚕️ Expert Collaboration – Connect with verified mental health professionals

    4.  🌐 Multilingual Support – Broaden accessibility across languages

    5.  🧬 AI Personalization – Enhance emotion detection with contextual learning

## 🧑‍💻 Contributing
    We welcome contributions from developers, AI experts, and mental health advocates.

    # Steps to contribute
        1. Fork the repo
        2. Create a branch: git checkout -b feature-xyz
        3. Make your changes
        4. Commit: git commit -m "Added feature xyz"
        5. Push: git push origin feature-xyz
        6. Create a Merge Request
        Please ensure all code contributions are privacy-conscious and inclusive.

## 📬 Support

If you encounter any issues or have questions, feel free to:

- 💬 [Raise an issue](https://gitlab.com/your-repo/issues) via GitLab Issues  
- 📧 Contact me directly:
  - shreeraamvishaal@gmail.com


## 📝 License

This project is licensed under the [MIT License](LICENSE).

Feel free to use, modify, and share this project with attribution. Built with 💜 for the IBM 24 hour Hackathon (ProjectX).

## 🚀 Project Status

✅ All core features of the Mental Health Support Application have been successfully implemented:

### 🧠 Mood Analysis  
- Detects emotional tone using sentiment analysis  
- Supports multi-mood detection and empathetic feedback  
- Real-time voice input with graceful handling  
- Smooth UI transitions powered by Framer Motion  

### 🎵 Mood Booster  
- Suggests uplifting **music and podcasts** based on mood  
- Tailored recommendations using **YouTube Data API v3**  
- Categorized content with elegant display and sectioning  
- Visually appealing with gradients and Tailwind animations  

### 💬 Talk to Heal (AI Chatbot)  
- Fine-tuned mental health companion using **Gemini API**  
- Voice support: speech-to-text and text-to-speech  
- Safe, comforting, and non-judgmental conversations  
- Mobile-optimized UI with smart auto-scrolling and feedback  

### 🆘 Crisis Support  
- 🌍 Country-wise helpline numbers with click-to-call  
- 📍 Nearby hospital detection using **Geoapify API**  
- 🔄 Toggle between Helpline & Nearby Support views  
- ⚠️ Graceful error handling for location permissions  
- Fully responsive and animated with Tailwind & Framer Motion  

---

✅ The app is fully functional, elegantly designed, and ready for user testing or further enhancements.
