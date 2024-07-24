import express from 'express';
import { getMessages, sendMessage, getActiveChats } from '../controllers/ChatController.js';

const router = express.Router();

router.get('/active', getActiveChats);
router.get('/:hotel/:roomNumber', getMessages);
router.post('/:hotel/:roomNumber', sendMessage);

export default router;
