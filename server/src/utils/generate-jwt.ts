import jwt, { SignOptions } from "jsonwebtoken";
import type { User } from "../generated/prisma";
const generateJWT = (user: User) => {
  const { id, name, email } = user;

  const userData: Partial<User> = {
    id,
    name,
    email,
  };

  const secret = process.env.JWT_SECRET as string;
  const lifetime = process.env.JWT_LIFETIME as string;

  const options = {
    expiresIn: lifetime,
    algorithm: "HS256",
  } as SignOptions;

  const token = jwt.sign(userData, secret!, options);
  return token;
};
export default generateJWT;
