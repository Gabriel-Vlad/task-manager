import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ITask, ITaskInitialState } from "../../types/globalTypes";

const initialState: ITaskInitialState = {
  tasks: [],
  error: null,
  isSuccess: null,
};

const userTasksSlice = createSlice({
  name: "userTasks",
  initialState,
  reducers: {
    setUserTasks: (state, action: PayloadAction<ITask[]>) => {
      state.error = null;
      state.isSuccess = true;
      const newTasks: ITask[] = action.payload;
      state.tasks = newTasks;
    },
    setUserTasksError: (state, action) => {
      state.isSuccess = false;
      state.error = new Error(action.payload);
    },
  },
});

export const { setUserTasks, setUserTasksError } = userTasksSlice.actions;
export default userTasksSlice.reducer;
