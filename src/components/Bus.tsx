import React from "react";
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
  const handleClickOpen = () => {
    if (isAuthenticated || token) {
      navigate(`/bookTickets/${props.data._id}`);
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
    navigate(`/bookTickets/${props.data._id}`);
  };

  return (
    <Card
      style={{
        background:
          "linear-gradient(to bottom right, #ccffff 0%, #66ffff 100%)",
      }}
    >
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
          <Typography variant="body2">From : {props.data.source}</Typography>
          <Typography variant="body2">To : {props.data.destination}</Typography>
          <Typography variant="body2">Rs.{props.data.ticketPrice}</Typography>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClickOpen}>
          Book Tickets
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogContent sx={{ width: "500px" }}>
            <Box padding=".5rem 0">
              <Input
                type="text"
                placeholder="Enter your email"
                sx={{ width: "100%" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Enter your password"
                sx={{ width: "100%" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleLogIn}>
              Log In
            </Button>
          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
  );
};

export default Bus;
