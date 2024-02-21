import React, {useState, useEffect} from 'react'
import './index.css'
import YouTube from 'react-youtube';

function Index() {
    const [prompt, setPrompt] = useState('');
    const [videoUrls, setVideoUrls] = useState([]);
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [videoVisible, setVideoVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [videoId, setVideoId] = useState('')
    const [transcript, setTranscript] = useState(null);
    const onInputChange = (event) => {
    setYoutubeUrl(event.target.value);
    setErrorMessage('');
  };
    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) {
        alert('Please ask some query')
    }
    // Make the API call with the prompt
    const apiUrl = 'http://localhost:5000/youtube/recommend-videos';
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });
        // console.log('response', response)
        const data = await response.json();
        console.log(data);
        // Update the videoUrls state with the array of video URLs
        setVideoUrls(data);
    } catch (error) {
        console.error('Error fetching video recommendations:', error);
    }
};


    // useEffect(() => {
    //     // You can add additional logic here if needed when videoUrls state changes
    //     console.log('Video URLs:', videoUrls);
    // }, [videoUrls]);

    // const onFormSubmit = (e) => {
    //   e.preventDefault();
    //   const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(c\/)?[^\/\n\s]+\/?|youtube\.com\/(embed|v)\/|youtu\.be\/|yoursite\.com\/(embed|v)\/|yoursite\.com\/(c\/)?[^\/\n\s]+\/?|yoursite\.com\/(embed|v)\/)([^"&?\/\s]{11})?$/;
    
    //   try {
    //       setVideoId(extractVideoId(youtubeUrl));
    //       getTranscript(youtubeUrl);
    //       setYoutubeUrl('');
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    const extractVideoId = (url) => {
    const match = url && url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
};
    return (
        <div className='roadmap'>
            {videoUrls.length!==0 && 
            <>
                <h2 className="generated-roadmap">Here is Your Generated Roadmap</h2>
                <div className="roadmap-container">
                    <div className="roadmap-container-first">
                        <YouTube className='video-url' videoId={extractVideoId(videoUrls[1])} opts={{ width: 300 }} />
                        <YouTube className='video-url' videoId={extractVideoId(videoUrls[3])} opts={{ width: 300}} />
                    </div>
                    <img src="images/roadmap-template.svg" alt="" className="roadmap-container-second" />
                    <div className="roadmap-container-third">
                        <YouTube className='video-url' videoId={extractVideoId(videoUrls[0])} opts={{ width: 300}} />
                        <YouTube className='video-url' videoId={extractVideoId(videoUrls[2])} opts={{ width: 300}} />
                        <YouTube className='video-url' videoId={extractVideoId(videoUrls[4])} opts={{ width: 300}} />

                    </div>
                </div>
            </>
            }
            <h1 className='roadmap-heading'>GENERATE ROADMAP</h1>
            <h2 className="roadmap-subheading">Craft Your Learning Journey with personalised roadmaps</h2>
            <h2 className="roadmap-subheading">Define your learning objectives and let our AI algorithms create a customized roadmap for your desired topic. Whether it's mastering a skill or understanding a concept, your roadmap is crafted just for you.</h2>
            <form className="text-bar" onSubmit={handleSubmit}>
                <div className="input-container-submit">
                    <input
                        type="text"
                        placeholder="What topic do you want to learn"
                        className='input-prompt-holder'
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <button type="submit">
                        <img src="images/search.svg" alt="" className='prompt-submit' />
                    </button>
                </div>
            </form>
            <img src="images/roadmap-instructions.svg" alt="" className="roadmap-instructions-image" />
        </div>
    )
}

export default Index