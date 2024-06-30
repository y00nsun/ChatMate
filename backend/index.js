import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import chatRouter from './routes/chat.js';

config();

const app = express();
const port = process.env.PORT || 3001;

// CORS 설정
app.use(cors({
  origin: 'http://localhost:3000' // 프론트엔드 주소
}));

app.use(bodyParser.json());

app.use('/api/chat', chatRouter);

// 기본 루트 경로 핸들러
app.get('/', (req, res) => {
  res.send('ChatMate backend server is running !!');
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});