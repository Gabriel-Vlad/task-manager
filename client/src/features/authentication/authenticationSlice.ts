import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IAuthState, IAction } from "../../types/globalTypes";

const initialState: IAuthState = {
  isLoggedIn: false,
  id: null,
  name: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.status = "pending";
      state.error = null;
    },
    signInSuccess: (state, action: PayloadAction<IAction>) => {
      const { id, name } = action.payload;
      state.isLoggedIn = true;
      state.status = "success";
      state.id = id!;
      state.name = name!;
    },
    signInError: (state, action) => {
      state.status = "error";
      state.error = new Error(action.payload);
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { signInStart, signInSuccess, signInError, logout } = authSlice.actions;
export default authSlice.reducer;
