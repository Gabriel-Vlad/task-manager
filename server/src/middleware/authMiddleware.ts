import type { Request, Response, NextFunction } from "express";
import { Unauthenticated } from "../errors";
import jwt, { JwtPayload } from "jsonwebtoken";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    throw new Unauthenticated("User is not logged in");
  }

  let payload: JwtPayload | string;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!, { algorithms: ["HS256"] });
  } catch {
    throw new Unauthenticated("Invalid token");
  }

  if (typeof payload === "string" || !payload.id) {
    throw new Unauthenticated("Invalid token");
  }

  req.user = {
    id: payload.id,
    name: payload.name,
  };

  next();
};

export default authMiddleware;
