import { createSlice } from "@reduxjs/toolkit";
import type { IAuthState } from "../../types/globalTypes";

const initialState: IAuthState = {
  isLoggedIn: false,
  id: null,
  name: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    },
    setCredentials: (state, action) => {
      const { id, name } = action.payload;
      state.id = id;
      state.name = name;
      state.isLoggedIn = true;
      console.log(action.payload);
    },
  },
});

export const { signIn, logOut, setCredentials } = authSlice.actions;
export default authSlice.reducer;
