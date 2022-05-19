import React, { useState } from "react";
import _ from "lodash";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useEffect } from "react";
import { bookTicket, getAvailableSeats } from "../redux/busSlice";
import Fab from "@mui/material/Fab";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";

import "./BookTickets.css";
import { Grid } from "@mui/material";

const Seat = (props: any) => (
  <li className="seat">
    <input
      type="checkbox"
      id={props.seatNumber}
      disabled={!props.isAvailable}
      checked={props.isSelected}
      onChange={(e) => {
        props.onSeatSelect(props.seatNumber);
      }}
    />
    <label htmlFor={props.seatNumber}>{props.seatNumber}</label>
  </li>
);

const SeatRow = (props: any) => {
  const seatRow: Array<any> = [];
  _.times(5, (colNumber) => {
    const seatNumber = props.rowNumber * 5 + colNumber + 1;
    seatRow.push(
      <Seat
        seatNumber={seatNumber}
        key={seatNumber}
        onSeatSelect={props.onSeatSelect}
        isAvailable={
          props.availableSeats &&
          props.availableSeats.indexOf(seatNumber) !== -1
        }
        isSelected={
          props.selectedSeats && props.selectedSeats.indexOf(seatNumber) !== -1
        }
      />
    );
  });
  return (
    <li className={`row row--${props.rowNumber + 1}`}>
      <ol className="seats">{seatRow.map((seat) => seat)}</ol>
    </li>
  );
};

const BookTickets = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleBookTicket = () => {
    setOpen(true);
    setTimeout(() => {
      navigate("/bookings");
    }, 5000);
    // dispatch(bookTicket(,bid))
  };
  const Alert = forwardRef(function Alert(props: any, ref: any) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const { bid = "" }: { bid?: string } = useParams();
  const dispatch = useAppDispatch();
  const [seletctedSeats, setSelectedSeats]: [
    selectedSeats: Array<number>,
    setSelectedSeats: any
  ] = useState([]);
  console.log(seletctedSeats);
  const onSeatSelect = (seatNumber: number) => {
    console.log("Selected seats", seletctedSeats);
    console.log("Seat number", seatNumber);
    if (seletctedSeats.includes(seatNumber)) {
      console.log("Inside if");
      setSelectedSeats((prevState: any) =>
        prevState.filter((seat: number) => seat !== seatNumber)
      );
    } else {
      console.log("Inside else");
      setSelectedSeats([...seletctedSeats, seatNumber]);
    }
  };
  const { availableSeats } = useAppSelector((state) => state.bus);
  useEffect(() => {
    dispatch(getAvailableSeats(bid));
  }, [bid, dispatch]);
  const seats = [];
  for (let i = 0; i <= 8; i++) {
    seats.push(
      <SeatRow
        rowNumber={i}
        onSeatSelect={onSeatSelect}
        availableSeats={availableSeats}
        selectedSeats={seletctedSeats}
      />
    );
  }
  return (
    <Grid xs={12} className="container" padding={"20px"}>
      <Grid item>
        <ol className="cabin fuselage">{seats.map((seat) => seat)}</ol>
      </Grid>
      <Grid item>
        <Fab
          variant="extended"
          color="primary"
          size="small"
          onClick={handleBookTicket}
        >
          <DirectionsBusIcon />
          Book Ticket
        </Fab>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Booking Successful. Redirecting you to booking page in 5 sec
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default BookTickets;
