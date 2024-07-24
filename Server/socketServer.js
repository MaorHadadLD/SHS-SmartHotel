import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import chatRouter from './routes/ChatRoute.js';
import app from './firebaseConfig.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use('/chats', chatRouter);

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('joinRoom', (hotel, room) => {
    socket.join(hotel, room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('chatMessage', (msg) => {
    io.to(msg.room, msg.hotel).emit('message', msg);
    console.log('message:', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3002, () => {
  console.log('Server is running on port 3002');
});
