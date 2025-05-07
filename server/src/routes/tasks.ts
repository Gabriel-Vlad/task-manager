import express from "express";
import { createTask, deleteTask, getAllTasks, updateTask } from "../controllers/tasksControllers";
import authMiddleware from "../middleware/authMiddleware";

const tasksRouter = express.Router();

tasksRouter.route("/").all(authMiddleware).patch(updateTask).delete(deleteTask);
tasksRouter.route("/").all(authMiddleware).get(getAllTasks).post(createTask);

export default tasksRouter;
