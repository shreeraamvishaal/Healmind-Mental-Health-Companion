import React, { useState } from 'react';
import axios from 'axios';

const MoodBooster = () => {
  const [mood, setMood] = useState('');
  const [musicResults, setMusicResults] = useState([]);
  const [podcastResults, setPodcastResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    if (!API_KEY) {
      console.error("YouTube API key is missing! Check your .env and restart the dev server.");
      return;
    }

    const maxResults = 6;
    const musicQuery = `${mood} uplifting music`;
    const podcastQuery = `mental health podcast for ${mood}`;

    setLoading(true);
    try {
      const [musicRes, podcastRes] = await Promise.all([
        axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet',
            q: musicQuery,
            type: 'video',
            maxResults,
            key: API_KEY,
          },
        }),
        axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet',
            q: podcastQuery,
            type: 'video',
            videoDuration: 'long',
            maxResults,
            key: API_KEY,
          },
        }),
      ]);

      setMusicResults(musicRes.data.items);
      setPodcastResults(podcastRes.data.items);
    } catch (err) {
      console.error('Error fetching from YouTube API:', err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-purple-700">Mood Booster 🎵</h1>
        <p className="mb-4 text-gray-600">
          Enter how you're feeling and get uplifting music and helpful podcasts to boost your mood.
        </p>

        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="e.g. sad, anxious, stressed..."
          className="w-full p-3 border rounded-lg mb-4"
        />

        <button
          onClick={handleSearch}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Loading...
            </div>
          ) : (
            'Boost My Mood'
          )}
        </button>

        {/* Results */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* MUSIC SECTION */}
          {musicResults.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-purple-600 mb-4">🎶 Musical Therapy</h2>
              <div className="grid grid-cols-1 gap-6">
                {musicResults.map((video) => (
                  <div key={video.id.videoId} className="bg-white p-4 rounded-lg shadow-lg">
                    <iframe
                      className="w-full h-56 rounded-lg"
                      src={`https://www.youtube.com/embed/${video.id.videoId}`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                    <h3 className="mt-2 font-semibold text-purple-600">{video.snippet.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PODCAST SECTION */}
          {podcastResults.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-purple-600 mb-4">🎙️ Supportive Podcasts</h2>
              <div className="grid grid-cols-1 gap-6">
                {podcastResults.map((video) => (
                  <div key={video.id.videoId} className="bg-white p-4 rounded-lg shadow-lg">
                    <iframe
                      className="w-full h-56 rounded-lg"
                      src={`https://www.youtube.com/embed/${video.id.videoId}`}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                    <h3 className="mt-2 font-semibold text-purple-600">{video.snippet.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodBooster;
