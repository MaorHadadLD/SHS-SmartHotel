import express from 'express';
import { LogInGuestController, RoomStatusController } from '../controllers/GuestController.js';
import { respond } from './utils.js';
import { getGuestDetailsController } from '../controllers/GuestController.js';

const guestRouter = express.Router();
guestRouter.use(express.json());

guestRouter.post('/guestlogin', async (req, res) => {
    respond(await LogInGuestController(req.body), res);
});

guestRouter.post('/roomstatus', async (req, res) => {
    respond(await RoomStatusController(req.body), res);
});

guestRouter.post('/getGuestDetails', async (req, res) => {
    respond(await getGuestDetailsController(req.body), res);
});

export default guestRouter;