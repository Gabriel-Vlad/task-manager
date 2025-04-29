import prisma from "../index";
import { BadRequest } from "../errors";
import type { User, Task } from "../types/userTypes";
import bcrypt from "bcrypt";
import validator from "validator";

const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 4;

export const registerUserPrisma = async (props: Partial<User>): Promise<User> => {
  const { name, email, password } = props;

  if (!name || !email || !password) {
    throw new BadRequest("Missing required fields");
  }

  if (!validator.isEmail(email)) {
    throw new BadRequest("Email is invalid");
  }

  if (name.length < MIN_NAME_LENGTH) {
    throw new BadRequest(`Name must be at least ${MIN_NAME_LENGTH} characters long`);
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new BadRequest(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
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

  return user;
};

export const loginUserPrisma = async (userId: string, props: Partial<User>): Promise<void> => {
  return;
};

export const getAllUsersPrisma = async (): Promise<User[]> => {
  const users = await prisma.user.findMany({});
  return users;
};
