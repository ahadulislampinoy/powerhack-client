import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LargeSpinner from "../Components/LargeSpinner";
import { AuthContext } from "../Context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <LargeSpinner />;
  }
  if (auth) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
