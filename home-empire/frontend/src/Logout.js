import React, { useEffect } from "react";
import { RequireAuth } from "./RequireAuth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";

export const Logout = () => {
    const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();
     const navigate = useNavigate();
     useEffect(() => {
       const auth = RequireAuth();
       if (!auth) {
         navigate(`/signIn`);
       } else {
           localStorage.removeItem("jwt_authorization");
           setIsLoggedIn(false);
           setAuthUser(null);
         navigate(`/signIn`);
       }
     }, []);
  return (
    <></>
  )
}
