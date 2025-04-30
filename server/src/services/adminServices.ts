import prisma from "../index";
import type { User, Prisma } from "../generated/prisma";
import { BadRequest } from "../errors";
import { verifyEmail, verifyName, verifyPassword } from "../utils/verify-input";

export const getAllUsersPrisma = async (): Promise<User[]> => {
  const users: User[] = await prisma.user.findMany({});
  return users;
};

// export const getFilteredUsersPrisma = async (props: Partial<User>): Promise<User[]> => {
//   const { id, name, email, createdAt, role } = props;
// };

export const createUsersPrisma = async (props: Partial<User>[]): Promise<User[]> => {
  const data: Prisma.UserCreateManyInput[] = props.map((prop, index) => {
    const { name, email, password } = prop;
    verifyEmail(email, index);
    verifyName(name, index);
    verifyPassword(password, index);
    return {
      name: name as string,
      email: email as string,
      password: password as string,
    };
  });

  const users: User[] = await prisma.user.createManyAndReturn({
    data,
    skipDuplicates: true,
  });

  return users;
};
