import express from 'express';
import { StaffLoginController } from '../controllers/StaffController.js';

const staffRouter = express.Router();
staffRouter.use(express.json());

staffRouter.post('/staff', async (req, res) => {
    console.log("staffRouter", req.body);
    respond(await StaffLoginController(req.body), res);
});

export default staffRouter;
