import express from 'express';
import { postRequestController} from '../controllers/RequestController.js';
import { respond } from './utils.js';

const requestRouter = express.Router();
requestRouter.use(express.json());



requestRouter.post('/request/guestroom', async (req, res) => {
    console.log("guestRouter", req.body.guest, req.body.hotel);
    respond(await postRequestController(req.body), res);
});

export default requestRouter;