import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

const Cats = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterSet, setIsFilterSet] = useState(false);
  const [breed, setBreed] = useState();
  const [color, setColor] = useState();
  const [loading, setLoading] = useState(true);
  const colors = useSelector((state) => state.pet.colors);
  const pets = useSelector((state) => state.pet.pets);
  const states = useSelector((state) => state.pet.states);
  const [state, setState] = useState();

  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();

  useEffect(() => {
    setLoading((prev) => true);
    setTimeout(() => {
      console.log(loading);
      console.log("after 2 seconds");
      try {
        axios.get("/api/v1/pets/cats").then((response) => {
          console.log(response);
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
    if (!isFilterSet) {
      setIsModalOpen((prev) => false);
      return;
    }
    if (!breed && !color && !city && !pincode) {
      setIsModalOpen((prev) => false);
      return;
    }
    setBreed((prev) => "");
    setCity((prev) => "");
    setColor((prev) => "");
    setIsModalOpen((prev) => false);
    setIsFilterSet((prev) => false);
    setLoading((prev) => true);
    setTimeout(() => {
      setLoading((prev) => false);
    }, 2000);
  };

  const handleFilter = () => {
    if (!breed && !color && !city && !pincode) {
      setIsFilterSet((prev) => false);
      setIsModalOpen((prev) => false);
      return;
    }

    setLoading((prev) => true);
    setIsFilterSet((prev) => true);
    setIsModalOpen((prev) => false);
    console.log(breed, color, city);

    setTimeout(() => {
      console.log("starting filter");
      try {
        axios
          .post("/api/v1/pets/cats/filter", {
            breed,
            color,
            city,
            pincode,
          })
          .then((response) => {
            console.log(response);
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
      <div className="w-full h-screen">
        <div className="flex justify-between my-6 items-center mx-5">
          <h1 className="text-center sm:text-4xl text-2xl font-bold text-gray-700">
            Cats Available for Adoption
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
                    (type) =>
                      type.value === "cat" &&
                      type.breed.map((item, index) => (
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
                        item.cities.map((city,index) => <option key={index}value={city.value}>{city.name}</option>)
                    )
                  ) : (
                    <option value={""}>please select the state</option>
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
                  <option value={""}>Select color</option>
                  <option value={"black"}>black</option>
                  <option value={"white"}>white</option>
                  <option value={"brown"}>brown</option>
                  <option value={"golden"}>golden</option>
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
        <div className="mx-5">
          {loading ? (
            <div className="">Loading ......</div>
          ) : isFilterSet ? (
            <div className="">filter cats</div>
          ) : (
            <div className="">unfilter cats</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cats;
