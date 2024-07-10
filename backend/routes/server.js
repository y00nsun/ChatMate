const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5001;
const AI_API_URL = 'https://api.openai.com/v1/chat/completions';

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/chatdb', { useNewUrlParser: true, useUnifiedTopology: true });

const chatSchema = new mongoose.Schema({
  role: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);

app.post('/api/getResponse', async (req, res) => {
  const userMessage = req.body.message;

  // 사용자 메시지를 데이터베이스에 저장
  const userChat = new Chat({ role: 'user', content: userMessage });
  await userChat.save();
  console.log('User message saved:', userChat);

  try {
    const response = await axios.post(AI_API_URL, {
      model: 'gpt-3.5-turbo', // 모델 이름 확인 및 변경
      messages: [{ role: 'user', content: userMessage }]
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
    });

    const aiResponse = response.data.choices[0].message.content;

    // AI 응답을 데이터베이스에 저장
    const aiChat = new Chat({ role: 'ai', content: aiResponse });
    await aiChat.save();
    console.log('AI message saved:', aiChat);

    res.json({ response: aiResponse });

  } catch (error) {
    console.error('Error fetching AI response:', error.response?.data || error.message);
    res.status(500).json({ response: 'AI 응답을 가져오는 데 문제가 발생했습니다.' });
  }
});

// 채팅 기록 불러오기
app.get('/api/chatHistory', async (req, res) => {
  try {
    const chatHistory = await Chat.find().sort({ timestamp: 1 });
    res.json(chatHistory);
  } catch (error) {
    console.error('Error fetching chat history:', error.message);
    res.status(500).json({ response: '채팅 기록을 가져오는 데 문제가 발생했습니다.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(bodyParser.json());

// MongoDB 연결 설정
mongoose.connect('mongodb://localhost:27017/chatmate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// User 스키마 및 모델 정의
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// 로그인 엔드포인트
app.post('/api/login', async (req, res) => {
  const { id, password } = req.body;
  try {
    const user = await User.findOne({ id });
    if (user && user.password === password) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid ID or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 사용자 등록 엔드포인트
app.post('/api/register', async (req, res) => {
  const { id, password } = req.body;
  try {
    const newUser = new User({ id, password });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user' });
  }
});