const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  const { content, sender } = req.body;

  try {
    const message = new Message({ content, sender });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fetchChatHistory = async (req, res) => {
  try {
    const messages = await Message.find().populate('sender', 'username');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};