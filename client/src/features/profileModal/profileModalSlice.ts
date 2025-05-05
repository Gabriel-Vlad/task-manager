import { createSlice } from "@reduxjs/toolkit";
import type { IProfileModal } from "../../types/globalTypes";
import { openTaskModal } from "../newTaskModal/newTaskModalSlice";

const initialState: IProfileModal = {
  isOpen: false,
};

const profileModalSlice = createSlice({
  name: "profileModal",
  initialState,
  reducers: {
    openProfileModal: (state) => {
      state.isOpen = true;
      console.log("open");
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
