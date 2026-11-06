import type { Request, Response, NextFunction } from "express";
import prisma from "../index";
import { Forbidden, Unauthenticated } from "../errors";

// Must run after authMiddleware. The role is read from the database (not the JWT)
// so that revoking admin rights takes effect immediately.
const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new Unauthenticated("User is not logged in");
  }

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { role: true },
  });

  if (!user) {
    throw new Unauthenticated("Invalid token");
  }

  if (user.role !== "ADMIN") {
    throw new Forbidden("Admin access required");
  }

  next();
};

export default adminMiddleware;
