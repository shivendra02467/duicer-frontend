import {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-black sticky top-0 z-50">
      <h1 className="text-xl font-bold">Duicer</h1>
      <ul className="flex gap-4 text-700">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/videos">Videos</Link></li>
        <li><Link to="/projects">Projects</Link></li>
      </ul>
    </nav>
  );
}

function Home() {
  return (
    <motion.div className="p-6 max-w-3xl mx-auto text-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 className="text-3xl font-bold mb-4">Welcome to Kush's Infotainment</h2>
      <p className="text-600">Exploring Pure Math, Programming, and Fun Ideas through Videos & Projects.</p>
      <h2 className="text-2xl font-bold mb-4">GitHub</h2>
      <p className="mb-4">Check out my code and contributions on GitHub.</p>
      <a href="https://github.com/shivendra02467" target="_blank" rel="noopener noreferrer"
        className="px-4 py-2 bg-white text-black rounded-xl shadow hover:bg-gray-800">Visit GitHub</a>
    </motion.div>
  );
}

function Videos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_YT_API_KEY; // put in .env file ideally
    const CHANNEL_ID = import.meta.env.VITE_YT_CHANNEL_ID;
    const URL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&type=video&maxResults=6`;

    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.items || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Latest YouTube Videos</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {videos.map((video) => (
          <div key={video.id.videoId} className="aspect-video">
            <iframe
              className="w-full h-full rounded-xl shadow"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <ul className="space-y-4">
        <li className="p-4 border rounded-xl shadow hover:shadow-lg transition">C++ Toolchain Manager</li>
        <li className="p-4 border rounded-xl shadow hover:shadow-lg transition">Real-time Chess Game</li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-white home-bg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
