import express from 'express';
import { postRoomRequestController, getRequestsByDepartmentController, postRequestController, updateRequestController, deleteRequestController} from '../controllers/RequestController.js';
import { respond } from './utils.js';

const requestRouter = express.Router();
requestRouter.use(express.json());



requestRouter.post('/request/guestroom', async (req, res) => {
    respond(await postRoomRequestController(req.body), res);
});

requestRouter.post('/request/get', async (req, res) => {
    respond(await getRequestsByDepartmentController(req.body), res);
});

requestRouter.post('/request/post', async (req, res) => {
    respond(await postRequestController(req.body), res);
});

requestRouter.put('/request/update', async (req, res) => {
    respond(await updateRequestController(req.body), res);
});

requestRouter.put('/request/delete', async (req, res) => {
    console.log("requestRouter.delete", req.body);
    respond(await deleteRequestController(req.body), res);
});
export default requestRouter;