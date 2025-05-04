import { configureStore } from "@reduxjs/toolkit";
import profileModalReducer from "./features/profileModal/profile-modal";
import newTaskModalReducer from "./features/newTaskModal/new-task-modal";

export const store = configureStore({
  reducer: {
    profileModal: profileModalReducer,
    newTaskModal: newTaskModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
