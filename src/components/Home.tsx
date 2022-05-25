import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getBusComplete } from "../redux/busSlice";
import SearchBus from "./SearchBus";

const Home = () => {
  const dispatch = useAppDispatch();

  const { completeList } = useAppSelector((state) => state.bus);
  useEffect(() => {
    dispatch(getBusComplete(undefined, undefined));
  }, [dispatch]);
  return (
    <>
      <SearchBus busList={completeList} />
    </>
  );
};

export default Home;
