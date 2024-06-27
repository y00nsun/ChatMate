import React from 'react';

function StartButton({ onStartClick }) {
  return (
    <div className="start-button-container">
      <button className="start-button" onClick={onStartClick}>
        시작하기
      </button>
    </div>
  );
}

export default StartButton;