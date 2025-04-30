import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import type { User } from "../generated/prisma";
import { registerUserPrisma, loginUserPrisma } from "../services/userServices";
import generateJWT from "../utils/generate-jwt";
import cookieOptions from "../utils/cookie-options";

export const register = async (req: Request, res: Response): Promise<void> => {
  const user: User = await registerUserPrisma({ ...req.body });

  const token: string = generateJWT(user);
  console.log(token);

  res
    .cookie("token", token, cookieOptions)
    .status(StatusCodes.CREATED)
    .json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const user: User = await loginUserPrisma({ ...req.body });

  const token: string = generateJWT(user);

  console.log("User logged in");

  res.cookie("token", token, cookieOptions).status(StatusCodes.OK).json({ user });
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res
    .clearCookie("token", cookieOptions)
    .status(StatusCodes.OK)
    .json({ msg: "Successfully logged out" });
};
