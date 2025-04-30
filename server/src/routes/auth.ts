import express from "express";
import { register, login } from "../controllers/userControllers";

const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);

export default authRouter;
