import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export interface BusData {
  _id: string;
  number: string;
  source: string;
  destination: string;
  startTime: string;
  ticketPrice: number;
}

const Bus = (props: any) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Bus Number : {props.data.number}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Start Time : {props.data.startTime}
        </Typography>
        <Typography variant="body2">From : {props.data.source}</Typography>
        <Typography variant="body2">To : {props.data.destination}</Typography>
        <Typography variant="body2">Rs.{props.data.ticketPrice}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Book Tickets</Button>
      </CardActions>
    </Card>
  );
};

export default Bus;
