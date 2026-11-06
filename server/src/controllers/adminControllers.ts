import { StatusCodes } from "http-status-codes";
import type { SafeUser } from "../types/userTypes";
import { getAllUsersPrisma, createUsersPrisma } from "../services/adminServices";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const users: SafeUser[] = await getAllUsersPrisma();
  res.status(StatusCodes.OK).json({ users });
};

export const createUsers = async (req: Request, res: Response): Promise<void> => {
  const users: SafeUser[] = await createUsersPrisma(req.body);
  res.status(StatusCodes.OK).json({ users });
};
