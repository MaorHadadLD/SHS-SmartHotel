import express from 'express';
import { StaffLoginController, avialableRooms } from '../controllers/StaffController.js';
import { respond } from './utils.js';

const staffRouter = express.Router();
staffRouter.use(express.json());

staffRouter.post('/staff', async (req, res) => {
    respond(await StaffLoginController(req.body), res);
});

staffRouter.post('/availableRooms', async (req, res) => {
    respond(await avialableRooms(req.body), res);
});

export default staffRouter;
