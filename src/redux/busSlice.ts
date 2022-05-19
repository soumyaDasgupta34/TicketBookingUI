import { createSlice } from "@reduxjs/toolkit";
import {
  getBusApi,
  getBookingsApi,
  cancelSeatApi,
  getAvailableSeatsApi,
  bookTicketApi,
} from "../api/apiCalls";

export interface BusState {
  busList: Array<any>;
  isLoading: Boolean;
  completeList: Array<any>;
  bookingsList: Array<any>;
  availableSeats: Array<any>;
}

const initialState: BusState = {
  busList: [],
  completeList: [],
  bookingsList: [],
  isLoading: true,
  availableSeats: [],
};

const busSlice = createSlice({
  name: "bus",
  initialState,
  reducers: {
    getBusAction: (state, action) => {
      state.busList = action.payload;
      state.isLoading = false;
    },
    getBusCompleteAction: (state, action) => {
      state.busList = action.payload;
      state.completeList = action.payload;
      state.isLoading = false;
    },
    getBookingsAction: (state, action) => {
      state.bookingsList = action.payload;
    },
    getAvailableSeatsAction: (state, action) => {
      state.availableSeats = action.payload;
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

export const getBusComplete = (source: any, destination: any) => {
  return async (dispatch: any) => {
    const response = await getBusApi(source, destination);
    const responseJson = await response.json();
    dispatch(getBusCompleteAction(responseJson.data));
  };
};

export const getBookings = () => {
  return async (dispatch: any) => {
    const response = await getBookingsApi();
    dispatch(getBookingsAction(response.data));
  };
};

export const cancelSeat = (seatId: string) => {
  return async (dispatch: any) => {
    await cancelSeatApi(seatId);
    const response = await getBookingsApi();
    dispatch(getBookingsAction(response.data));
  };
};

export const getAvailableSeats = (busId: string) => {
  return async (dispatch: any) => {
    const response = await getAvailableSeatsApi(busId);
    dispatch(getAvailableSeatsAction(response.data));
  };
};

export const bookTicket = (bookingDetails: Array<any>, busId: string) => {
  return async (dispatch: any) => {
    await bookTicketApi(bookingDetails, busId);
    const response = await getBookingsApi();
    dispatch(getBookingsAction(response.data));
  };
};

const { actions, reducer } = busSlice;
export const {
  getBusAction,
  getBusCompleteAction,
  getBookingsAction,
  getAvailableSeatsAction,
} = actions;
export default reducer;
