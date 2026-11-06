import { JwtPayload } from "jsonwebtoken";
import type { User } from "../generated/prisma";

export type SafeUser = Omit<User, "password">;

export interface UniqueTaskId {
  userId: string;
  taskId: string;
}

export interface JWTUserPayload extends JwtPayload {
  id: string;
  name: string;
}
