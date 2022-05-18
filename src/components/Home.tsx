import React from "react";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getBus } from "../redux/busSlice";
import Spinner from "./Spinner";
import Bus from "./Bus";
import SearchBus from "./SearchBus";

const Home = () => {
  const dispatch = useAppDispatch();
  const { busList, isLoading } = useAppSelector((state) => state.bus);
  useEffect(() => {
    dispatch(getBus(undefined, undefined));
  }, [dispatch]);
  return (
    <div>
      <SearchBus busList={busList} />
      {!isLoading &&
        busList &&
        busList.map((bus) => <Bus key={bus._id} data={bus} />)}
    </div>
  );
};

export default Home;
