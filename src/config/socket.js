// const socketIo = require('socket.io');
// const { generateAIResponse } = require('../controllers/aiController');

// const initializeSocket = (server) => {
//   const io = socketIo(server);

//   io.on('connection', (socket) => {
//     console.log('A user connected');

//     socket.on('sendMessage', (message) => {
//       io.emit('receiveMessage', message);

//       // Simulate AI response
//       const aiResponse = generateAIResponse();
//       setTimeout(() => {
//         io.emit('receiveMessage', { sender: 'AI', content: aiResponse });
//       }, 1000);
//     });

//     socket.on('disconnect', () => {
//       console.log('A user disconnected');
//     });
//   });
// };

// module.exports = initializeSocket;

const socketIo = require("socket.io");
const { generateAIResponse } = require("../controllers/aiController");

const initializeSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ A user connected:", socket.id);

    socket.on("chat message", (message) => {
      const aiResponse = generateAIResponse(message);

      const currentConversation = {
        userMessage: message,
        botReply:"hello from backend"
      };

      socket.emit("bot reply", currentConversation);
    });

    socket.on("disconnect", () => {
      console.log("❌ A user disconnected:", socket.id);
    });
  });
};

module.exports = initializeSocket;
