import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import PdfView from './PdfView';
import Chat from './chat'
const Index = () => {
  const storedIsChatMode = localStorage.getItem('isChatMode') === 'false';
  const [isChatMode, setIsChatMode] = useState(!storedIsChatMode);
  const [selectedFile, setSelectedFile] = useState(null);
  const [transcript, setTranscript] = useState(null);
  const [showInput, setShowInput] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadClick = () => {
    setShowInput(true);
  };

    useEffect(() => {
      localStorage.setItem('isChatMode', isChatMode);
    }, [isChatMode]);

    const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    setShowInput(false);
    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    try {
      const response = await axios.post('https://learnai-chat-with-pdf.vercel.app/PDF/generate-transcript', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      // console.log('Response:', response.data);

      setTranscript(response.data);
    } catch (error) {
      console.error('File upload failed:', error);
    }
  };

  useEffect(() => {
    // console.log('transcript', transcript)
    if (transcript) {
      setIsChatMode(!isChatMode);
    }
  }, [transcript]);

  const handlePageRefresh = () => {
    localStorage.removeItem('isChatMode');
    setTranscript(null);
    setIsChatMode(true);
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handlePageRefresh);

    return () => {
      window.removeEventListener('beforeunload', handlePageRefresh);
    };
  }, []);

  return (
    <div className='chat-page'>
      {isChatMode ? (
        <div>
          <h2 className='centered-heading white'>Chat with Pdf</h2>
          <p className='centered-heading white'>
            Communicate with your documents, part by part with the help of our AI-driven system
          </p>
          <div className='upload-pdf-box'>
            <p className='upload-pdf-text'>Drag and Drop File</p>
            <img src="images/upload.svg" alt="Upload icon" className='upload-pdf-icon' />
            <button className='upload-pdf-button' onClick={showInput ? handleUpload : handleUploadClick}>
              UPLOAD FILE
            </button>
            {showInput && (
              <input
                type='file'
                onChange={handleFileChange}
                style={{ display: 'none' }}
                ref={(input) => input && input.click()}
              />
            )}
          </div>
        </div>
      ) : (
          <div className='pdf-chat-box white'>
            {/* <div className='pdf-viewer'>
              <PdfView selectedFile={selectedFile} />
            </div> */}
            <div className='chat-with-pdf-dialogue'>
              <h2 className='white chat-with-pdf-dialogue-heading'>CHAT</h2>
              <p className='white chat-with-pdf-dialogue-subheading'>
                In context to the pdf which was uploaded, continue the chat ahead.
              </p>
              <Chat transcript={transcript}/>
            </div>
            </div>
          )
        }
      </div>
    )
  }

  export default Index;