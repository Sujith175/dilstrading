// import React, { useContext, useEffect } from "react";
// import {  useNavigate } from "react-router-dom";
// import { AuthContext } from "./Context/AuthContext";

import { useContext } from "react";
import { UserContext } from "./Context/AuthContext";
import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated,adminData } = useContext(AuthContext);
//   const navigate = useNavigate()

//   useEffect(()=>{
//     if ( !adminData ) {
//       navigate('/login');
//    }
//    else if (adminData==="admin") {
//     navigate('/admin');
//   }

//   },[navigate,isAuthenticated ])

//   return children;
// };

// export default ProtectedRoute;

const ProtectedRoute = ({ children, allowedTypes }) => {
  const { currentUser } = useContext(UserContext);
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  if (allowedTypes && !allowedTypes.includes(currentUser.type)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
