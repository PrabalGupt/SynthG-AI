import React, { useState, useEffect} from 'react';
// import Navbar from '../Navbar';
import YouTube from 'react-youtube';
// import {Link} from 'react-router-dom'
// import SearchIcon from '@material-ui/icons/Search';
import Chat from './Chat.js'
import './index.css';
import axios from 'axios';

export default function Index() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoVisible, setVideoVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [videoId, setVideoId] = useState('')
  const [transcript, setTranscript] = useState(null);
  const onInputChange = (event) => {
    setYoutubeUrl(event.target.value);
    setErrorMessage('');
  };
  useEffect(() => {
    console.log('Transcript updated:', transcript);
  }, [transcript]);

  const getTranscript = async () => {
    try {
      const response = await axios.post(
        'https://learnai-api.vercel.app/api/AI/getTranscript',
        {
          videoUrl: youtubeUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data.text)
      setTranscript(response.data.text);
      // console.log(transcript);
    } catch (error) {
      console.log(error);
    }
  }
    const onFormSubmit = (e) => {
      e.preventDefault();
      const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(c\/)?[^\/\n\s]+\/?|youtube\.com\/(embed|v)\/|youtu\.be\/|yoursite\.com\/(embed|v)\/|yoursite\.com\/(c\/)?[^\/\n\s]+\/?|yoursite\.com\/(embed|v)\/)([^"&?\/\s]{11})?$/;
    
      try {
        if (youtubeUrlRegex.test(youtubeUrl)) {
          setVideoVisible(true);
          setVideoId(extractVideoId(youtubeUrl));
          getTranscript(youtubeUrl);
          setYoutubeUrl('');
        } else {
          setErrorMessage('Please input a valid YouTube URL.');
          setVideoVisible(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
  const extractVideoId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  return (
    <>
      {/* <div className="gradient"></div> */}
      {videoVisible ? (
        <form onSubmit={onFormSubmit}>
            <div className="input-container">
              <input className="youtube-url-input white" placeholder='Enter YouTube URL' value={youtubeUrl} onChange={onInputChange}/>
            </div>
        </form>
      )
      :(
      <h2 className='centered-heading white'>Chat with Video</h2>
      )}
      {videoVisible ? (
        <>
          <YouTube className='video-url' videoId={videoId} opts={{ width: 960, height: 460 }} />
        <p className='youtube-redirect'>
            Want to explore some more videos? Head over to{' '}
            <a
              className='white'
              href='https://www.youtube.com/'
              target='_blank'
              rel='noopener noreferrer'
              style={{ fontWeight: 'bold' }}
            >
              Youtube
            </a>
          </p>
        </>
      ) : (
        <>
          <p className='centered-heading white'>
            Enter the YouTube URL of the video to continue chatting with the video
          </p>
          <form onSubmit={onFormSubmit}>
            <div className="input-container">
              <input
                className="youtube-url-input white"
                type="text"
                placeholder='Enter YouTube URL'
                value={youtubeUrl}
                onChange={onInputChange}
              />
            </div>
          </form>
          {errorMessage && (
            <p className="error-message white">{errorMessage}</p>
          )}
          </>
      )}
      {transcript && <Chat transcript={transcript} videoId={videoId} />}
    </>
  );
}