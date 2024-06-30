import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  const userMessage = req.body.message;
  const botResponse = generateBotResponse(userMessage);
  res.json({ response: botResponse });
});

function generateBotResponse(message) {
  // AI 응답 생성 로직
  return `You said: ${message}`;
}

export default router;