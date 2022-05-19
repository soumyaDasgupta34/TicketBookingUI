import { useEffect } from "react";
import { logoutAction } from "../redux/authSlice";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import Spinner from "./Spinner";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return isAuthenticated ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <Navigate replace to="/" />
  );
};

export default Logout;
