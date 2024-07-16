import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import ChatRoom from './ChatRoom';
import Signup from './Signup';

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
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Home onLogout={handleLogout} />} />
            <Route path="/chatroom" element={<ChatRoom />} />
            <Route path="*" element={<Navigate to="/" />} /> 
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} /> 
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
