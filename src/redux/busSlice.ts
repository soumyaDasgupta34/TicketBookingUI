import { createSlice } from "@reduxjs/toolkit";
import { getBusApi } from "../api/apiCalls";
import { useAppSelector, useAppDispatch } from "./hooks";

export interface BusState {
  busList: Array<any>;
  isLoading: Boolean;
}

const initialState: BusState = {
  busList: [],
  isLoading: true,
};

const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {
    getBusAction: (state, action) => {
      state.busList = action.payload;
      state.isLoading = false;
    },
  },
});

export const getBus = (source: any, destination: any) => {
  return async (dispatch: any) => {
    const response = await getBusApi(source, destination);
    const responseJson = await response.json();
    dispatch(getBusAction(responseJson.data));
  };
};

const { actions, reducer } = busSlice;
export const { getBusAction } = actions;
export default reducer;
