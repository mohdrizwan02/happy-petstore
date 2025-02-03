import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AuthMiddleware = ({ children, authentication = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);

  const authStatus = useSelector((state) => state.auth.authStatus);

  useEffect(() => {
    console.log(authStatus);

    if (authentication && authStatus !== authentication) {
      toast.error("Unauthorized request", {
        position: "top-center",
      });
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, authentication]);

  return loader ? <h1>Loading ...... </h1> : <>{children}</>;
};

export default AuthMiddleware;
