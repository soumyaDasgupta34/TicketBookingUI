import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import busReducer from "./busSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    bus: busReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
