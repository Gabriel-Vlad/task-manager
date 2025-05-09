import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import type { IPagination, ITask, ITaskInitialState } from "../../types/globalTypes";
import { navigatePage } from "../pagination/paginationSlice";
import { editTaskSuccess } from "../editTaskModal/editTaskModalSlice";

const initialState: ITaskInitialState = {
  tasks: [],
  error: null,
  isSuccess: null,
  filteredTasks: [],
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
      state.filteredTasks = newTasks;
    },
    setUserTasksError: (state, action) => {
      state.isSuccess = false;
      state.error = new Error(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(navigatePage, editTaskSuccess), (state, action: PayloadAction<IPagination>) => {
      const { page } = action.payload;
      switch (page) {
        case 0:
          state.filteredTasks = state.tasks.map((task) => task);
          break;
        case 1:
          state.filteredTasks = state.tasks.filter((task) => task.isImportant === true);
          break;

        case 2:
          state.filteredTasks = state.tasks.filter((task) => task.status === "COMPLETED");
          break;

        case 3:
          state.filteredTasks = state.tasks.filter((task) => task.status === "INCOMPLETE" && task.isImportant === true);
          break;
      }
    });
  },
});

export const { setUserTasks, setUserTasksError } = userTasksSlice.actions;
export default userTasksSlice.reducer;
