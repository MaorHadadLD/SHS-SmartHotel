import request from 'supertest';
import express from 'express';
import requestRouter from '../routes/RequestRoute.js';
import {
  postRoomRequestController,
  getRequestsByDepartmentController,
  postRequestController,
  updateRequestController,
  deleteRequestController,
  getRequestsByRoomNumberController,
  checkStatusReqController,
  getTablesHotelController,
  updateTableStatusController,
  deleteDiningTableController
} from '../controllers/RequestController.js';

jest.mock('../controllers/RequestController.js');

const app = express();
app.use(express.json());
app.use('/', requestRouter);

describe('Request Route Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should post room request', async () => {
    postRoomRequestController.mockResolvedValue({ success: true });
    const res = await request(app).post('/request/guestroom').send({ roomNumber: '101' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should get requests by department', async () => {
    getRequestsByDepartmentController.mockResolvedValue({ success: true, requests: [] });
    const res = await request(app).post('/request/get').send({ department: 'cleaning' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('requests');
  });

  it('should post a request', async () => {
    postRequestController.mockResolvedValue({ success: true });
    const res = await request(app).post('/request/post').send({ request: 'extra towels' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should update a request', async () => {
    updateRequestController.mockResolvedValue({ success: true });
    const res = await request(app).put('/request/update').send({ requestId: '1', status: 'completed' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should delete a request', async () => {
    deleteRequestController.mockResolvedValue({ success: true });
    const res = await request(app).put('/request/delete').send({ requestId: '1' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should get requests by room number', async () => {
    getRequestsByRoomNumberController.mockResolvedValue({ success: true, requests: [] });
    const res = await request(app).post('/request/getallbyroomnumber').send({ roomNumber: '101' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('requests');
  });

  it('should check request status', async () => {
    checkStatusReqController.mockResolvedValue({ success: true, status: 'pending' });
    const res = await request(app).post('/request/status').send({ requestId: '1' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('status', 'pending');
  });

  it('should get tables for hotel', async () => {
    getTablesHotelController.mockResolvedValue({ success: true, tables: [] });
    const res = await request(app).post('/request/gettabeleshotel').send({});
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('tables');
  });

  it('should update table status', async () => {
    updateTableStatusController.mockResolvedValue({ success: true });
    const res = await request(app).post('/request/updatetables').send({ hotel: { hotelName: "Dan Hotel", city: "Tel Aviv" }, tableId: '1', status: 'occupied' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });

  it('should delete dining table', async () => {
    deleteDiningTableController.mockResolvedValue({ success: true });
    const res = await request(app).put('/request/deletediningtable').send({ tableId: '1' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
  });
}, 10000);
