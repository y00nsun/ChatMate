import React, { useState } from 'react';
import StartButton from './StartButton';
import ChatRoom from './ChatRoom';

function Home({}) {
  const [isChatStarted, setIsChatStarted] = useState(false);

  const handleStartClick = () => {
    setIsChatStarted(true);
  };

  const handleBackToHome = () => {
    setIsChatStarted(false);
  };

  return (
    <div className="home">
      {isChatStarted ? <ChatRoom onBackToHome={handleBackToHome} /> : <StartButton onStartClick={handleStartClick} />}
    </div>
  );
}

export default Home;
