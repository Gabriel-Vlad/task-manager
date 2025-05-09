import { createSlice } from "@reduxjs/toolkit";
import type { INewTaskModal } from "../../types/globalTypes";

const initialState: INewTaskModal = {
  isOpen: false,
  status: "idle",
  error: null,
};

const newTaskModalSlice = createSlice({
  name: "newTaskModal",
  initialState,
  reducers: {
    openTaskModal: (state) => {
      state.isOpen = true;
    },
    closeTaskModal: (state) => {
      state.isOpen = false;
    },
    createTaskStart: (state) => {
      state.status = "pending";
      state.error = null;
      console.log("start");
    },
    createUserSuccess: (state) => {
      state.status = "success";
      state.error = null;
    },
    createTaskError: (state, action) => {
      state.status = "error";
      state.error = new Error(action.payload);
    },
  },
});

export const { openTaskModal, closeTaskModal, createTaskStart, createUserSuccess, createTaskError } = newTaskModalSlice.actions;
export default newTaskModalSlice.reducer;
