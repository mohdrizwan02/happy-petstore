import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Carousel from "../components/ui/Carousel";

const ViewPet = () => {
  const { type, id } = useParams();
  const [pet, setPet] = useState();
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [images, setImages] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get(`/api/v1/pets/get-pet/${id}`)
      .then((response) => {
        setPet((prev) => response.data.data.pet);
        setDate((prev) => new Date(response.data.data.pet.createdAt));
        setImages((prev) => response.data.data.pet.images);
        console.log(response.data.data.pet);
      })
      .catch((error) => {
        toast.error("failed to fetch the pet invalid request", {
          position: "top-center",
        });
      });
  }, []);
  return (
    <>
      {pet ? (
        pet?.type === "dog" || pet?.type === "cat" ? (
          <div className="min-h-screen">
            <div className="flex justify-between md:mx-12 lg:mx-24 my-8 mx-5">
              <button
                className="flex justify-center items-center gap-1 text-[#2f0601] hover:underline"
                onClick={() => navigate(`/adopt-a-pet/${type}`)}
              >
                <IoMdArrowRoundBack /> back
              </button>
              <h1 className="bg-[#2f0601] text-white px-2 rounded-md">
                Posted on{" "}
                {`${date?.getDate()}-${date?.getMonth()}-${date?.getFullYear()}` ||
                  pet?.createdAt}
              </h1>
            </div>
            <div className="">
              <div className="border border-[#2f0601]/50 h-0"></div>
            </div>
            <div className="md:mx-12 lg:mx-24 my-8 mx-5">
              <h1 className="sm:text-4xl text-2xl font-medium text-gray-700">
                Hello !! My Name is {pet.name}.
              </h1>
              <div className="w-[90%] sm:w-[80%] lg:w-[70%] m-auto pt-11">
                <Carousel slides={images} />
              </div>
              <div className="mt-5">
                <div className="border border-[#2f0601]/50 h-0"></div>
              </div>
              <div className="mt-5">
                <h1 className="sm:text-4xl mb-2 text-2xl font-bold text-gray-700">
                  About Me
                </h1>
                <div className="flow-root mt-6">
                  <dl className="-my-3 divide-y-2  divide-[#2f0601]/50">
                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900 text-xl">
                        Breed
                      </dt>
                      <dd className="text-gray-700 text-xl sm:col-span-2">
                        {pet.breed}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-xl text-gray-900">
                        Pet ID
                      </dt>
                      <dd className="text-gray-700 text-xl sm:col-span-2">
                        {pet._id.slice(0, 5)}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900 text-xl">Age</dt>
                      <dd className="text-gray-700 text-xl sm:col-span-2">
                        {pet.age}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900 text-xl">
                        Gender
                      </dt>
                      <dd className="text-gray-700 text-xl sm:col-span-2">
                        {pet.gender}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900 text-xl">
                        Color
                      </dt>
                      <dd className="text-gray-700 text-xl sm:col-span-2">
                        {pet.color}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="mt-5">
                  <div className="border border-[#2f0601]/50 h-0"></div>
                </div>
              </div>
              <div className="mt-5">
                <h1 className="sm:text-4xl mb-2 text-2xl font-bold text-gray-700">
                  My Info
                </h1>
                <div className="grid lg:grid-cols-3 mt-5 text-lg sm:grid-cols-2 grid-cols-1">
                  {pet.isVaccinated ? (
                    <div className="flex justify-start gap-4 items-center">
                      <FaCheck className="text-green-600" />
                      <h1 className="">Pet is Vaccinated</h1>
                    </div>
                  ) : (
                    <div className="flex justify-start gap-4 items-center">
                      <ImCross className="text-red-600" />
                      <h1 className="">Pet is not Vaccinated</h1>
                    </div>
                  )}

                  {pet.isNeutered ? (
                    <div className="flex justify-start gap-4 items-center">
                      <FaCheck className="text-green-600" />
                      <h1 className="">Pet is Neutered</h1>
                    </div>
                  ) : (
                    <div className="flex justify-start gap-4 items-center">
                      <ImCross className="text-red-600" />
                      <h1 className="">Pet is not Neutered</h1>
                    </div>
                  )}
                  {pet.isSpayed ? (
                    <div className="flex justify-start gap-4 items-center">
                      <FaCheck className="text-green-600" />
                      <h1 className="">Spayed</h1>
                    </div>
                  ) : (
                    <div className="flex justify-start gap-4 items-center">
                      <ImCross className="text-red-600" />
                      <h1 className="">Not Spayed</h1>
                    </div>
                  )}

                  <div className="flex justify-start gap-4 items-center">
                    <FaCheck className="text-green-600" />
                    <h1 className="">Needs a loving Adopter</h1>
                  </div>
                  {pet.isGoodWithAnimals ? (
                    <div className="flex justify-start gap-4 items-center">
                      <FaCheck className="text-green-600" />
                      <h1 className="">good with other pets</h1>
                    </div>
                  ) : (
                    <div className="flex justify-start gap-4 items-center">
                      <ImCross className="text-red-600" />
                      <h1 className="">not good with other pets</h1>
                    </div>
                  )}
                  {pet.isGoodWithChildren ? (
                    <div className="flex justify-start gap-4 items-center">
                      <FaCheck className="text-green-600" />
                      <h1 className="">good with children</h1>
                    </div>
                  ) : (
                    <div className="flex justify-start gap-4 items-center">
                      <ImCross className="text-red-600" />
                      <h1 className="">not good with children</h1>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-5">
                <div className="border border-[#2f0601]/50 h-0"></div>
              </div>
              <div className="mt-5">
                <h1 className="sm:text-4xl mb-2 text-2xl font-bold text-gray-700">
                  Additional Info
                </h1>
                <div className="flex flex-col space-y-3">
                  <div className="">
                    <h1 className="font-medium text-gray-900 text-xl">
                      About Pet
                    </h1>
                    <h1 className="text-gray-700 text-xl">{pet.description}</h1>
                  </div>
                  <div className="">
                    <h1 className="font-medium text-gray-900 text-xl">
                      Reason for Adoption
                    </h1>
                    <h1 className="text-gray-700 text-xl">{pet.reason}</h1>
                  </div>
                  <div className="">
                    <h1 className="font-medium text-gray-900 text-xl">
                      Extra Care Tips
                    </h1>
                    {pet.careTips.length == 1 &&
                    pet.careTips?.some((tip) => tip === "") ? (
                      <h1 className="text-gray-700 text-xl">
                        {" "}
                        No extra care tips
                      </h1>
                    ) : (
                      pet.careTips?.map((tip, index) => (
                        <h1 className="text-gray-700 text-xl">{tip}</h1>
                      ))
                    )}
                  </div>
                  <div className="">
                    <h1 className="font-medium text-gray-900 text-xl">
                      Health Issues
                    </h1>
                    {pet.careTips.length == 1 &&
                    pet.careTips?.some((tip) => tip === "") ? (
                      <h1 className="text-gray-700 text-xl">
                        {" "}
                        No Health Issues
                      </h1>
                    ) : (
                      pet.careTips?.map((tip, index) => (
                        <h1 className="text-gray-700 text-xl">{tip}</h1>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="border border-[#2f0601]/50 h-0"></div>
              </div>

              <div className="mt-5">
                <h1 className="sm:text-4xl mb-2 text-2xl font-bold text-gray-700">
                  Contact Info
                </h1>
                <div className="flex flex-col space-y-3">
                  <div className="">
                    <h1 className="font-medium text-gray-900 text-xl">
                      Owner Name
                    </h1>
                    <h1 className="text-gray-700 text-xl">
                      {pet.contact?.fullName}
                    </h1>
                  </div>
                  <div className="">
                    <h1 className="font-medium text-gray-900 text-xl">
                      Mobile Number
                    </h1>
                    <h1 className="text-gray-700 text-xl">
                      {pet.contact?.phone}
                    </h1>
                  </div>
                  <div className="">
                    <h1 className="font-medium text-gray-900 text-xl">
                      Address
                    </h1>
                    <h1 className="text-gray-700 text-xl">
                      {pet.city + " , " + pet.state}
                    </h1>
                    <h1 className="text-gray-700 text-xl">
                      {pet.state + " , " + pet.pincode}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-screen">
            <div className="flex justify-between md:mx-12 lg:mx-24 my-8 mx-5">
              <button
                className="flex justify-center items-center gap-1 text-[#2f0601] hover:underline"
                onClick={() => navigate(`/adopt-a-pet/${type}`)}
              >
                <IoMdArrowRoundBack /> back
              </button>
              <h1 className="bg-[#2f0601] text-white px-2 rounded-md">
                Posted on{" "}
                {`${date?.getDate()}-${date?.getMonth()}-${date?.getFullYear()}` ||
                  pet?.createdAt}
              </h1>
            </div>
            <div className="">
              <div className="border border-[#2f0601]/50 h-0"></div>
            </div>
            <div className="md:mx-12 lg:mx-24 my-8 mx-5">
              <h1 className="sm:text-4xl text-2xl font-medium text-gray-700">
                Hello !! My Name is {pet.name}.
              </h1>
              <div className="w-[90%] sm:w-[80%] lg:w-[70%] m-auto pt-11">
                <Carousel slides={images} />
              </div>
              <div className="mt-5">
                <div className="border border-[#2f0601]/50 h-0"></div>
              </div>
              <div className="mt-5">
                <h1 className="sm:text-4xl mb-2 text-2xl font-bold text-gray-700">
                  About Me
                </h1>
                <div className="flow-root mt-6">
                  <dl className="-my-3 divide-y-2  divide-[#2f0601]/50">
                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900 text-xl">
                        Breed
                      </dt>
                      <dd className="text-gray-700 text-xl sm:col-span-2">
                        {pet.breed}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-xl text-gray-900">
                        Pet ID
                      </dt>
                      <dd className="text-gray-700 text-xl sm:col-span-2">
                        {pet._id.slice(0, 5)}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900 text-xl">
                        Gender
                      </dt>
                      <dd className="text-gray-700 text-xl sm:col-span-2">
                        {pet.gender}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900 text-xl">
                        Color
                      </dt>
                      <dd className="text-gray-700 text-xl sm:col-span-2">
                        {pet.color}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="mt-5">
                  <div className="border border-[#2f0601]/50 h-0"></div>
                </div>
                <div className="mt-5">
                  <h1 className="sm:text-4xl mb-2 text-2xl font-bold text-gray-700">
                    My Info
                  </h1>
                  <div className="grid lg:grid-cols-3 mt-5 text-lg sm:grid-cols-2 grid-cols-1">
                    <div className="flex justify-start gap-4 items-center">
                      <FaCheck className="text-green-600" />
                      <h1 className="">Needs a loving Adopter</h1>
                    </div>
                    {pet.isGoodWithAnimals ? (
                      <div className="flex justify-start gap-4 items-center">
                        <FaCheck className="text-green-600" />
                        <h1 className="">good with other pets</h1>
                      </div>
                    ) : (
                      <div className="flex justify-start gap-4 items-center">
                        <ImCross className="text-red-600" />
                        <h1 className="">not good with other pets</h1>
                      </div>
                    )}
                    {pet.isGoodWithChildren ? (
                      <div className="flex justify-start gap-4 items-center">
                        <FaCheck className="text-green-600" />
                        <h1 className="">good with children</h1>
                      </div>
                    ) : (
                      <div className="flex justify-start gap-4 items-center">
                        <ImCross className="text-red-600" />
                        <h1 className="">not good with children</h1>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-5">
                  <div className="border border-[#2f0601]/50 h-0"></div>
                </div>
                <div className="mt-5">
                  <h1 className="sm:text-4xl mb-2 text-2xl font-bold text-gray-700">
                    Additional Info
                  </h1>
                  <div className="flex flex-col space-y-3">
                    <div className="">
                      <h1 className="font-medium text-gray-900 text-xl">
                        About Pet
                      </h1>
                      <h1 className="text-gray-700 text-xl">
                        {pet.description}
                      </h1>
                    </div>
                    <div className="">
                      <h1 className="font-medium text-gray-900 text-xl">
                        Reason for Adoption
                      </h1>
                      <h1 className="text-gray-700 text-xl">{pet.reason}</h1>
                    </div>
                    <div className="">
                      <h1 className="font-medium text-gray-900 text-xl">
                        Extra Care Tips
                      </h1>
                      {pet.careTips.length == 1 &&
                      pet.careTips?.some((tip) => tip === "") ? (
                        <h1 className="text-gray-700 text-xl">
                          {" "}
                          No extra care tips
                        </h1>
                      ) : (
                        pet.careTips?.map((tip, index) => (
                          <h1 className="text-gray-700 text-xl">{tip}</h1>
                        ))
                      )}
                    </div>
                    <div className="">
                      <h1 className="font-medium text-gray-900 text-xl">
                        Health Issues
                      </h1>
                      {pet.careTips.length == 1 &&
                      pet.careTips?.some((tip) => tip === "") ? (
                        <h1 className="text-gray-700 text-xl">
                          {" "}
                          No Health Issues
                        </h1>
                      ) : (
                        pet.careTips?.map((tip, index) => (
                          <h1 className="text-gray-700 text-xl">{tip}</h1>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="border border-[#2f0601]/50 h-0"></div>
              </div>
              <div className="mt-5">
                <h1 className="sm:text-4xl mb-2 text-2xl font-bold text-gray-700">
                  Contact Info
                </h1>
                <div className="flex flex-col space-y-3">
                  <div className="">
                    <h1 className="font-medium text-gray-900 text-xl">
                      Owner Name
                    </h1>
                    <h1 className="text-gray-700 text-xl">
                      {pet.contact?.fullName}
                    </h1>
                  </div>
                  <div className="">
                    <h1 className="font-medium text-gray-900 text-xl">
                      Mobile Number
                    </h1>
                    <h1 className="text-gray-700 text-xl">
                      {pet.contact?.phone}
                    </h1>
                  </div>
                  <div className="">
                    <h1 className="font-medium text-gray-900 text-xl">
                      Address
                    </h1>
                    <h1 className="text-gray-700 text-xl">
                      {pet.city + " , " + pet.state}
                    </h1>
                    <h1 className="text-gray-700 text-xl">
                      {pet.state + " , " + pet.pincode}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="my-10">
          <h1 className="text-center">"Oops no pet found back to results"</h1>
        </div>
      )}
    </>
  );
};

export default ViewPet;
