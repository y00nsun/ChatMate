import { Router } from 'express';

const router = Router();

// POST /api/chat/messages
router.post('/messages', (req, res) => {
  try {
    const userMessage = req.body.message;

    // 메시지 처리 로직(AI 응답 생성)
    const botResponse = generateBotResponse(userMessage);

    res.json({ response: botResponse });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function generateBotResponse(message) {
  // AI 응답 생성 로직
  // 여기에 실제로는 AI 모델과의 통합 등 복잡한 로직이 들어갈 수 있음
  return `You said: ${message}`;
}

export default router;