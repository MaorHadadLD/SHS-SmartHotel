const express = require('express');
const router = express.Router();
const chatController = require('../controllers/ChatController');

router.get('/:roomNumber', chatController.getMessages);
router.post('/:roomNumber', chatController.sendMessage);

module.exports = router;
