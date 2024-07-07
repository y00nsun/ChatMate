import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/login', { id, password });
      // 로그인 성공 시 처리 (예: 토큰 저장, 사용자 정보 저장 등)
      console.log(response.data);
      navigate('/chatroom'); // 로그인 성공 후 채팅방 페이지로 이동
    } catch (error) {
      setError('잘못된 아이디 또는 비밀번호입니다.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>로그인</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
              requred
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              requred
            />
          </div>
          {error && <p>{error}</p>}
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
}

export default Login;