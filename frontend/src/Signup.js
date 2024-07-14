import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';

const Signup = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/signup', { id, password });
      // 회원가입 성공 시 처리
      console.log(response.data);
      // 여기서 적절한 회원가입 성공 후 처리를 추가하세요 (예: 로그인 페이지로 이동)
      navigate('/login');
    } catch (error) {
      setError('회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>회원가입</h2>
        <form onSubmit={handleSignup}>
          <div>
            <input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p>{error}</p>}
          <button type="submit" class="signup-button">회원가입</button>
        </form>
        <p>이미 회원이신가요? <Link to="/login">로그인</Link></p>
      </div>
    </div>
  );
}

export default Signup;