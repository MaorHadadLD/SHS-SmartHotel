import express from 'express';
import { postRoomRequestController} from '../controllers/RequestController.js';
import { respond } from './utils.js';

const requestRouter = express.Router();
requestRouter.use(express.json());



requestRouter.post('/request/guestroom', async (req, res) => {
    respond(await postRoomRequestController(req.body), res);
});

export default requestRouter;