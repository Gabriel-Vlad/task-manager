import express from "express";
const adminRouter = express.Router();

import { getAllUsers, createUsers } from "../controllers/adminControllers";

adminRouter.route("/users").get(getAllUsers).post(createUsers);

export default adminRouter;
