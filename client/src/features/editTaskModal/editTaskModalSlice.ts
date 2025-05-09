import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IEditTask, IPagination, ITask } from "../../types/globalTypes";

const initialState: IEditTask = {
  isOpen: false,
  submitStatus: "idle",
  error: null,
  id: "",
  title: "",
  description: "",
  dueDate: "",
  status: "INCOMPLETE",
  isImportant: false,
};

const editTaskModalSlice = createSlice({
  name: "editTaskModal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ITask>) => {
      const { id, title, description, dueDate, status, isImportant } = action.payload;
      state.id = id;
      state.title = title;
      state.description = description;
      state.dueDate = dueDate;
      state.status = status;
      state.isImportant = isImportant;
      state.submitStatus = "idle";
      state.error = null;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    editTaskStart: (state) => {
      state.submitStatus = "pending";
      state.error = null;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    editTaskSuccess: (state, _action: PayloadAction<IPagination>) => {
      state.submitStatus = "success";
      state.error = null;
      state.isOpen = false;
      console.log();
    },
    editTaskError: (state, action) => {
      state.submitStatus = "error";
      state.error = new Error(action.payload);
    },
  },
});

export const { openModal, closeModal, editTaskError, editTaskStart, editTaskSuccess } = editTaskModalSlice.actions;
export default editTaskModalSlice.reducer;
