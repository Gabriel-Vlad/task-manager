import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IPagination } from "../../types/globalTypes";
import { logout } from "../authentication/authenticationSlice";

const initialState: IPagination = {
  page: 0,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    navigatePage: (state, action: PayloadAction<IPagination>) => {
      state.page = action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.page = 0;
    });
  },
});

export const { navigatePage } = paginationSlice.actions;
export default paginationSlice.reducer;
