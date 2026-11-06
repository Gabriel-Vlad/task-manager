import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import adminMiddleware from "../middleware/adminMiddleware";
import { getAllUsers, createUsers } from "../controllers/adminControllers";

const adminRouter = express.Router();

// Every admin route requires a logged-in user with the ADMIN role.
adminRouter.use(authMiddleware, adminMiddleware);

adminRouter.route("/users").get(getAllUsers).post(createUsers);

export default adminRouter;
