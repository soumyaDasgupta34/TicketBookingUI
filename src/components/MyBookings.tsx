import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getBookings } from "../redux/busSlice";
import { useEffect } from "react";
import Bookings from "./Bookings";
import { Grid } from "@mui/material";

const MyBookings = () => {
  const dispatch = useAppDispatch();
  const { bookingsList } = useAppSelector((state) => state.bus);
  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);
  return (
    <div>
      {bookingsList &&
        bookingsList.map((bookings) => (
          <Grid margin={"20px 0"}>
            <Bookings key={bookings.seatId} data={bookings} />
          </Grid>
        ))}
    </div>
  );
};

export default MyBookings;
