import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getBookings } from "../redux/busSlice";
import { useEffect } from "react";
import Bookings from "./Bookings";

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
          <Bookings key={bookings.seatId} data={bookings} />
        ))}
    </div>
  );
};

export default MyBookings;
