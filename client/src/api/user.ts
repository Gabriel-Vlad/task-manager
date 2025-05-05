import axios from "axios";
import type { IUser } from "../types/globalTypes";

const url = "http://localhost:3000/api/v1";

export const sendUserInfo = async (userCredentials: IUser) => {
  try {
    const response = await axios.post(
      `${url}/auth/register`,
      { ...userCredentials },
      {
        withCredentials: true,
      },
    );
    console.log(response);
    const { id, name } = response.data;
    return {
      id,
      name,
    };
  } catch (error) {
    console.log(error);
  }
};
