import express from 'express';
import * as chatController from '../controllers/chat.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/', protect, chatController.getOrCreateConversation);
router.get('/', protect, chatController.getUserConversations);
router.post('/:conversationId/messages', protect, chatController.sendMessage);
router.get('/:conversationId/messages', protect, chatController.getConversationMessages);
router.patch('/:conversationId/read', protect, chatController.markMessagesAsRead);

export default router;
