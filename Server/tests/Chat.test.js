import request from 'supertest';
import express from 'express';
import chatRouter from '../routes/ChatRoute.js';
import { getMessages, sendMessage, getActiveChats } from '../controllers/ChatController.js';

jest.mock('../controllers/ChatController.js');

const app = express();
app.use(express.json());
app.use('/chat', chatRouter);

describe('Chat Route Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch active chats', async () => {
    getActiveChats.mockResolvedValue({ success: true, chats: [] });
    const res = await request(app).get('/chat/active');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('chats');
  }, 15000);

  it('should fetch messages for a specific room', async () => {
    getMessages.mockResolvedValue({ success: true, messages: [] });
    const res = await request(app).get('/chat/hotel1/101');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('messages');
  }, 15000);

  it('should send a message to a specific room', async () => {
    sendMessage.mockResolvedValue({ success: true });
    const res = await request(app).post('/chat/hotel1/101').send({ message: 'Hello' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  }, 15000);
});
