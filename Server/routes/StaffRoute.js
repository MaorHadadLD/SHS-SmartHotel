import express from 'express';
import { StaffLoginController, availableRooms, updateRoomController,getMealsHotelController,updateMealHotelController,addEmployeeController,deleteEmployeeController  } from '../controllers/StaffController.js';
import { respond } from './utils.js';

const staffRouter = express.Router();
staffRouter.use(express.json());

staffRouter.post('/staff', async (req, res) => {
    respond(await StaffLoginController(req.body), res);
});

staffRouter.post('/availableRooms', async (req, res) => {
    respond(await availableRooms(req.body), res);
});

staffRouter.put('/updateRoomStatusAndGuestRoom', async (req, res) => {
    respond(await updateRoomController(req.body), res);
});

staffRouter.post('/getMealsHotel', async (req, res) => {
    respond(await getMealsHotelController(req.body), res);
});

staffRouter.put('/updateMealHotel', async (req, res) => {
    // console.log("updateMealHotel", req.body);
    respond(await updateMealHotelController(req.body), res);
});

staffRouter.post('/addEmployee', async (req, res) => {
    respond(await addEmployeeController(req.body), res);
}
);
staffRouter.post('/deleteEmployee', async (req, res) => {
    console.log("deleteEmployee", req.body);
    respond(await deleteEmployeeController(req.body), res);
}
);

export default staffRouter;
