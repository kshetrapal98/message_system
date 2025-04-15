const express = require('express');
const { sendMessage, fetchChatHistory } = require('../controllers/chatController');

const router = express.Router();

router.post('/messages', sendMessage);
router.get('/messages', fetchChatHistory);

module.exports = router;