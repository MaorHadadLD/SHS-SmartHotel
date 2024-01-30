import express from 'express';
import { LogInGuestController, RoomStatusController } from '../controllers/GuestController.js';
import { respond } from './utils.js';

const guestRouter = express.Router();
guestRouter.use(express.json());

guestRouter.post('/guestlogin', async (req, res) => {
    respond(await LogInGuestController(req.body), res);
});

guestRouter.post('/roomstatus', async (req, res) => {
    respond(await RoomStatusController(req.body), res);
});

export default guestRouter;