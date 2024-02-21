import React, {useState} from 'react'
import axios from 'axios'
const Chat = ({transcript}) => {
    const [query, setQuery] = useState(null);
    const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    console.log('transcript', transcript.pdfText)
    try {
      const response = await axios.post(
        'https://learnai-chat-with-pdf.vercel.app/PDF/answer-question',
        {
          pdfText: transcript.pdfText,
          question: query,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const newQuestionAndAnswer = {
        question: query,
        answer: response.data.answer || 'No answer available',
      };

      setQuestionsAndAnswers((prev) => [...prev, newQuestionAndAnswer]);
      setQuery('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuggestedQuestionClick = async (question) => {
    try {
      const response = await axios.post(
        'https://learnai-chat-with-pdf.vercel.app/PDF/answer-question',
        {
          pdfText: transcript,
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
    } catch (error) {
      console.error(error);
    }
  };
    const onInputChange = (e) => {
        setQuery(e.target.value)
    }
  return (
    <div>
            <div className="chat-container">
            {questionsAndAnswers.map((qa, index) => (
            <div key={index} className='pdf-chat-question-answer'>
                <p className="chat-question">{qa.question}</p>
                <p className="chat-answer">{qa.answer}</p>
            </div>
            ))}
              </div>
              <form onSubmit={handleQuestionSubmit}  >
                <input
                  className="youtube-url-input white"
                  type="text"
                  placeholder='Ask any question with relevance to the pdf'
                  value={query}
                  onChange={onInputChange}
                />
              </form>
    </div>
  )
}

export default Chat;
