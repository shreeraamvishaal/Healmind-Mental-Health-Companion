import React, { useState } from "react";
import { motion } from "framer-motion";

const CrisisSupport = () => {
  const [country, setCountry] = useState("");
  const [activeSection, setActiveSection] = useState(""); // "helpline" or "nearby"
  const [userCoords, setUserCoords] = useState(null);
  const [nearbySupports, setNearbySupports] = useState([]);
  const [locationError, setLocationError] = useState("");
  

  const helplinesData = {
    India: [
      { name: "iCall (TISS)", phone: "+91-9152987821", info: "Free support by TISS. Mon–Sat, 10 AM to 8 PM." },
      { name: "Vandrevala Foundation", phone: "18602662345", info: "24x7 mental health helpline." },
      { name: "Snehi", phone: "+919582208181", info: "Emotional counselling by volunteers." },
      { name: "AASRA", phone: "+919820466726", info: "24x7 suicide prevention." },
      { name: "Mpower iFeel", phone: "1800120820050", info: "24x7 helpline with Govt of Maharashtra." },
      { name: "Sumaitri", phone: "+911126462666", info: "Delhi-based suicide prevention service." },
      { name: "Samaritans Mumbai", phone: "+918422984528", info: "Support available 5–8 PM daily." },
      { name: "Fortis Mental Health", phone: "+918376804102", info: "Fortis psychology helpline." },
      { name: "Connecting Trust", phone: "+912025435669", info: "Mental health services in Pune." },
      { name: "Mind Matters Circle", phone: "+917021568122", info: "Free support over WhatsApp." },
    ],
    Australia: [
      { name: "Lifeline Australia", phone: "131114", info: "24/7 suicide and crisis support." },
      { name: "Beyond Blue", phone: "1300224636", info: "Anxiety and depression support." },
      { name: "Kids Helpline", phone: "1800551800", info: "Support for young people (5–25 yrs)." },
      { name: "Suicide Call Back Service", phone: "1300659467", info: "Phone and online support." },
      { name: "MensLine Australia", phone: "1300789978", info: "Support for men and families." },
      { name: "QLife", phone: "1800184527", info: "LGBTQ+ counselling and support." },
      { name: "Open Arms", phone: "1800011046", info: "Veteran mental health support." },
      { name: "1800Respect", phone: "1800737732", info: "Domestic abuse and trauma support." },
      { name: "SANE Australia", phone: "1800187263", info: "Complex mental health support." },
      { name: "Healthdirect", phone: "1800022222", info: "General mental health help." },
    ],
    USA: [
      { name: "988 Suicide & Crisis Lifeline", phone: "988", info: "24/7 emotional distress support." },
      { name: "SAMHSA Helpline", phone: "18006624357", info: "Substance and mental health help." },
      { name: "Crisis Text Line", phone: "741741", info: "Text HOME to connect to a counselor." },
      { name: "Trevor Project", phone: "18664887386", info: "LGBTQ+ youth mental health support." },
      { name: "Veterans Crisis Line", phone: "18002738255", info: "Support for veterans. Press 1." },
      { name: "NAMI HelpLine", phone: "18009506264", info: "National Alliance for Mental Illness." },
      { name: "Teen Line", phone: "8008528336", info: "By and for teens (6–10 PM PT)." },
      { name: "Love is Respect", phone: "8663319474", info: "Dating abuse and emotional support." },
      { name: "Mental Health America", phone: "18009642648", info: "General mental health help." },
      { name: "National Runaway Safeline", phone: "18007867292", info: "Youth in crisis & runaways." },
    ],
    Canada: [
      { name: "Talk Suicide Canada", phone: "18334564566", info: "24/7 national suicide prevention." },
      { name: "Wellness Together Canada", phone: "18669258535", info: "Mental health & substance help." },
      { name: "Hope for Wellness", phone: "18552424210", info: "Indigenous peoples support line." },
      { name: "Kids Help Phone", phone: "18006686868", info: "Support for kids, youth, young adults." },
      { name: "First Nations & Inuit Hope", phone: "18552424210", info: "Confidential mental health support." },
      { name: "Trans Lifeline", phone: "8773306366", info: "Peer support for trans individuals." },
      { name: "ConnexOntario", phone: "18663104047", info: "Health services and crisis helpline." },
      { name: "Ontario 211", phone: "211", info: "24/7 resource for support and crisis lines." },
      { name: "Talk 4 Healing", phone: "18444451346", info: "Indigenous women helpline (Ontario)." },
      { name: "Naseeha Mental Health", phone: "18665278253", info: "Muslim mental health support." },
    ],
    France: [
      { name: "SOS Suicide", phone: "0145394000", info: "Support for suicidal thoughts (24/7)." },
      { name: "SOS Help", phone: "0146242600", info: "English-speaking mental support." },
      { name: "Fil Santé Jeunes", phone: "0800235236", info: "Mental help for youth and young adults." },
      { name: "Suicide Ecoute", phone: "0145394000", info: "French national suicide hotline." },
      { name: "Nightline France", phone: "Available by city", info: "Student mental health support line." },
      { name: "Psychiatrie Info Service", phone: "0145302000", info: "Information and referral line." },
      { name: "SOS Amitié", phone: "0969394000", info: "Emotional distress support (24/7)." },
      { name: "SOS Femmes", phone: "3919", info: "Support for women experiencing abuse." },
      { name: "Enfance en Danger", phone: "119", info: "Protection service for children at risk." },
      { name: "Croix-Rouge Écoute", phone: "0800855000", info: "Emotional and social support." },
    ],
    Germany: [
      { name: "Telefonseelsorge", phone: "08001110111", info: "24/7 crisis support (also 08001110222)." },
      { name: "Nummer gegen Kummer", phone: "116111", info: "Support for kids & teens." },
      { name: "Krisendienst Psychiatrie", phone: "08006565111", info: "Psychiatric crisis service." },
      { name: "Beratung.de", phone: "Online only", info: "Directory for mental health professionals." },
      { name: "LGBTQ+ Helpline (LSVD)", phone: "03045607162", info: "Queer support line." },
      { name: "BFE Notruf", phone: "08001234340", info: "Women’s crisis helpline." },
      { name: "Telefonhilfe", phone: "08001110111", info: "Catholic mental health support." },
      { name: "Beratungsstelle", phone: "Online only", info: "Mental health & trauma services." },
      { name: "Nationale Info Service", phone: "08007464565", info: "Suicide and self-harm support." },
      { name: "Samariterbund", phone: "Online/Local", info: "Emergency and trauma help." },
    ],
    China: [
      { name: "Mental Health Centre of Shanghai", phone: "021-64387250", info: "24/7 psychological support." },
      { name: "Beijing Suicide Research", phone: "8008101117", info: "Suicide prevention and crisis." },
      { name: "Guangdong Hotline", phone: "020-81899120", info: "Psychological counselling service." },
      { name: "Shanghai Mental Health Center", phone: "021-64387250", info: "Mental health inquiries and support." },
      { name: "HopeLine China", phone: "4001619995", info: "General emotional support service." },
      { name: "Xinqing Hotline", phone: "4001619995", info: "Mental health crisis support." },
      { name: "Peking University Help", phone: "010-62754182", info: "Student psychological services." },
      { name: "Samaritans Hong Kong", phone: "+85228960000", info: "English-speaking 24/7 crisis line." },
      { name: "Shanghai East Counselling", phone: "021-51699261", info: "English-language counselling." },
      { name: "Jingkai District Mental Health Center", phone: "010-67881331", info: "Mental health support in Beijing." },
    ],
    Japan: [
      { name: "Tokyo Suicide Prevention Centre", phone: "0357740992", info: "24/7 suicide prevention." },
      { name: "Inochi no Denwa", phone: "0570074343", info: "24/7 mental health support (Japanese)." },
      { name: "TELL Lifeline", phone: "0357740992", info: "English-speaking support line." },
      { name: "Tokyo English Lifeline (TELL)", phone: "0357740992", info: "Support for foreign residents." },
      { name: "Mental Health Welfare Centre", phone: "Prefecture dependent", info: "Mental health services by region." },
      { name: "Saitama Mental Health Centre", phone: "048-762-8021", info: "Support line for stress or trauma." },
      { name: "Osaka Mental Health", phone: "0669425311", info: "City-level psychiatric help." },
      { name: "Youthline Japan", phone: "Online", info: "Support for youth in distress." },
      { name: "Kokoro no Mimi", phone: "Online", info: "Workplace mental health support." },
      { name: "Nippon Foundation Support", phone: "0120161171", info: "24/7 mental health line for the deaf (via text)." },
    ]
  };

  const fetchNearbyCenters = async (latitude, longitude) => {
    const apiKey = "YOUR-OpenCage-Geocoder-API-key";
    const radius = 5000; // in meters
    const categories = "healthcare.hospital"; // only hospitals
  
    const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${longitude},${latitude},${radius}&bias=proximity:${longitude},${latitude}&limit=10&apiKey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.features && data.features.length > 0) {
        const results = data.features.map((place) => ({
          name: place.properties.name || "Unnamed Hospital",
          type: place.properties.categories?.join(", ") || "Hospital",
          lat: place.geometry.coordinates[1],
          lon: place.geometry.coordinates[0],
        }));
        setNearbySupports(results);
      } else {
        setLocationError("No nearby hospitals found.");
      }
    } catch (error) {
      console.error("Error fetching data from Geoapify:", error);
      setLocationError("Failed to load nearby hospitals.");
    }
  };
  
  

  const handleNearbySupport = () => {
    setActiveSection("nearby");
    setCountry("");
    setNearbySupports([]);
    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserCoords({ latitude, longitude });
        fetchNearbyCenters(latitude, longitude);
      },
      (error) => {
        setLocationError("Unable to access location. Please enable GPS.");
        console.error(error);
      }
    );
  };

  const features = [
    {
      title: "Helpline Support",
      description: "View national mental health support numbers by country.",
      onClick: () => {
        setActiveSection("helpline");
        setUserCoords(null);
        setNearbySupports([]);
      },
      emoji: "📞",
    },
    {
      title: "In-Person Support",
      description: "Use GPS to locate mental health centers around you.",
      onClick: handleNearbySupport,
      emoji: "📍",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center px-6 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 leading-relaxed"
      >
        Find In-Person Support 💜
      </motion.h1>

      {/* Feature Cards */}
      {!activeSection && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl w-full">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.3 }}
              onClick={feature.onClick}
              className="cursor-pointer p-6 rounded-3xl bg-white/60 backdrop-blur-lg border border-white/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="text-4xl mb-4 drop-shadow-sm">{feature.emoji}</div>
              <h2 className="text-2xl font-semibold text-indigo-700 mb-2">{feature.title}</h2>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Helpline Selector */}
      {activeSection === "helpline" && (
        <div className="mt-10 w-full max-w-md bg-white/80 backdrop-blur-md border border-indigo-200 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-indigo-700 mb-4 text-center">
            🌍 Where are you located?
          </h2>
          <select
            onChange={(e) => setCountry(e.target.value)}
            defaultValue=""
            className="block w-full px-4 py-3 text-lg text-indigo-700 bg-gradient-to-r from-indigo-100 via-sky-100 to-white border border-indigo-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="" disabled>🌐 Select your country</option>
            <option value="India">🇮🇳 India</option>
            <option value="Australia">🇦🇺 Australia</option>
            <option value="USA">🇺🇸 United States</option>
            <option value="Canada">🇨🇦 Canada</option>
            <option value="France">🇫🇷 France</option>
            <option value="Germany">🇩🇪 Germany</option>
            <option value="China">🇨🇳 China</option>
            <option value="Japan">🇯🇵 Japan</option>
          </select>
        </div>
      )}

      {/* Helplines Display */}
      {country && helplinesData[country] && (
        <div className="mt-10 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {helplinesData[country].map((line, index) => (
            <div
              key={index}
              className={`bg-white border-l-4 border-indigo-300 rounded-lg shadow-md p-4 ${
                index === 9 ? "lg:col-start-2" : ""
              }`}
            >
              <h2 className="text-xl font-semibold text-indigo-700">{line.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{line.info}</p>
              <a
                href={`tel:${line.phone}`}
                className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm"
              >
                📞 Call Now
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Nearby Support Display */}
      {activeSection === "nearby" && (
        <div className="mt-10 w-full max-w-6xl">
          {/* 🔁 Updated Heading */}
          <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">
            🏥 Nearby General Hospitals Near You
          </h2>

          {/* Location error message */}
          {locationError && (
            <p className="text-red-600 text-center mb-6">{locationError}</p>
          )}

          {/* Display results */}
          {nearbySupports.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbySupports.map((place, index) => (
                <div
                  key={index}
                  className="bg-white border-l-4 border-pink-300 rounded-lg shadow-md p-4"
                >
                  {/* Hospital name */}
                  <h3 className="text-xl font-semibold text-pink-600">
                    {place.name || "Unnamed Hospital"}
                  </h3>

                  

                  {/* Optional rating */}
                  {place.rating && (
                    <p className="text-sm text-gray-700 mb-2">
                      ⭐ Rating: {place.rating}
                    </p>
                  )}

                  {/* Google Maps link */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + (place.address || place.vicinity))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md text-sm"
                  >
                    Open in Maps
                  </a>
                </div>
              ))}
            </div>
          ) : (
            !locationError && (
              <p className="text-gray-600 text-center">Fetching nearby hospitals...</p>
            )
          )}
        </div>
      )}



      <footer className="mt-16 text-sm text-gray-500 text-center max-w-2xl">
        If you or someone you know is struggling, don’t wait. These helplines are here for you. 💜
      </footer>
    </div>
  );
};

export default CrisisSupport;
