import React from "react";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import FAQsection from "../components/FAQsection";


import { useSelector, useDispatch } from "react-redux";


import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const HomePage = () => {
  
  
  // const userData = useSelector((state) => state.auth.userData);

  // useEffect(() => {
  //   if (userData) {
  //     if (!userData.userUpdated) {
  //       toast.info("your profile is not updated please update your profile",
  //         {
  //         delay:2000,
  //         position:"top-center",
  //         pauseOnHover: false,
          
  //       });
  //     }
  //   }
  // }, []);

  return (
    <>
      <Hero />
      <div className="">
        <div className="border border-[#2f0601] h-0"></div>
      </div>
      <FAQsection />
      <div className="">
        <div className="border border-[#2f0601] h-0"></div>
      </div>
      <Newsletter />
    </>
  );
};

export default HomePage;
