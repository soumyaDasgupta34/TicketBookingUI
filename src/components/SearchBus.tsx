import React from "react";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import { useState } from "react";
import { getBus } from "../redux/busSlice";
import { Container } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

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
    <Container style={{ marginTop: "16px", marginBottom: "32px" }}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
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
        <Grid item xs={5}>
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
        </Grid>
        <Grid item xs={2}>
          <IconButton
            onClick={onSearchHandler}
            style={{
              display: "flex",
              borderRadius: "5px",
              width: "100%",
              marginTop: "10px",
              // border: 1px solid blue;
              // color: blue;
            }}
          >
            <SearchIcon />
            <Typography>Search</Typography>
          </IconButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchBus;
