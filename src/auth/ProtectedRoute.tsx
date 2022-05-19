import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props: any) => {
  if (!props.token) {
    return <Navigate to="/login" replace />;
  }

  return props.children;
};

export default ProtectedRoute;
