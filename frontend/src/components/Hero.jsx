import React from "react";
import { useNavigate } from "react-router";

const Hero = () => {

    const navigate = useNavigate()
  return (
    <>
      <section className="mt-20 mx-auto max-w-screen-xl pb-12 px-6 sm:px-4 items-center lg:flex md:px-8">
        <div className="space-y-4 flex-1 sm:text-center lg:text-left">
          <h1 className="text-white font-bold text-4xl xl:text-5xl">
            <span className="text-[#2F0601]">
              {" "}
              Find Your Furry Friend Today!
            </span>
          </h1>
          <p className="text-[#520008] max-w-xl font-medium leading-relaxed sm:mx-auto lg:ml-0">
            "Your Perfect Companion is Waiting – Adopt, Love, and Make a
            Difference Today!"
          </p>
          <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
            <button
                onClick={()=>navigate('/about')}
              className="px-7 py-3 w-full font-semibold bg-white hover:ring-inset hover:ring-2 hover:ring-[#2F0601] text-[#2F0601] text-center rounded-md shadow-md block sm:w-auto"
            >
              Learn more
            </button>
            
            <button
               onClick={()=>navigate('/adopt-a-pet')}
              className="px-7 py-3 w-full bg-[#2F0601] hover:bg-white hover:text-[#2F0601] hover:ring-inset hover:ring-2 hover:ring-[#2F0601] text-gray-200 text-center font-semibold rounded-md block sm:w-auto"
            >
              Adapt now
            </button>
          </div>
        </div>
        <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
          <img
            src="/images/hero.jpg"
            className="w-full mx-auto sm:w-10/12 rounded-2xl lg:w-full"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
