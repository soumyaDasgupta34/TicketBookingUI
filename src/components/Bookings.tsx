import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { cancelSeat } from "../redux/busSlice";
import { useAppDispatch } from "../redux/hooks";

const Bookings = (props: any) => {
  const dispatch = useAppDispatch();
  const onCancelBookingHandler = () => {
    dispatch(cancelSeat(props.data.seatId));
  };
  return (
    <div>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 500,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {props.data.passengerName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Age: {props.data.passengerAge}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Seat Number: {props.data.seatNumber}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Start Time : {props.data.startTime}
                </Typography>
              </Grid>
              <Grid item>
                <Fab
                  variant="extended"
                  size="small"
                  onClick={onCancelBookingHandler}
                >
                  <DeleteOutlineIcon />
                  <Typography variant="subtitle2">Cancel Booking</Typography>
                </Fab>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                Rs. {props.data.ticketPrice}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Bookings;
