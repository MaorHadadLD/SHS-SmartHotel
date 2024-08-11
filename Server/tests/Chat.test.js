import request from 'supertest';
import express from 'express';
import chatRouter from '../routes/ChatRoute.js';
import * as firebase from 'firebase/database';

// Mock the Firebase functions
jest.mock('firebase/database');

const mockRef = jest.fn();
const mockGet = jest.fn();
const mockSet = jest.fn();

firebase.ref.mockImplementation((db, path) => {
  // Return a mock ref object
  return { toString: () => path };
});

firebase.get.mockImplementation((ref) => mockGet(ref));
firebase.set.mockImplementation((ref, data) => mockSet(ref, data));

// Define mock responses for the Firebase interactions
mockGet.mockImplementation((ref) => {
  const refString = ref.toString();
  
  if (refString.includes('active')) {
    return Promise.resolve({
      val: () => ({
        'West All Suites Hotel_Ashdod': {
          5: {
            lastMessage: "How can I help you?",
            timestamp: "2024-08-11T11:09:16.67Z",
          },
        },
      }),
    });
  }

  if (refString.includes('chats')) {
    return Promise.resolve({
      val: () => ({
        '0460PuTB7OcOCPDbfT': {
          message: 'Hey 😊',
          sender: 'guest',
          timestamp: '2024-08-11T11:05:52.090Z',
        },
        '0470PuTB7OcOCPDbfT': {
          message: 'Hello!',
          sender: 'guest',
          timestamp: '2024-08-11T11:05:55.090Z',
        },
      }),
    });
  }

  return Promise.resolve({
    val: () => null,
  });
});

mockSet.mockResolvedValue(true);

const app = express();
app.use(express.json());
app.use('/chats', chatRouter);

describe('Mocked Firebase Chat Route Tests', () => {
  it('should fetch active chats', async () => {
    const res = await request(app).get('/chats/active');
    expect(res.statusCode).toBe(200);
    // expect(res.body.success).toBe(true);
    
  });

  it('should fetch messages for a specific room', async () => {
    const res = await request(app).get('/chats/West All Suites Hotel_Ashdod/5');
    expect(res.statusCode).toBe(200);
    // expect(res.body.success).toBe(true);
    
  });

  it('should send a message to a specific room', async () => {
    const messageData = { message: 'Hello', sender: 'reception' };
    const res = await request(app).post('/chats/West All Suites Hotel_Ashdod/5').send(messageData);
    expect(res.statusCode).toBe(200);
    // expect(res.body.success).toBe(true);
  });
});
