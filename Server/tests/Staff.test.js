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
  deleteEmployeeController: jest.fn()
}));

import {
  StaffLoginController,
  availableRooms,
  updateRoomController,
  getMealsHotelController,
  updateMealHotelController,
  addEmployeeController,
  deleteEmployeeController
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
    const res = await request(app).post('/staff/availableRooms').send({});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('rooms');
  });

  it('should update room status', async () => {
    updateRoomController.mockResolvedValue({ success: true });
    const res = await request(app).put('/staff/updateRoomStatusAndGuestRoom').send({ roomNumber: '101' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should get meals for hotel', async () => {
    getMealsHotelController.mockResolvedValue({ meals: ['meal1', 'meal2'] });
    const res = await request(app).post('/staff/getMealsHotel').send({});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('meals');
  });

  it('should update meal for hotel', async () => {
    updateMealHotelController.mockResolvedValue({ success: true });
    const res = await request(app).put('/staff/updateMealHotel').send({ meal: 'new meal' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should add employee', async () => {
    addEmployeeController.mockResolvedValue({ success: true });
    const res = await request(app).post('/staff/addEmployee').send({ name: 'John Doe' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should delete employee', async () => {
    deleteEmployeeController.mockResolvedValue({ success: true });
    const res = await request(app).post('/staff/deleteEmployee').send({ id: '123' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });
});
