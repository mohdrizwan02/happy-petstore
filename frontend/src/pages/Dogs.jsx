import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

const Dogs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterSet, setIsFilterSet] = useState(false);
  const [breed, setBreed] = useState();
  const [color, setColor] = useState();
  const [loading, setLoading] = useState(true);
  const colors = useSelector((state) => state.pet.colors);
  const pets = useSelector((state) => state.pet.pets);
  const states = useSelector((state) => state.pet.states);
  const [state, setState] = useState();
  const [dogs, setDogs] = useState([]);
  const [filterDogs, setFilterDogs] = useState([]);
  const navigate = useNavigate();

  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading((prev) => true);
    setTimeout(() => {
      console.log(loading);
      console.log("after 2 seconds");
      try {
        axios.get("/api/v1/pets/dogs").then((response) => {
          console.log(response);
          setDogs((prev) => response.data.data.dogs);
          setLoading((prev) => false);
        });
      } catch (error) {
        console.log(error);
        toast.error("some error has been occured", {
          position: "top-center",
        });
      }
    }, 2000);
  }, []);

  const resetFilter = () => {
    window.scrollTo(0, 0);
    if (!isFilterSet) {
      setIsModalOpen((prev) => false);
      return;
    }
    if (!breed && !color && !state && !city && !pincode) {
      setIsModalOpen((prev) => false);
      return;
    }
    setBreed((prev) => "");
    setCity((prev) => "");
    setColor((prev) => "");
    setState((prev) => "");
    setIsModalOpen((prev) => false);
    setIsFilterSet((prev) => false);
    setLoading((prev) => true);
    setTimeout(() => {
      setLoading((prev) => false);
    }, 2000);
  };

  const handleFilter = () => {

    if (!breed && !color && !state && !city && !pincode) {
      setIsFilterSet((prev) => false);
      setIsModalOpen((prev) => false);
      return;
    }
    window.scrollTo(0, 0);

    setLoading((prev) => true);
    setIsFilterSet((prev) => true);
    setIsModalOpen((prev) => false);
    console.log(breed, color, city);

    setTimeout(() => {
      console.log("starting filter");
      try {
        axios
          .post("/api/v1/pets/dogs/filter", {
            breed,
            color,
            state,
            city,
            pincode,
          })
          .then((response) => {
            console.log(response);
            setFilterDogs((prev) => response.data.data.dogs);
            setLoading((prev) => false);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
        toast.error("some error has been occured", {
          position: "top-center",
        });
      }
    }, 2000);
  };

  return (
    <>
      <div className="w-full h-screen" id="#">
        <div className="flex justify-between my-6 items-center mx-5">
          <h1 className="text-center sm:text-4xl text-2xl font-bold text-gray-700">
            Dogs Available for Adoption
          </h1>
          {!loading && !isModalOpen && (
            <button
              className="bg-[#2f0601] flex items-center gap-2 active:text-[#2f0601] active:bg-white active:ring-inset  active:ring-2 active:ring-[#2f0601] text-white px-3 py-1 rounded-lg"
              onClick={() => setIsModalOpen((prev) => !prev)}
            >
              <FaFilter />
              <p className="font-bold">filter</p>
            </button>
          )}
        </div>
        <Modal
          isOpen={isModalOpen}
          shouldCloseOnOverlayClick={false}
          onRequestClose={() => setIsModalOpen(false)}
          className="flex items-center justify-center w-4/5  bg-white border-2 border-[#2f0601] p-6 rounded-lg shadow-xl"
          overlayClassName="fixed inset-0 bg-opacity-100 flex items-center justify-center"
          bodyOpenClassName="overflow-hidden"
        >
          <div className="w-full ">
            <div className="flex justify-end">
              <button
                className="justify-end bg-[#2f0601] text-white px-2 py-1 rounded-lg flex gap-1 items-center"
                onClick={() => setIsModalOpen((prev) => !prev)}
              >
                {" "}
                <MdClose className="" />
                <p>close</p>
              </button>
            </div>
            <div className="flex-col gap-3">
              <div className="w-full my-2">
                <label
                  htmlFor="breed"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Breed
                </label>
                <select
                  id="breed"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  value={breed}
                  onChange={(e) => setBreed((prev) => e.target.value)}
                >
                  <option defaultValue={""} hidden>
                    Select breed
                  </option>
                  {pets.map(
                    (pet) =>
                      pet.value === "dog" &&
                      pet.breed.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.name}
                        </option>
                      ))
                  )}
                </select>
              </div>
              <div className="w-full my-2">
                <label
                  htmlFor="state"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  State
                </label>
                <select
                  id="state"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  value={state}
                  onChange={(e) => setState((prev) => e.target.value)}
                >
                  <option defaultValue={""} hidden>
                    Select State
                  </option>
                  {states.map((state, index) => (
                    <option value={state.value} key={index}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full my-2">
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  City
                </label>
                <select
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  value={city}
                  onChange={(e) => setCity((prev) => e.target.value)}
                >
                  <option defaultValue={""} hidden>
                    Select city
                  </option>
                  {state ? (
                    states.map(
                      (item) =>
                        item.value === state &&
                        item.cities.map((city, index) => (
                          <option value={city.value} key={index}>
                            {city.name}
                          </option>
                        ))
                    )
                  ) : (
                    <option>please select state first</option>
                  )}
                </select>
              </div>
              <div className="w-full my-2">
                <label
                  htmlFor="color"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Color
                </label>
                <select
                  id="color"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  value={color}
                  onChange={(e) => setColor((prev) => e.target.value)}
                >
                  <option defaultValue={""} hidden>
                    Select color
                  </option>
                  {colors.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex mt-5 justify-between">
              <button
                className=" bg-red-500 py-2 px-3 rounded-lg"
                onClick={resetFilter}
              >
                Reset filters
              </button>
              <button
                className="bg-green-600 py-2 px-3 rounded-lg"
                onClick={handleFilter}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </Modal>
        <div className="">
          <div className="border border-[#2f0601]/50 h-0"></div>
        </div>
        <div className="mx-2">
          {loading ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : isFilterSet ? (
            <div className="mx-2 lg:mx-16 my-8">
              {filterDogs.length > 0 ? (
                <ul className="grid lg:gap-2 gap-4 md:gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {filterDogs.map((dog, index) => (
                    <li key={index} className="shadow-lg rounded-xl p-3">
                      <div className="w-full  h-60 sm:h-52 md:h-56">
                        <img
                          src={dog.images[0]}
                          className="w-full h-full object-cover object-center shadow-md rounded-xl"
                          alt=""
                        />
                      </div>
                      <div className="mt-4">
                        <h4 className="text-lg text-gray-700 font-semibold">
                          {dog.name}
                        </h4>
                        <h1>
                          {dog.gender} , {dog.age}
                        </h1>
                        <h1 className="">
                          {dog.city} , {dog.state}
                        </h1>
                        <div className="my-3">
                          <div className="border border-[#2f0601]/50 h-0"></div>
                        </div>
                        <h4 className="text-xl text-gray-700 font-semibold">
                          Contact details
                        </h4>
                        <h1 className="">Name : {dog.contact?.fullName}</h1>
                        <h1 className="">Phone : {dog.contact?.phone}</h1>
                        <div className="flex justify-center my-2">
                          <button
                            className="flex items-center gap-2 hover:underline"
                            onClick={() => navigate(`${dog._id}`)}
                          >
                            view more details <FaExternalLinkAlt />{" "}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mx-auto text-center md:text-3xl text-xl mt-20 ">
                  {" "}
                  OOPS! no Dogs found on these filter settings
                </div>
              )}
            </div>
          ) : (
            <div className="mx-2 lg:mx-16 my-8">
              {dogs.length > 0 ? (
                <ul className="grid lg:gap-2 gap-4 md:gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {dogs.map((dog, index) => (
                    <li key={index} className="shadow-lg rounded-xl p-3">
                      <div className="w-full h-60 sm:h-52 md:h-56">
                        <img
                          src={dog.images[0]}
                          className="w-full h-full object-cover object-center shadow-md rounded-xl"
                          alt=""
                        />
                      </div>
                      <div className="mt-4">
                        <h4 className="text-xl text-gray-700 font-semibold">
                          {dog.name}
                        </h4>

                        <h1>
                          {dog.gender} , {dog.age}
                        </h1>
                        <h1 className="">
                          {dog.city} , {dog.state}
                        </h1>
                        <div className="my-3">
                          <div className="border border-[#2f0601]/50 h-0"></div>
                        </div>
                        <h4 className="text-xl text-gray-700 font-semibold">
                          Contact details
                        </h4>
                        <h1 className="">Name : {dog.contact?.fullName}</h1>
                        <h1 className="">Phone : {dog.contact?.phone}</h1>
                        <div className="flex justify-center my-2">
                          <button
                            className="flex items-center gap-2 hover:underline"
                            onClick={() => navigate(`${dog._id}`)}
                          >
                            view more details <FaExternalLinkAlt />{" "}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mx-auto text-center md:text-3xl text-xl mt-20 ">
                  {" "}
                  OOPS! no Dogs found for adoption{" "}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dogs;
