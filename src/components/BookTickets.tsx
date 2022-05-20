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
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Button } from "@mui/material";
import { getBusById } from "../redux/busSlice";
import Bus from "./Bus";

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
interface InputField {
  passengerName: string;
  passengerAge: string;
  seatNumber?: number;
}

const BookTickets = (props: any) => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [inputFields, setInputFields] = useState<InputField[]>([]);

  const navigate = useNavigate();
  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const onFormSubmitHandler = () => {
    setOpen(true);
    setTimeout(() => {
      navigate("/bookings");
    }, 5000);
    dispatch(bookTicket(inputFields, bid));
  };

  const handleFormChange = (index: any, event: any) => {
    console.log("Inside form change", event.target.value);
    console.log("Event target name", event.target.name);
    let data: any = [...inputFields];
    data[index][event.target.name] = event.target.value;
    console.log("Data is", data);
    setInputFields(data);
  };
  const handleBookTicket = () => {
    let arr2 = [];
    for (let i = 0; i < seletctedSeats.length; i++) {
      arr2.push({
        passengerName: "",
        passengerAge: "",
        seatNumber: seletctedSeats[i],
      });
    }
    setInputFields(arr2);
    setOpenDialog(true);
  };
  const Alert = forwardRef(function Alert(props: any, ref: any) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const bid = props.bid;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBusById(bid));
  }, [bid, dispatch]);
  const [seletctedSeats, setSelectedSeats]: [
    selectedSeats: Array<number>,
    setSelectedSeats: any
  ] = useState([]);
  const onSeatSelect = (seatNumber: number) => {
    if (seletctedSeats.includes(seatNumber)) {
      setSelectedSeats((prevState: any) =>
        prevState.filter((seat: number) => seat !== seatNumber)
      );
    } else {
      setSelectedSeats([...seletctedSeats, seatNumber]);
    }
  };
  const { availableSeats, busDetails } = useAppSelector((state) => state.bus);
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

  const renderPassengerInput = () => {
    return inputFields.map((input, index) => {
      return (
        <div key={index} style={{ display: "flex", gap: "10px" }}>
          <TextField
            margin="normal"
            disabled
            label="Seat Number"
            name="seatNumber"
            autoFocus
            value={input.seatNumber}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Passenger Name"
            name="passengerName"
            autoFocus
            value={input.passengerName}
            onChange={(event) => handleFormChange(index, event)}
          />
          <TextField
            margin="normal"
            required
            name="passengerAge"
            label="Age"
            value={input.passengerAge}
            onChange={(event) => handleFormChange(index, event)}
          />
        </div>
      );
    });
  };
  return (
    <>
      {/* <Bus data={busDetails} /> */}
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
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Booking Successful. Redirecting you to booking page in 5 sec
          </Alert>
        </Snackbar>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogContent sx={{ width: "500px" }}>
            <Box sx={{ mt: 1 }}>{renderPassengerInput()}</Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={onFormSubmitHandler}
              sx={{
                bgcolor: "rgb(78, 3, 163)",
                ":hover": {
                  bgcolor: "white",
                  color: "rgb(78, 3, 163)",
                },
                margin: "0 20px 20px 20px",
                padding: "8px 24px ",
              }}
            >
              Book
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
};

export default BookTickets;
