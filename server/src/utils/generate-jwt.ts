import jwt, { SignOptions } from "jsonwebtoken";
import type { JWTUserPayload, SafeUser } from "../types/userTypes";

const generateJWT = (user: Pick<SafeUser, "id" | "name">) => {
  const { id, name } = user;

  const userData: Pick<JWTUserPayload, "id" | "name"> = {
    id,
    name,
  };

  const secret = process.env.JWT_SECRET as string;
  const lifetime = process.env.JWT_LIFETIME as string;

  const jwt_options = {
    expiresIn: lifetime,
    algorithm: "HS256",
  } as SignOptions;

  const token = jwt.sign(userData, secret!, jwt_options);
  return token;
};

export default generateJWT;
