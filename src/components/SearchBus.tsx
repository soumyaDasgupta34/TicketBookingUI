import React from "react";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import { useState } from "react";
import { getBus } from "../redux/busSlice";

const SearchBus = (props: any) => {
  const dispatch = useAppDispatch();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const onSourceChangeHandler = (event: any, value: any) => {
    setSource(value);
  };
  const onDestinationChangeHandler = (event: any, value: any) => {
    setDestination(value);
  };
  const onSearchHandler = () => {
    dispatch(getBus(source, destination));
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Autocomplete
          freeSolo
          disableClearable
          onChange={onSourceChangeHandler}
          options={props.busList.map((bus: any) => bus.source)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Source"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Autocomplete
          freeSolo
          disableClearable
          onChange={onDestinationChangeHandler}
          options={props.busList.map((bus: any) => bus.destination)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Destination"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
        <Grid item xs={4}>
          <Button onClick={onSearchHandler}>Search</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SearchBus;
