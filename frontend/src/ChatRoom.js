import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChatRoom({ onBackToHome, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('/api/chatHistory');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, []);

  
  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');

      ///setMessages([...messages, { role: 'user', content: inputMessage }]);
      ///setInputMessage('');

      // AI 응답을 처리하는 코드
      const response = await fetch('http://localhost:5001/api/getResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, { sender: 'ai', text: data.response }]);
    }
  };

  return (
    <div className="chat-room">
      <button className="home-button" onClick={onBackToHome}>홈으로</button>
      <button className="logout-button" onClick={onLogout}>로그아웃</button>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-bubble">
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>
    </div>
  );
} 

export default ChatRoom;
