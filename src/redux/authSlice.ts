import { createSlice } from "@reduxjs/toolkit";
import { logInApi, signUpApi } from "../api/apiCalls";

export interface AuthState {
  isAuthenticated: boolean;
  incorrectLogin: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  incorrectLogin: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state) => {
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    incorrectLogInAction: (state) => {
      state.incorrectLogin = true;
    },
    logoutAction: (state) => {
      console.log("Inside log out action");
      state.isAuthenticated = false;
      state.incorrectLogin = false;
      localStorage.removeItem("token");
    },
  },
});

export const logIn = (email: string, password: string) => {
  return async (dispatch: any) => {
    const response = await logInApi(email, password);
    const { accessToken, userId } = await response.json();
    if (response.status === 201) {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("userId", userId);
      dispatch(loginAction());
    } else {
      dispatch(incorrectLogInAction());
    }
  };
};

export const signUp = (userName: string, email: string, password: string) => {
  return async (dispatch: any) => {
    const { accessToken, userId } = await signUpApi(email, password, userName);
    localStorage.setItem("token", accessToken);
    localStorage.setItem("userId", userId);
    dispatch(loginAction());
  };
};

const { actions, reducer } = authSlice;
export const { loginAction, incorrectLogInAction, logoutAction } = actions;
export default reducer;
