import express from 'express';
import { getMessages, sendMessage, getActiveChats } from '../controllers/ChatController.js';

const router = express.Router();

router.get('/active', getActiveChats);
router.get('/:roomNumber', getMessages);
router.post('/:roomNumber', sendMessage);

export default router;
