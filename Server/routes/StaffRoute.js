import express from 'express';
import { StaffLoginController, availableRooms, updateRoomController,getMealsHotelController } from '../controllers/StaffController.js';
import { respond } from './utils.js';

const staffRouter = express.Router();
staffRouter.use(express.json());

staffRouter.post('/staff', async (req, res) => {
    respond(await StaffLoginController(req.body), res);
});

staffRouter.post('/availableRooms', async (req, res) => {
    respond(await availableRooms(req.body), res);
});

staffRouter.put('/updateRoomStatusAndGuestRoom', async (req, res) => {
    respond(await updateRoomController(req.body), res);
});

staffRouter.post('/getMealsHotel', async (req, res) => {
    respond(await getMealsHotelController(req.body), res);
});

export default staffRouter;
