import prisma from "../index";
import { BadRequest, Unauthenticated } from "../errors";
import type { User } from "../generated/prisma";
import comparePasswords from "../utils/compare-passwords";
import { verifyEmail, verifyName, verifyPassword } from "../utils/verify-input";
import hashInput from "../utils/hash-input";
import type { SafeUser } from "../types/userTypes";

export const registerUserPrisma = async (props: Partial<User>): Promise<SafeUser> => {
  const { name, email, password } = props;

  if (!name || !email || !password) {
    throw new BadRequest("Missing required fields");
  }

  verifyEmail(email);
  verifyName(name);
  verifyPassword(password);

  const userFromPrisma = await prisma.user.findUnique({
    where: {
      email,
    },
    select: { id: true },
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

export const loginUserPrisma = async (props: Partial<User>): Promise<SafeUser> => {
  const { name, email, password } = props;

  if (!name || !email || !password) {
    throw new BadRequest("Missing required fields");
  }

  // The only query that needs the password hash, so it opts back in explicitly.
  const user: User | null = await prisma.user.findUnique({
    where: {
      email,
    },
    omit: { password: false },
  });

  // Same response for "no such user" and "wrong password" so emails can't be enumerated.
  if (!user || !(await comparePasswords(user.password, password))) {
    throw new Unauthenticated("Invalid Credentials");
  }

  const { password: _password, ...safeUser } = user;
  return safeUser;
};
