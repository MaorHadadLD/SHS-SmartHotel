import express from 'express';
import { 
    checkStatusReqController,
    postRoomRequestController, 
    getRequestsByDepartmentController, 
    postRequestController, 
    updateRequestController, 
    deleteRequestController, 
    getRequestsByRoomNumberController,
    getTablesHotelController,
    updateTableStatusController,
    deleteDiningTableController
} from '../controllers/RequestController.js';
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
    respond(await deleteRequestController(req.body), res);
});

requestRouter.post('/request/getallbyroomnumber', async (req, res) => {
    // console.log("requestRouter.getallbyroomnumber", req.body);
    respond(await getRequestsByRoomNumberController(req.body), res);
});

requestRouter.post('/request/status', async (req, res) => {
    // console.log("requestRouter.checkstatus", req.body);
    respond(await checkStatusReqController(req.body), res);

});
requestRouter.post('/request/gettabeleshotel', async (req, res) => {
    // console.log("requestRouter.gettabeleshotel", req.body);
    respond(await getTablesHotelController(req.body), res);
});
requestRouter.post('/request/updatetables', async (req, res) => {
    // console.log("requestRouter.getallbyroomnumber", req.body);
    respond(await updateTableStatusController(req.body), res);
});

requestRouter.put('/request/deletediningtable',async (req, res) => {
    respond(await deleteDiningTableController(req.body), res);
});

export default requestRouter;