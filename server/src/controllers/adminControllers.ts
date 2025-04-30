import { StatusCodes } from "http-status-codes";
import type { User } from "../generated/prisma";
import { getAllUsersPrisma, createUsersPrisma } from "../services/adminServices";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const users: User[] = await getAllUsersPrisma();
  res.status(StatusCodes.OK).json({ users });
};

export const createUsers = async (req: Request, res: Response): Promise<void> => {
  const users: User[] = await createUsersPrisma([...req.body]);
  res.status(StatusCodes.OK).json({ users });
};
