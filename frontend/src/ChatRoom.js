import React, { useState } from 'react';

function ChatRoom({ onBackToHome, onLogout }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim()) {

      // User input
      const userMessage = { sender: 'user', text: input };

      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');

     try {
        // Call Backend API
        const response = await fetch('http://localhost:3001/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const botMessage = { sender: 'bot', text: data.response };

        setMessages((prevMessages) => [...prevMessages, botMessage]);

      } catch (error) {
        console.error('Error:', error);
      }
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
