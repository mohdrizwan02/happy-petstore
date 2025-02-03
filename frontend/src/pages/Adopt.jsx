import React from "react";

const AdoptPage = () => {
  return (
    <>

      <div className="bg-[url('/images/img-2.jpg')] ">
         
      </div>
      <div
        className="items-center w-10/12 grid-cols-2 mx-auto overflow-x-hidden md:grid md:py-14 lg:py-14 xl:py-14 lg:mt-3 xl:mt-5"
        data-aos="fade-right"
        data-aos-duration="800"
      >
        <div className="pr-2 md:mb-14 py-14 md:py-0">
          <h1 className="text-3xl font-semibold text-blue-900 xl:text-5xl lg:text-3xl">
            <span className="block w-full">Re-Home and Adopt a Pet</span> 
            
          </h1>
          <p className="py-4 text-lg text-gray-500 2xl:py-8 md:py-6 2xl:pr-5">
          Every Pet Deserves a Good Home.
          </p>
          <div className="mt-4">
            <button
              href="#contact"
              className="px-5 py-3 text-lg tracking-wider text-white bg-[#2f0601] rounded-lg md:px-8 hover:bg-[#2f0601] group"
            >
              <span>Adopt</span>{" "}
            </button>
          </div>
        </div>

        <div className="pb-10 overflow-hidden  lg:p-0 sm:pb-0">
          <img
            id="heroImg1"
            className="transition-all duration-300 rounded-xl hover:rounded-xl ease-in-out hover:scale-105 lg:w-full sm:mx-auto sm:w-4/6 sm:pb-12 lg:pb-0"
            src="images/img-2.jpg"
            alt="Awesome hero page image"
            width="500"
            height="488"
          />
        </div>
      </div>
    </>
  );
};

export default AdoptPage;
