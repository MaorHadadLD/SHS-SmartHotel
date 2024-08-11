import request from 'supertest';
import express from 'express';
import staffRouter from '../routes/StaffRoute.js';

const app = express();
app.use('/staff', staffRouter);

jest.mock('../controllers/StaffController.js', () => ({
  StaffLoginController: jest.fn(),
  availableRooms: jest.fn(),
  updateRoomController: jest.fn(),
  getMealsHotelController: jest.fn(),
  updateMealHotelController: jest.fn(),
  addEmployeeController: jest.fn(),
  deleteEmployeeController: jest.fn(),
  getFeedBackController: jest.fn()
}));

import {
  StaffLoginController,
  availableRooms,
  updateRoomController,
  getMealsHotelController,
  updateMealHotelController,
  addEmployeeController,
  deleteEmployeeController,
  getFeedBackController
} from '../controllers/StaffController.js';

describe('Staff Route Tests', () => {
  it('should login staff', async () => {
    StaffLoginController.mockResolvedValue({ success: true });
    const res = await request(app).post('/staff/staff').send({ username: 'test', password: 'test' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should fetch available rooms', async () => {
    availableRooms.mockResolvedValue({ rooms: ['101', '102'] });
    const res = await request(app).post('/staff/availableRooms').send({ hotelName: 'Test Hotel' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('rooms', ['101', '102']);
  });

  it('should update room status', async () => {
    updateRoomController.mockResolvedValue({ success: true });
    const res = await request(app).put('/staff/updateRoomStatusAndGuestRoom').send({ roomNumber: '101', status: 'clean', guestEmail: 'guest@example.com', hotel: { hotelName: 'Test Hotel', city: 'Test City' } });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should get meals for hotel', async () => {
    getMealsHotelController.mockResolvedValue({ meals: ['meal1', 'meal2'] });
    const res = await request(app).post('/staff/getMealsHotel').send({ hotel: { hotelName: 'Test Hotel', city: 'Test City' } });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('meals', ['meal1', 'meal2']);
  });

  it('should update meal for hotel', async () => {
    updateMealHotelController.mockResolvedValue({ success: true });
    const res = await request(app).put('/staff/updateMealHotel').send({ hotel: { hotelName: 'Test Hotel', city: 'Test City' }, meals: ['new meal'] });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should add employee', async () => {
    addEmployeeController.mockResolvedValue({ success: true });
    const res = await request(app).post('/staff/addEmployee').send({ employeeNumber: '123', name: 'John Doe' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should delete employee', async () => {
    deleteEmployeeController.mockResolvedValue({ success: true });
    const res = await request(app).post('/staff/deleteEmployee').send({ employeeNumber: '123' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should fetch feedback for hotel', async () => {
    getFeedBackController.mockResolvedValue({ feedbacks: ['feedback1', 'feedback2'] });
    const res = await request(app).post('/staff/fetchFeedbackForHotel').send({ hotelName: 'Test Hotel', city: 'Test City' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('feedbacks', ['feedback1', 'feedback2']);
  });
});
