import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
function Navbar({isLoggedIn}) {
    const location = useLocation();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const profileData = queryParams.get('profile');
        // console.log(profileData);
        if (profileData) {
            const parsedProfile = JSON.parse(decodeURIComponent(profileData));
            setUserProfile(parsedProfile);
        }
        // console.log(userProfile);
    }, [location.search]);
    return (
        <div className='navbar'>
            <h2 className='logo'>LOGO</h2>
            <div className='navigators'>
                {!isLoggedIn ? (<Link to="/roadmap" className='navbar-components'>GENERATE ROADMAP</Link>) :
                    <Link to="/" className='navbar-components'>ABOUT</Link>
                }
                {!isLoggedIn ? (<Link to="/whatsapp" className='navbar-components'>ACCESS IN WHATSAPP</Link>) :
                    <Link to="/" className='navbar-components'>HOW OT USE</Link>
                }
                {!isLoggedIn ? (<Link to="/video-chat" className='navbar-components'>CHAT WITH VIDEO</Link>) :
                    <Link to="/" className='navbar-components'>TEAM</Link>
                }
                {!isLoggedIn ? (<Link to="/pdf-chat" className='navbar-components'>CHAT WITH PDF</Link>) :
                    <Link to="/" className='navbar-components'>EXPLORE</Link>
                }
                </div>
            {userProfile !== null ? (
                <p className="white">Welcome, {userProfile && userProfile.displayName}</p>)
                : (<Link className="signin-button" to="/auth">SIGN IN</Link>)
            }
        </div>
    )
}

export default Navbar
