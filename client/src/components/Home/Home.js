import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import './Home.css'
function Home() {
  const [userProfile, setUserProfile] = useState(false);
  const location = useLocation();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const profileData = queryParams.get('profile');
        // console.log(profileData);
        if (profileData) {
          setUserProfile((prev) => !prev)
        }
        // console.log(userProfile);
    }, [location.search]);
  return (
    <div className='home-container'>
      <h2 className='home-heading'>Simplify Learning with unique AI powered system</h2>
      <p className='home-subheading'>Explore the multiverse of learning possibilities</p>
      {userProfile && (<Link className="get-started-btn" to="/video-chat">Get Started</Link>)}
      <img src="images/home-image.svg" alt="" className="home-image" />
      <div className="home-quote-container">
        <p className="quote-left">Who said Learning has to be difficult?</p>
        <p className="quote-right">With our advanced curated AI called Genius, we are here to simplify your entire process of learning.  Genius takes care of everything to ensure you receive effortless guidance in your journey of seeking knowledge.</p>
      </div>
      <iframe className='home-video' src="https://www.youtube.com/embed/kj1-rR3udNs?si=Vl3WVI-XkK6ylZbp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      {/* <img src="images/home-whatsapp.svg" alt="" className='home-whatsapp-img' /> */}
    </div>
  )
}

export default Home