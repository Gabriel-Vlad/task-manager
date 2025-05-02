import { JwtPayload } from "jsonwebtoken";

export interface UniqueTaskId {
  userId: string;
  taskId: string;
}

export interface JWTUserPayload extends JwtPayload {
  id: string;
  name: string;
}
