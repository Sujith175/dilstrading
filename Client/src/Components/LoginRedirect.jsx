import React, { useContext } from "react";
import { UserContext } from "./Context/AuthContext";
import { Navigate } from "react-router-dom";
import Login from "../Pages/Login";

const LoginRedirect = () => {
  const { currentUser } = useContext(UserContext);
  if (!currentUser) {
    return <Login />;
  }
  if (currentUser.type === "admin") return <Navigate to="/admin" replace />;
  if (currentUser.type === "user") return <Navigate to="/profile" replace />;
  return <Login />;
};

export default LoginRedirect;
