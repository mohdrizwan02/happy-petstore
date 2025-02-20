import React from "react";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import FAQsection from "../components/FAQsection";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
