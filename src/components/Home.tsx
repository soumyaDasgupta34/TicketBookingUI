import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getBusComplete } from "../redux/busSlice";
import Bus from "./Bus";
import SearchBus from "./SearchBus";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";

const Home = () => {
  const dispatch = useAppDispatch();

  const { busList, isLoading, completeList } = useAppSelector(
    (state) => state.bus
  );
  useEffect(() => {
    dispatch(getBusComplete(undefined, undefined));
  }, [dispatch]);
  return (
    <>
      <SearchBus busList={completeList} />
      <Container>
        <Grid xs={6} alignContent={"center"}>
          <Grid xs={7}>
            {!isLoading &&
              busList &&
              busList.map((bus) => (
                <>
                  <Grid item>
                    <Bus key={bus._id} data={bus} />
                  </Grid>
                  <br />
                  <br />
                </>
              ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
