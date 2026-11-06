import prisma from "../index";
import type { User, Prisma } from "../generated/prisma";
import { verifyEmail, verifyName, verifyPassword } from "../utils/verify-input";
import hashInput from "../utils/hash-input";
import { BadRequest } from "../errors";
import type { SafeUser } from "../types/userTypes";

export const getAllUsersPrisma = async (): Promise<SafeUser[]> => {
  const users: SafeUser[] = await prisma.user.findMany({
    include: {
      tasks: true,
    },
  });
  return users;
};

// export const getFilteredUsersPrisma = async (props: Partial<User>): Promise<User[]> => {
//   const { id, name, email, createdAt, role } = props;
// };

export const createUsersPrisma = async (props: Partial<User>[]): Promise<SafeUser[]> => {
  if (!Array.isArray(props) || props.length === 0) {
    throw new BadRequest("Request body must be a non-empty array of users");
  }

  const data: Prisma.UserCreateManyInput[] = await Promise.all(
    props.map(async (prop, index) => {
      const { name, email, password } = prop;
      verifyEmail(email, index);
      verifyName(name, index);
      verifyPassword(password, index);

      const newPassword = await hashInput(password!);

      const newUser = {
        name: name as string,
        email: email as string,
        password: newPassword as string,
      };

      return newUser;
    }),
  );

  const users: SafeUser[] = await prisma.user.createManyAndReturn({
    data,
    skipDuplicates: true,
  });

  return users;
};
