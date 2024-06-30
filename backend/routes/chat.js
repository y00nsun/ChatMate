const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const userMessage = req.body.message;
  const botResponse = generateBotResponse(userMessage);
  res.json({ response: botResponse });
});

function generateBotResponse(message) {
  // 간단한 응답 생성 로직 (AI 모델로 대체 가능)
  return `You said: ${message}`;
}

module.exports = router;