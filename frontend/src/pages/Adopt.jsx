import React, { useState } from "react";
import PetModal from "../components/ui/PetModal";
import { useNavigate } from "react-router";

const AdoptPage = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate()
  const faqs = [
    {
      q: "Why Should You Adopt a Dog or Cat?",
      a: "Did you know that over 2000 people per hour in India run a search right here looking to adopt a pet? Pet adoption is becoming the preferred way to find a new pet. Adoption will always be more convenient than buying a puppy for sale from a pet shop or finding a kitten for sale from a litter. Pet adoption brings less stress and more savings! So what are you waiting for? Go find that perfect pet for home!",
    },
    {
      q: "What is the fee to adopt a pet?",
      a: "No, there is no fee for pet adoption on ThePetNest. However, if you adopt from a different city pet owner/rescuer can ask for travel charges. In case if you find someone asking for charges you can write us at happypetstoreapp@gmail.com.",
    },
    {
      q: "How old do I need to be to adopt a pet?",
      a: "You need to be at least 18+ years old to adopt",
    },
    {
      q: "Can you return an adopted pet?",
      a: "We understand it can be hard to get an adjusted pet in the new home and vice versa, as long as your reason is reasonable, you'll be welcome to put it up for adoption again",
    },
  ];

  const [modelIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <PetModal isOpen={modelIsOpen} setIsOpen={setModalIsOpen} />

      <div
        className="items-center w-10/12 grid-cols-2 mx-auto overflow-x-hidden md:grid md:py-14 lg:py-14 xl:py-14 lg:mt-3 xl:mt-5"
        data-aos="fade-right"
        data-aos-duration="800"
      >
        <div className="pr-2 md:mb-14 py-14 md:py-0">
          <h1 className="text-3xl font-semibold text-center md:text-start text-blue-900 xl:text-5xl lg:text-3xl">
            <span className="block w-full">Adopt a Pet</span>
          </h1>
          <p className="py-4 text-lg text-center md:text-start text-gray-500 2xl:py-8 md:py-6 2xl:pr-5">
            Every Pet Deserves a Good Home.
          </p>
          <div className="mt-4 flex justify-center md:justify-start">
            <button
              
              className="px-5 py-3 text-lg tracking-wider text-white bg-[#2f0601] rounded-lg md:px-8 hover:bg-[#2f0601] group"
              onClick={() => setModalIsOpen(true)}
            >
              <span>Adopt</span>{" "}
            </button>
          </div>
        </div>

        <div className="pb-10 overflow-hidden lg:p-0 sm:pb-0">
          <img
            id="heroImg1"
            className="transition-all duration-300 rounded-xl hover:rounded-xl ease-in-out hover:scale-105 lg:w-full sm:mx-auto sm:w-5/6 sm:pb-12 lg:pb-0"
            src="images/img-2.jpg"
            alt="Awesome hero page image"
            width="500"
            height="488"
          />
        </div>
      </div>

      <div className="mb-5">
        <div className="border border-[#2f0601] h-0"></div>
      </div>

      <div className="w-full px-20 ">
        <h1 className="text-center sm:text-4xl text-2xl font-bold text-gray-700">
          Journey at Happy Pets
        </h1>
        <div className="sm:flex flex-row  gap-8 justify-between my-8">
          <div className="my-5">
            <div className="flex mx-auto gap-3 justify-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                viewBox="-1 0 136 136.21852"
                width="40"
              >
                <g id="surface1">
                  <path
                    d="M 93.148438 80.832031 C 109.5 57.742188 104.03125 25.769531 80.941406 9.421875 C 57.851562 -6.925781 25.878906 -1.460938 9.53125 21.632812 C -6.816406 44.722656 -1.351562 76.691406 21.742188 93.039062 C 38.222656 104.707031 60.011719 105.605469 77.394531 95.339844 L 115.164062 132.882812 C 119.242188 137.175781 126.027344 137.347656 130.320312 133.269531 C 134.613281 129.195312 134.785156 122.410156 130.710938 118.117188 C 130.582031 117.980469 130.457031 117.855469 130.320312 117.726562 Z M 51.308594 84.332031 C 33.0625 84.335938 18.269531 69.554688 18.257812 51.308594 C 18.253906 33.0625 33.035156 18.269531 51.285156 18.261719 C 69.507812 18.253906 84.292969 33.011719 84.328125 51.234375 C 84.359375 69.484375 69.585938 84.300781 51.332031 84.332031 C 51.324219 84.332031 51.320312 84.332031 51.308594 84.332031 Z M 51.308594 84.332031 "
                    style={{ fill: "#494949" }}
                  />
                </g>
              </svg>
              <h1 className="text-2xl font-bold text-gray-500">Search</h1>
            </div>
            <h1 className="text-base text-center text-gray-700 font-semibold">
              Simply enter your city start your search
            </h1>
          </div>
          <div className="my-5">
            <div className="flex mx-auto gap-3 justify-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                viewBox="-21 -47 682.66669 682"
                width="40"
              >
                <path
                  d="m552.011719-1.332031h-464.023438c-48.515625 0-87.988281 39.472656-87.988281 87.988281v283.972656c0 48.421875 39.300781 87.824219 87.675781 87.988282v128.871093l185.183594-128.859375h279.152344c48.515625 0 87.988281-39.472656 87.988281-88v-283.972656c0-48.515625-39.472656-87.988281-87.988281-87.988281zm-83.308594 330.011719h-297.40625v-37.5h297.40625zm0-80h-297.40625v-37.5h297.40625zm0-80h-297.40625v-37.5h297.40625zm0 0"
                  fill="#494949"
                ></path>
              </svg>
              <h1 className="text-2xl font-bold text-gray-500">Connect</h1>
            </div>
            <h1 className="text-base text-center text-gray-700 font-semibold">
              Connect with the owner to meet the pet you like
            </h1>
          </div>
          <div className="my-5">
            <div className="flex mx-auto gap-3 justify-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 469.333 469.333"
              >
                <g>
                  <path
                    d="M434.979,42.667H85.333c-1.053,0-2.014,0.396-3.001,0.693l-8.594-28.241C71.005,6.138,62.721,0,53.333,0H10.667    
                    C4.776,0,0,4.776,0,10.667V32c0,5.891,4.776,10.667,10.667,10.667h26.865l66.646,219.01l-24.891,29.039    
                    c-9.838,11.477-14.268,27.291-9.74,41.713c5.791,18.445,22.07,30.237,40.839,30.237H416c5.891,0,10.667-4.776,10.667-10.667    
                    v-21.333c0-5.891-4.776-10.667-10.667-10.667H110.385l33.813-39.448c0.85-0.992,1.475-2.112,2.12-3.219h206.703    
                    c16.533,0,31.578-9.548,38.618-24.507l74.434-158.17c2.135-4.552,3.26-9.604,3.26-14.615v-3.021    
                    C469.333,58.048,453.952,42.667,434.979,42.667z"
                    fill="#494949"
                  />
                  <circle cx="128" cy="426.667" r="42.667" fill="#494949" />
                  <circle cx="384" cy="426.667" r="42.667" fill="#494949" />
                </g>
              </svg>
              <h1 className="text-2xl font-bold text-gray-500">Adopt</h1>
            </div>
            <h1 className="text-base text-center text-gray-700 font-semibold">
              Finally adopt the pet you love
            </h1>
          </div>
        </div>
      </div>
      <div className="">
        <div className="border border-[#2f0601] h-0"></div>
      </div>
      <div className="mt-5">
        <h1 className="text-center sm:text-4xl mb-5 text-2xl font-bold text-gray-700">
          Adopt by Category
        </h1>

        <div className="flex justify-center lg:mx-20 md:mx-8 sm:mx-2">
          <div className=" grid sm:grid-cols-3 grid-flow-row">
            <button className="p-4 sm:mb-0 mb-2"
            onClick={()=>navigate("/adopt-a-pet/dogs#")}
            >
              <div className="rounded-lg sm:h-auto  h-52  overflow-hidden ">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src="/images/dog.jpg"
                />
              </div>

              <p className="text-indigo-500 inline-flex items-center mt-3">
                Adopt a Dog
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </p>
            </button>
            <button className="p-4 sm:mb-0 mb-2"
            onClick={()=>navigate("/adopt-a-pet/cats#")}
            >
              <div className="rounded-lg sm:h-auto  h-52 overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src="/images/cat.jpg"
                />
              </div>

              <p className="text-indigo-500 inline-flex items-center mt-3">
                Adopt a Cat
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </p>
            </button>
            <button className="p-4 sm:mb-0 mb-2"
            onClick={()=>navigate("/adopt-a-pet/birds#")}
            >
              <div className="rounded-lg sm:h-auto  h-52  flex overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src="/images/bird.jpg"
                />
              </div>

              <p className="text-indigo-500 inline-flex items-center mt-3">
                Adopt a Bird
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="sm:mx-10 mx-5 my-8">
        <h1 className="text-center sm:text-4xl mb-5 text-2xl font-bold text-gray-700">
          Some common questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              className="group [&_summary::-webkit-details-marker]:hidden"
              key={faq.q}
            >
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900">
                <h2 className="font-medium">{faq.q}</h2>

                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <p className="mt-4 px-4 leading-relaxed text-gray-700">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
      <div className="">
        <div className="border border-[#2f0601] h-0"></div>
      </div>
    </>
  );
};

export default AdoptPage;
