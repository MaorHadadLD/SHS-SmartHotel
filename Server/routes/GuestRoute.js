import express from 'express';
import { LogInGuestController } from '../controllers/GuestController.js';
import { respond } from './utils.js';

const guestRouter = express.Router();
guestRouter.use(express.json());

guestRouter.post('/guestlogin', async (req, res) => {
    console.log("guestRouter", req.body.email, req.body.password);
    console.log("guestRouter", req.body);
    respond(await LogInGuestController(req.body), res);
});

export default guestRouter;