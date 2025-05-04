import { createSlice } from "@reduxjs/toolkit";
import type { ProfileModal } from "../../types/globalTypes";
import { openTaskModal } from "../newTaskModal/new-task-modal";

const initialState: ProfileModal = {
  isOpen: false,
};

const profileModalSlice = createSlice({
  name: "profileModal",
  initialState,
  reducers: {
    openProfileModal: (state) => {
      state.isOpen = true;
    },
    closeProfileModal: (state) => {
      state.isOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(openTaskModal, (state) => {
      state.isOpen = false;
    });
  },
});

export const { openProfileModal, closeProfileModal } = profileModalSlice.actions;
export default profileModalSlice.reducer;
