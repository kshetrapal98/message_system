 
 const express = require('express');
 const mongoose = require('mongoose');
 const cors = require('cors');
 const http = require('http');
 const connectDB = require('./src/config/db');
 const initializeSocket = require('./src/config/socket');
 const authRoutes = require('./src/routes/authRoutes');
 const chatRoutes = require('./src/routes/chatRoutes');
 
 const app = express();
 const server = http.createServer(app);
 
 // Middleware
 app.use(cors());
 app.use(express.json());
 
 // Routes
 app.use('/api/auth', authRoutes);
 app.use('/api/chat', chatRoutes);
 
 
 // Connect to MongoDB
 connectDB();
 
 // Initialize Socket.io
 initializeSocket(server);
 
 // Start server
 const PORT = process.env.PORT || 5500;
 server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
 });