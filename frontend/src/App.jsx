import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Provider, useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect } from "react";

import { useState } from "react";
import store from "./store/store";
import { login } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      axios
        .get("/api/v1/users/current-user")
        .then((response) => {
          console.log(response);
          if (response) {
            dispatch(login(response.data.data.user));
          }
        })
        .catch((error) => {
          console.log("unauthorized user");
        });
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  return (
    <>
      <Navbar />

      <Outlet />
      <Footer />
    </>
  );
}

export default App;
