const socketIo = require('socket.io');
const { generateAIResponse } = require('../controllers/aiController');

const initializeSocket = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('sendMessage', (message) => {
      io.emit('receiveMessage', message);

      // Simulate AI response
      const aiResponse = generateAIResponse();
      setTimeout(() => {
        io.emit('receiveMessage', { sender: 'AI', content: aiResponse });
      }, 1000);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};

module.exports = initializeSocket;