import prisma from "../index";
import { BadRequest, NotFound, Unauthenticated } from "../errors";
import type { User } from "../generated/prisma";
import comparePasswords from "../utils/compare-passwords";
import { verifyEmail, verifyName, verifyPassword } from "../utils/verify-input";
import hashInput from "../utils/hash-input";

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

  const newPassword: string = await hashInput(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: newPassword,
    },
  });

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
