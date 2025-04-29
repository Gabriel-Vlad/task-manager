import prisma from "../index";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import type { User } from "../types/userTypes";
import { registerUserPrisma, getAllUsersPrisma, loginUserPrisma } from "../services/userServices";
import generateJWT from "../utils/generate-jwt";

export const register = async (req: Request, res: Response): Promise<void> => {
  const user: User = await registerUserPrisma({ ...req.body });

  const token: string = generateJWT(user);

  res
    .cookie("token", token, {
      httpOnly: true,
    })
    .status(StatusCodes.CREATED)
    .json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
};

// export const login = async (req: Request, res: Response): Promise<void> => {
//   const { id: userId } = req.params;
//   const user: User = await loginUserPrisma(userId);

//   const token: string = generateJWT(user);

//   res
//     .cookie("token", token, {
//       httpOnly: true,
//     })
//     .status(StatusCodes.OK)
//     .json({
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//       },
//     });
// };

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const users: User[] = await getAllUsersPrisma();
  res.status(StatusCodes.OK).json({ users });
};
