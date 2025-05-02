import { StatusCodes } from "http-status-codes";
import type { Request, Response } from "express";
import { getAllTasksPrisma, createTaskPrisma, updateTaskPrisma, deleteTaskPrisma } from "../services/tasksServices";
import { Task } from "../generated/prisma";

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.params;
  const tasks: Task[] = await getAllTasksPrisma(userId);
  res.status(StatusCodes.OK).json({ tasks });
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.user!;
  const createdTask: Task = await createTaskPrisma(userId, { ...req.body });
  res.status(StatusCodes.CREATED).json({ createdTask });
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.user!;
  const { id: taskId } = req.params;
  const updatedTask: Task = await updateTaskPrisma({ userId, taskId }, { ...req.body });
  res.status(StatusCodes.OK).json({ updatedTask });
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { id: userId } = req.user!;
  const { id: taskId } = req.params;
  const deletedTask: Task = await deleteTaskPrisma({ userId, taskId });
  res.status(StatusCodes.OK).json({ deletedTask });
};
