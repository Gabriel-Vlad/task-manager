import axios from "axios";
import type { ITask } from "../types/globalTypes";

const url = "http://localhost:3000/api/v1";

//Promise<Required<ITask>[]>

export const getAllUserTasks = async () => {
  const response = await axios.get(`${url}/tasks`, {
    withCredentials: true,
  });
  console.log(response);
  return response.data.tasks;
};

export const createUserTask = async (props: ITask) => {
  const response = await axios.post(
    `${url}/tasks`,
    { ...props },
    {
      withCredentials: true,
    },
  );
  console.log(response.data);
  return response.data.task;
};

export const deleteUserTask = async (taskId: string) => {
  const response = await axios.delete(`${url}/tasks`, {
    params: { id: taskId },
    withCredentials: true,
  });

  console.log(response);
};
