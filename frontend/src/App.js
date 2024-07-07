import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import ChatRoom from './ChatRoom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  /* 임시 코드. 로그인 기능 제대로 구현되면 밑 코드로 변경 */
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/chatroom" element={<ChatRoom />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );

  /* return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Home onLogout={handleLogout} />} />
            <Route path="/chatroom" element={<ChatRoom />} />
            <Route path="*" element={<Navigate to="/" />} /> {// 모든 다른 경로를 홈으로 리다이렉트}
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} /> {// 모든 다른 경로를 로그인으로 리다이렉트}
          </Routes>
        )}
      </div>
    </Router>
  ); */
}

export default App;
