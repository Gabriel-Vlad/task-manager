import { createSlice } from "@reduxjs/toolkit";
import type { INewTaskModal } from "../../types/globalTypes";

const initialState: INewTaskModal = {
  isOpen: false,
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
  },
});

export const { openTaskModal, closeTaskModal } = newTaskModalSlice.actions;
export default newTaskModalSlice.reducer;
