import axios from "axios";
import type { IUser } from "../types/globalTypes";

const url = "http://localhost:3000/api/v1";

export const createUser = async (userCredentials: IUser) => {
  const response = await axios.post(
    `${url}/auth/register`,
    { ...userCredentials },
    {
      withCredentials: true,
    },
  );

  console.log(response);

  const { id, name } = response.data.user;
  return {
    id,
    name,
  };
};

export const verifyUserInfo = async (userCredential: IUser) => {
  const response = await axios.post(
    `${url}/auth/login`,
    { ...userCredential },
    {
      withCredentials: true,
    },
  );
  console.log(response);

  const { id, name } = response.data.user;
  return {
    id,
    name,
  };
};

export const logoutUser = async () => {
  await axios.post(
    `${url}/auth/logout`,
    {},
    {
      withCredentials: true,
    },
  );
  return;
};
