import prisma from "../index";
import { BadRequest, NotFound, Unauthenticated } from "../errors";
import type { User } from "../generated/prisma";
import comparePasswords from "../utils/compare-passwords";
import bcrypt from "bcrypt";
import { verifyEmail, verifyName, verifyPassword } from "../utils/verify-input";

export const registerUserPrisma = async (props: Partial<User>): Promise<User> => {
  const { name, email, password } = props;

  if (!name || !email || !password) {
    throw new BadRequest("Missing required fields");
  }

  verifyEmail(email);
  verifyName(name);
  verifyPassword(password);

  const userFromPrisma: User | null = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userFromPrisma) {
    throw new BadRequest("User already exists");
  }

  const salt: string = await bcrypt.genSalt(10);
  const newPassword: string = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: newPassword,
    },
  });
  console.log(user);

  return user;
};

export const loginUserPrisma = async (props: Partial<User>): Promise<User> => {
  const { name, email, password } = props;

  if (!name || !email || !password) {
    throw new BadRequest("Missing required fields");
  }

  const user: User | null = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new NotFound("No user has been found");
  }

  const isMatch = await comparePasswords(user.password, password);

  if (!isMatch) {
    throw new Unauthenticated("Invalid Credentials");
  }

  return user;
};
