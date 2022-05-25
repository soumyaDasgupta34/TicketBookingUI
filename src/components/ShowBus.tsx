import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import Bus from "./Bus";
import { useNavigate } from "react-router-dom";

const ShowBus = () => {
  const { busList, isLoading } = useAppSelector((state) => state.bus);
  const source = busList[0].source;
  const destination = busList[0].destination;
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/");
  };
  return (
    <div className="bus__show">
      <div className="bus__result">
        <div className="bus__source">{source}</div>
        <div className="bus__arrow">
          <i className="fa-solid fa-right-long"></i>
        </div>
        <div className="bus__destination">{destination}</div>
        <div>
          <button className="btn-style-book" onClick={onClickHandler}>
            Modify
          </button>
        </div>
      </div>
      {!isLoading &&
        busList &&
        busList.map((bus) => (
          <>
            <Bus key={bus._id} data={bus} />
            <br />
            <br />
          </>
        ))}
    </div>
  );
};

export default ShowBus;
