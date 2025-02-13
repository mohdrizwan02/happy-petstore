import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router"

const PetModal = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate()
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="flex items-center justify-center  bg-white p-6 rounded-lg shadow-xl"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="flex-row space-y-5 justify-center items-center">
          <h1 className="text-lg text-center">
            Select the choice of Pet you wat to have
          </h1>
          <div className="sm:flex gap-4 block justify-center">
            <button
              className="p-5  mx-24 sm:mx-0 text-[#2f0601] font-bold rounded-lg w-48 "
              onClick={() => navigate("/adopt-a-pet/dogs")}
            >
              <img src="/images/dog.jpg" className="h-28 mx-auto rounded-lg" />
              Dogs
            </button>

            <div className="sm:hidden my-2">
              <div className="border border-[#2f0601] h-0"></div>
            </div>

            <button
              className="p-5  mx-24 sm:mx-0 text-[#2f0601] font-bold rounded-lg w-48"
              onClick={() => navigate("/adopt-a-pet/cats")}
            >
              <img src="/images/cat.jpg" className="h-28 mx-auto rounded-lg" />
              Cats
            </button>

            <div className="sm:hidden my-2">
              <div className="border border-[#2f0601] h-0"></div>
            </div>

            <button
              className="p-5  mx-24 sm:mx-0 text-[#2f0601] font-bold rounded-lg w-48"
              onClick={() => navigate("/adopt-a-pet/birds")}
            >
              <img src="/images/bird.jpg" className="h-28 rounded-lg mx-auto" />
              Birds
            </button>
          </div>
          <div className="flex justify-center mt-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PetModal;
