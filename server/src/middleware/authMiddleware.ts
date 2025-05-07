import type { Request, Response, NextFunction } from "express";
import { Unauthenticated } from "../errors";
import jwt, { JwtPayload } from "jsonwebtoken";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    throw new Unauthenticated("User is not logged in");
  }
  // console.log(token);

  const payload: JwtPayload | string = jwt.verify(token, process.env.JWT_SECRET!);

  if (typeof payload === "string") {
    throw new Unauthenticated("Invalid token");
  }

  req.user = {
    id: payload.id,
    name: payload.name,
  };

  // console.log(payload);

  next();
};

export default authMiddleware;
