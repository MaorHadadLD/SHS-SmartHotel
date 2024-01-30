import express from 'express';
import { StaffLoginController } from '../controllers/StaffController.js';
import { respond } from './utils.js';

const staffRouter = express.Router();
staffRouter.use(express.json());

staffRouter.post('/staff', async (req, res) => {
    respond(await StaffLoginController(req.body), res);
});

export default staffRouter;
