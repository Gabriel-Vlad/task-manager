import jwt, { SignOptions } from "jsonwebtoken";
import type { User } from "../types/userTypes";

const generateJWT = (user: User) => {
  const secret = process.env.JWT_SECRET as string;
  const lifetime = process.env.JWT_LIFETIME as string;

  const options = {
    expiresIn: lifetime,
    algorithm: "HS256",
  } as SignOptions;

  const token = jwt.sign(user, secret!, options);
  return token;
};
export default generateJWT;
