import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Input } from "@mui/material";
import { useState } from "react";
import { logIn } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import Fab from "@mui/material/Fab";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import BookTickets from "./BookTickets";

export interface BusData {
  _id: string;
  number: string;
  source: string;
  destination: string;
  startTime: string;
  ticketPrice: number;
}

const Bus = (props: any) => {
  const steps = [
    {
      label: props.data.startTime,
    },
    {
      label: "10pm",
    },
  ];
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [showSeat, setShowSeat] = useState(false);
  const handleClickOpen = () => {
    if (isAuthenticated || token) {
      // navigate(`/bookTickets/${props.data._id}`);
      setShowSeat(true);
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setPassword("");
  };

  const handleLogIn = () => {
    dispatch(logIn(email, password));
    // navigate(`/bookTickets/${props.data._id}`);
  };
  useEffect(() => {
    if (open && isAuthenticated) {
      setOpen(false);
      navigate(`/bookTickets/${props.data._id}`);
    }
  }, [isAuthenticated, open, props.data._id, navigate]);

  return (
    <Card
      style={{
        background: "rgb(233, 230, 237)",
      }}
    >
      <Grid container justifyContent={"space-between"} xs={8}>
        <Stepper orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid item xs={10}>
          <CardContent
            style={{
              backgroundColor:
                "linear-gradient(to bottom right, #ccffff 0%, #66ffff 100%)",
            }}
          >
            <Grid alignContent={"center"}>
              <Grid container justifyContent={"space-between"} xs={8}>
                <Grid item xs={2}>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    Bus Number : {props.data.number}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Start Time : {props.data.startTime}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justifyContent={"space-between"} xs={8}>
                <Grid item>
                  <Typography variant="body2">
                    From : {props.data.source}
                  </Typography>
                  <Typography variant="body2">
                    To : {props.data.destination}
                  </Typography>
                  <Typography variant="body2">
                    Rs.{props.data.ticketPrice}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
        <Grid item xs={6}>
          <CardActions>
            {!showSeat && (
              <Fab
                variant="extended"
                color="primary"
                size="small"
                onClick={handleClickOpen}
              >
                <DirectionsBusIcon />
                Book Ticket
              </Fab>
            )}
            <Dialog open={open} onClose={handleClose}>
              <DialogContent sx={{ width: "500px" }}>
                <Box padding="1rem 1rem 0 1rem ">
                  <Input
                    type="text"
                    placeholder="Enter your email"
                    sx={{ width: "100%", marginBottom: "32px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    sx={{ width: "100%" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Box padding="1rem ">
                  <Button
                    onClick={handleClose}
                    sx={{
                      color: "rgb(78, 3, 163)",
                      marginRight: "8px",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogIn}
                    sx={{
                      bgcolor: "rgb(78, 3, 163)",
                      ":hover": {
                        bgcolor: "white",
                        color: "rgb(78, 3, 163)",
                      },
                    }}
                  >
                    Log In
                  </Button>
                </Box>
              </DialogActions>
            </Dialog>
          </CardActions>
        </Grid>
      </Grid>
      {showSeat && <BookTickets bid={props.data._id} />}
    </Card>
  );
};

export default Bus;
