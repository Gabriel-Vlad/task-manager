import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { Unauthenticated } from "../errors";

const adminMiddleware = async (req: Request, response: Response, next: NextFunction) => {
  const token = req.headers.cookie;

  if (!token) {
    throw new Unauthenticated("Authentication Invalid");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    throw new Unauthenticated("Authentication Invalid");
  }
};
