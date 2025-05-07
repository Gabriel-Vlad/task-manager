import { configureStore, combineReducers } from "@reduxjs/toolkit";
import profileModalReducer from "./features/profileModal/profileModalSlice";
import newTaskModalReducer from "./features/newTaskModal/newTaskModalSlice";
import authReducer from "./features/authentication/authenticationSlice";
import userTasksReducer from "./features/userTasks/userTasks";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedState = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    profileModal: profileModalReducer,
    newTaskModal: newTaskModalReducer,
    userTasks: userTasksReducer,
    persistedState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
