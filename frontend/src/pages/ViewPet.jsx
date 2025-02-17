import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import Slider from "react-slick";

const ViewPet = () => {
 
  const { type, id } = useParams();
  const [pet, setPet] = useState();
  const navigate = useNavigate();
  const [date, setDate] = useState();

  useEffect(() => {
    axios
      .get(`/api/v1/pets/get-pet/${id}`)
      .then((response) => {
        setPet((prev) => response.data.data.pet);
        setDate((prev) => new Date(response.data.data.pet.createdAt));
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
        <div className="min-h-screen">
          <div className="flex justify-between md:mx-12 lg:mx-24 my-8 mx-5">
            <button
              className="flex justify-center items-center gap-1 text-[#2f0601] hover:underline"
              onClick={() => navigate(`/adopt-a-pet/${type}`)}
            >
              <IoMdArrowRoundBack /> back
            </button>
            <h1 className="bg-[#2f0601] text-white px-1 rounded-md">
              Posted on{" "}
              {`${date?.getDate()}-${date?.getMonth()}-${date?.getFullYear()}` ||
                pet?.createdAt}
            </h1>
          </div>
          <div className="">
            
          </div>
        </div>
      ) : (
        <div className="my-10">
          <h1 className="text-center">"Oops no pet found back to results"</h1>
        </div>
      )}
    </>
  );
};

export default ViewPet;
