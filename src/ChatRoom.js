import React, { useState } from 'react';

function ChatRoom({ onBackToHome }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');
      // 여기에 AI 응답을 처리하는 코드를 추가할 수 있습니다.
    }
  };

  return (
    <div className="chat-room">
      <button className="home-button" onClick={onBackToHome}>홈으로</button>
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