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
import StepContent from "@mui/material/StepContent";

export interface BusData {
  _id: string;
  number: string;
  source: string;
  destination: string;
  startTime: string;
  ticketPrice: number;
}

const Bus = (props: any) => {
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
      setShowSeat(true);
    }
  }, [isAuthenticated, open, props.data._id, navigate]);

  return (
    // <Card
    //   style={{
    //     background: "rgb(233, 230, 237)",
    //   }}
    // >
    //   <Grid container xs={12} style={{ padding: "16px 20px 16px 20px" }}>
    //     <Grid item xs={10}>
    //       <Grid container justifyContent={"space-between"} xs={10}>
    //         <Stepper orientation="vertical">
    //           {steps.map((step, index) => (
    //             <Step key={step.label} expanded={false}>
    //               <StepLabel
    //                 optional={
    //                   index === 2 ? (
    //                     <Typography variant="caption">Last step</Typography>
    //                   ) : null
    //                 }
    //               >
    //                 {step.label}
    //               </StepLabel>
    //             </Step>
    //           ))}
    //         </Stepper>
    //         <Grid item xs={10}>
    //           <CardContent
    //             style={{
    //               backgroundColor:
    //                 "linear-gradient(to bottom right, #ccffff 0%, #66ffff 100%)",
    //             }}
    //           >
    //             <Grid alignContent={"center"}>
    //               <Grid container justifyContent={"space-between"} xs={8}>
    //                 <Grid item xs={5}>
    //                   <Typography
    //                     sx={{ fontSize: 18 }}
    //                     color="text.secondary"
    //                     gutterBottom
    //                   >
    //                     Bus Number :{" "}
    //                     <span style={{ color: "rgb(78, 3, 163)" }}>
    //                       {props.data.number}
    //                     </span>
    //                   </Typography>
    //                 </Grid>
    //                 {/* <Grid item xs={4}>
    //                   <Typography
    //                     sx={{ mb: 1.5, fontSize: 16 }}
    //                     color="text.secondary"
    //                   >
    //                     Start Time :{" "}
    //                     <span style={{ color: "black" }}>
    //                       {props.data.startTime}
    //                     </span>
    //                   </Typography>
    //                 </Grid> */}
    //               </Grid>
    //               <Grid container justifyContent={"space-between"} xs={8}>
    //                 <Grid item>
    //                   <Typography variant="body1">
    //                     From : {props.data.source}
    //                   </Typography>
    //                   <Typography variant="body1">
    //                     To : {props.data.destination}
    //                   </Typography>
    //                 </Grid>
    //               </Grid>
    //             </Grid>
    //           </CardContent>
    //         </Grid>
    //         <Grid item xs={6}>
    //           <CardActions>
    //             <Grid>
    //               {!showSeat && (
    //                 <Fab
    //                   variant="extended"
    //                   color="primary"
    //                   size="small"
    //                   onClick={handleClickOpen}
    //                 >
    //                   <DirectionsBusIcon />
    //                   Book Ticket
    //                 </Fab>
    //               )}
    //               <Dialog open={open} onClose={handleClose}>
    //                 <DialogContent sx={{ width: "500px" }}>
    //                   <Box padding="1rem 1rem 0 1rem ">
    //                     <Input
    //                       type="text"
    //                       placeholder="Enter your email"
    //                       sx={{ width: "100%", marginBottom: "32px" }}
    //                       value={email}
    //                       onChange={(e) => setEmail(e.target.value)}
    //                     />
    //                     <Input
    //                       type="password"
    //                       placeholder="Enter your password"
    //                       sx={{ width: "100%" }}
    //                       value={password}
    //                       onChange={(e) => setPassword(e.target.value)}
    //                     />
    //                   </Box>
    //                 </DialogContent>
    //                 <DialogActions>
    //                   <Box padding="1rem ">
    //                     <Button
    //                       onClick={handleClose}
    //                       sx={{
    //                         color: "rgb(78, 3, 163)",
    //                         marginRight: "8px",
    //                       }}
    //                     >
    //                       Cancel
    //                     </Button>
    //                     <Button
    //                       variant="contained"
    //                       color="primary"
    //                       onClick={handleLogIn}
    //                       sx={{
    //                         bgcolor: "rgb(78, 3, 163)",
    //                         ":hover": {
    //                           bgcolor: "white",
    //                           color: "rgb(78, 3, 163)",
    //                         },
    //                       }}
    //                     >
    //                       Log In
    //                     </Button>
    //                   </Box>
    //                 </DialogActions>
    //               </Dialog>
    //             </Grid>
    //           </CardActions>
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //     <Grid item xs={2} style={{ paddingTop: "12px" }}>
    //       <Typography variant="h6">Rs.{props.data.ticketPrice}</Typography>
    //     </Grid>
    //   </Grid>
    //   {showSeat && <BookTickets bid={props.data._id} />}
    // </Card>
    // <div className="bus__container">
    <div className="bus__container">
      <div>
        <img
          src="https://www.redbus.in/images/srp/flexi-ticket-logo.png"
          className="bus__flex"
          alt="logo"
        />
      </div>
      <div className="bus__header">
        <div className="bus__header-column">
          <div className="bus__item item-corpoation">
            <h2>{props.data.number}</h2>
          </div>
          <div className="bus__footer bus-footer bus__item ">
            <h2>Volvo AC Seater (2+2)</h2>
          </div>
        </div>
        <div className="bus__item item-corpoation">
          <div className="bus__item item-corpoation">
            <h2>{props.data.startTime}</h2>
          </div>
          <div className="bus__footer bus-footer bus__item">
            <h2>{props.data.source}</h2>
          </div>
        </div>
        <div className="bus__item item-corpoation">
          <div className="bus__item item-corpoation">
            <h2>Duration</h2>
          </div>
          <div className="bus__item item-duration">
            <h2>12h 30m</h2>
          </div>
        </div>
        <div className="bus__item item-corpoation">
          <div className="bus__item item-corpoation">
            <h2>8:00am</h2>
          </div>
          <div className="bus__footer bus-footer bus__item">
            <h2>{props.data.destination}</h2>
          </div>
        </div>
        <div className="bus__item item-corpoation">
          <div className="bus__item">
            <h2>Price</h2>
          </div>
          <div className="bus__footer bus-footer bus__item">
            <h2>INR {props.data.ticketPrice}</h2>
          </div>
        </div>
      </div>
      <div className="bus__footer-icons-container">
        <div className="bus__footer-icons">
          <i className="fa-solid fa-bus"></i>
          <h2>Track My Bus</h2>
        </div>
        <div className="bus__footer-icons">
          <i className="fa-solid fa-location-crosshairs"></i>
          <h2>Live Tracking</h2>
        </div>
        <div className="bus__footer-icons">
          <i className="fa-solid fa-calendar-days"></i>
          <h2>Change Date</h2>
        </div>
      </div>
      {!showSeat && (
        <div className="bus__footer-btn">
          <button className="btn-style-book" onClick={handleClickOpen}>
            View Seats
          </button>
        </div>
      )}
      {showSeat && <BookTickets bid={props.data._id} />}
      <Dialog open={open} onClose={handleClose}>
        {" "}
        <DialogContent sx={{ width: "500px" }}>
          {" "}
          <Box padding="1rem 1rem 0 1rem ">
            {" "}
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
                color: "#d84f57",
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
                bgcolor: "#d84f57;",
                color: "white",
                ":hover": {
                  bgcolor: "#e27b82",
                  color: "white",
                },
              }}
            >
              Log In
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Bus;
