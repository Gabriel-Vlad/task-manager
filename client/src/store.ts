import { configureStore } from "@reduxjs/toolkit";
import profileModalReducer from "./features/profileModal/profileModalSlice";
import newTaskModalReducer from "./features/newTaskModal/newTaskModalSlice";
import authReducer from "./features/authentication/authenticationSlice";

export const store = configureStore({
  reducer: {
    profileModal: profileModalReducer,
    newTaskModal: newTaskModalReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
