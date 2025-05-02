import express from "express";
import { createTask, deleteTask, getAllTasks, updateTask } from "../controllers/tasksControllers";
import authMiddleware from "../middleware/authMiddleware";

const tasksRouter = express.Router();

tasksRouter.route("/:id").all(authMiddleware).post(createTask).patch(updateTask).delete(deleteTask);
tasksRouter.route("/").all(authMiddleware).get(getAllTasks);

export default tasksRouter;
