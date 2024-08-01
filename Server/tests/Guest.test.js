import request from 'supertest';
import express from 'express';
import guestRouter from '../routes/GuestRoute.js';
import {
    LogInGuestController,
    RoomStatusController,
    requestOTP,
    getGuestDetailsController,
    CheckOutGuestController
  } from '../controllers/GuestController.js';

const app = express();
app.use('/guest', guestRouter);

jest.mock('../controllers/GuestController.js', () => ({
  LogInGuestController: jest.fn(),
  RoomStatusController: jest.fn(),
  requestOTP: jest.fn(),
  getGuestDetailsController: jest.fn(),
  CheckOutGuestController: jest.fn()
}));



describe('Guest Route Tests', () => {
  it('should log in guest', async () => {
    LogInGuestController.mockResolvedValue({ success: true });
    const res = await request(app).post('/guest/guestlogin').send({ username: 'guest', password: 'guest' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should get room status', async () => {
    RoomStatusController.mockResolvedValue({ status: 'clean' });
    const res = await request(app).post('/guest/roomstatus').send({ roomNumber: '101' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'clean');
  });

  it('should get guest details', async () => {
    getGuestDetailsController.mockResolvedValue({ name: 'John Doe' });
    const res = await request(app).post('/guest/getGuestDetails').send({ guestId: '1' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'John Doe');
  });

  it('should request OTP', async () => {
    requestOTP.mockResolvedValue({ success: true });
    const res = await request(app).post('/guest/resendOTP').send({ guestId: '1' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should check out guest', async () => {
    CheckOutGuestController.mockResolvedValue({ success: true });
    const res = await request(app).post('/guest/checkout').send({ guestId: '1' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });
});
