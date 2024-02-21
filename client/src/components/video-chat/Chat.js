import React, { useState } from 'react';
import axios from 'axios';

const Chat = ({ transcript, videoId }) => {
  const [userQuestion, setUserQuestion] = useState('');
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [suggestText, setSuggestText] = useState(true);

  const suggestedQuestions = [
    "Explain the concepts of this video to a five year old",
    "Describe its summary under 100 words",
    "Highlight only the technical aspects in this video",
  ];

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://learnai-api.vercel.app/api/AI/videoChat',
        {
          id: videoId,
          text: transcript,
          question: userQuestion,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const newQuestionAndAnswer = {
        question: userQuestion,
        answer: response.data.answer || 'No answer available',
      };

      setQuestionsAndAnswers((prev) => [...prev, newQuestionAndAnswer]);
      setUserQuestion('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuggestedQuestionClick = async (question) => {
    try {
      const response = await axios.post(
        'https://learnai-api.vercel.app/api/AI/videoChat',
        {
          id: videoId,
          text: transcript,
          question: question,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const newQuestionAndAnswer = {
        question: question,
        answer: response.data.answer || 'No answer available',
      };

      setQuestionsAndAnswers((prev) => [...prev, newQuestionAndAnswer]);
      setSuggestText(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // qusetions and answers rendering
    <div className="video-chat-container white">
      <div className="questions-and-answers">
        {questionsAndAnswers.map((qa, index) => (
          <div key={index} className="qa-item">
            <p className="video-question">{qa.question}</p>
            <p className="video-answer">{qa.answer}</p>
          </div>
        ))}
      </div>
{/* suggested question */}
      {suggestText && (
        <div className="suggested-questions">
          <p>You can start a conversation here or try the following prompts:</p>
          <ul className='list-none'>
            {suggestedQuestions.map((question, index) => (
              <li className='suggested' key={index} onClick={() => handleSuggestedQuestionClick(question)}>
                {question}
              </li>
            ))}
          </ul>
        </div>
      )}
{/* input bar */}
      <form onSubmit={handleQuestionSubmit} className="text-bar">
        <div className="input-container-submit">
          <input
            type="text"
            placeholder="Ask any Question"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            className='input-prompt-holder'
          />
          <img src="images/search.svg" alt="" className='prompt-submit'/>
        </div>
      </form>
    </div>
  );
};

export default Chat;
