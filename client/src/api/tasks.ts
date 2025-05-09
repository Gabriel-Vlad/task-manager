import axios from "axios";
import type { IEditTaskPayload, ITask } from "../types/globalTypes";

const url = "http://localhost:3000/api/v1";

//Promise<Required<ITask>[]>

export const getAllUserTasks = async () => {
  const response = await axios.get(`${url}/tasks`, {
    withCredentials: true,
  });
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
  return response.data.task;
};

export const editUserTask = async (payload: IEditTaskPayload) => {
  console.log(payload);

  const { id: taskId, data } = payload;
  const response = await axios.patch(
    `${url}/tasks`,
    { ...data },
    {
      withCredentials: true,
      params: { id: taskId },
    },
  );

  return response.data.task;
};

export const deleteUserTask = async (taskId: string) => {
  await axios.delete(`${url}/tasks`, {
    withCredentials: true,
    params: { id: taskId },
  });
};
