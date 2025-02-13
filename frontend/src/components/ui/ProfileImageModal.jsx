import React from "react";
import Modal from "react-modal";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useSelector } from "react-redux";

Modal.setAppElement("#root"); // Ensure this is set to the root element

const ProfileImageModal = ({ imageUrl, isOpen, setIsOpen }) => {
  const profileImage = useSelector((state) => state.auth.userData.profileImage);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className="flex items-center justify-center  bg-white p-6 rounded-lg shadow-xl"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="flex flex-col items-center">
        <Zoom>
          <img
            src={profileImage} // Use passed imageUrl prop
            alt="Profile"
            className="w-64 h-64 object-cover rounded-full cursor-pointer"
          />
        </Zoom>
        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ProfileImageModal;
