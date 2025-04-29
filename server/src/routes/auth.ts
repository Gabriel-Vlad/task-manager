import express from "express";
import { register, getAllUsers } from "../controllers/userControllers";

const authRouter = express.Router();

authRouter.route("/register").post(register).get(getAllUsers);

export default authRouter;
