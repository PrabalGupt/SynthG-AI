import React, { useEffect, useState } from 'react';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Video from './components/video-chat/index.js';
import Auth from './components/Auth/Auth.js';
import Pdf from './components/pdf-chat/index.js';
import Whatsapp from './components/Whatsapp/index.js';
import Dub from './components/Dubbing/index.js';
import Roadmap from './components/Roadmap/index.js';

function App() {
  const location = useLocation();
  const [userProfile, setUserProfile] = useState(false);
  const [switchHome, setSwitchHome] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const profileData = queryParams.get('profile');

    if (profileData) {
      setUserProfile(true);
    }
    
    // Update switchHome based on the current path
    setSwitchHome(location.pathname !== '/');
  }, [location.search, location.pathname]);

  // Determine whether to show the Navbar based on the current path
  const showNavbar = !location.pathname.startsWith('/auth');

  return (
    <div>
      <div className="gradient1"></div>
      {showNavbar && <Navbar switchHome={switchHome} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/video-chat"
          element={
            // userProfile ? (
              <Routes>
                <Route path='/' element={<Video />} />
              </Routes>
            // ) : (
            //   <Navigate to="/auth" />
            // )
          }
        />
        <Route path="/pdf-chat" element={<Pdf />} />
        <Route path="/whatsapp" element={<Whatsapp />} />
        <Route path="/video-dub" element={<Dub />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route
          path="/auth/*"
          element={
            userProfile ? <Navigate to="/" /> : <Auth />
          }
        />
      </Routes>
    <Footer />
    </div>
  );
}

export default App;
