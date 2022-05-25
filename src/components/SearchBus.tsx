import React from "react";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useAppDispatch } from "../redux/hooks";
import { useState } from "react";
import { getBus } from "../redux/busSlice";
import { useNavigate } from "react-router-dom";

const SearchBus = (props: any) => {
  const dispatch = useAppDispatch();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();
  const onSourceChangeHandler = (event: any, value: any) => {
    setSource(value);
  };
  const onDestinationChangeHandler = (event: any, value: any) => {
    setDestination(value);
  };
  const onSearchHandler = () => {
    dispatch(getBus(source, destination));
    navigate("/showBus");
  };
  const style = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 0,
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
      "&.MuiOutlinedInput-notchedOutline:hover": {
        border: "none",
      },
    },
  };
  return (
    <>
      <div className="home">
        <div className="home__item">
          <Autocomplete
            freeSolo
            disableClearable
            onChange={onSourceChangeHandler}
            style={{ background: "white" }}
            options={Array.from(
              new Set(props.busList.map((bus: any) => bus.source))
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Source"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
                sx={style}
              />
            )}
          />
        </div>
        <div className="home__item">
          <Autocomplete
            freeSolo
            disableClearable
            onChange={onDestinationChangeHandler}
            style={{ background: "white", border: 0 }}
            options={Array.from(
              new Set(props.busList.map((bus: any) => bus.destination))
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Destination"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
                sx={style}
              />
            )}
          />
        </div>
        <div className="home__search-container">
          <button onClick={onSearchHandler} className="home__search-btn">
            <h2>Search</h2>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBus;
