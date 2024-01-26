import express  from "express";
import { StaffController } from "../controllers/StaffController";

const staffRouter = express.Router();
staffRouter.use(express.json());
staffRouter.post('/staff', async (req, res) => {
    respond(await StaffController(req.body), res);
});
export default staffRouter;