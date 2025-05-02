import { JWTUserPayload } from "./userTypes";

declare global {
  namespace Express {
    interface Request {
      user?: JWTUserPayload;
    }
  }
}
