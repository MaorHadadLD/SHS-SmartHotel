import express from 'express';
import { LogInGuestController } from '../controllers/GuestController.js';
import { respond } from './utils.js';

const guestRouter = express.Router();
guestRouter.use(express.json());

guestRouter.post('/guestlogin', async (req, res) => {
    respond(await LogInGuestController(req.body), res);
});

export default guestRouter;