import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import ClipLoader from "react-spinners/ClipLoader";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../store/authSlice.js";
import axios from "axios";
import { toast } from "react-toastify";

Modal.setAppElement("#root"); // Ensure this is set to the root element

const EditProfileImageModal = ({ imageUrl, isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const profileImage = useSelector((state) => state.auth.userData.profileImage);

  const handleUpdateImage = () => {
    setLoading((prev) => true);
    if (!file) {
      setLoading((prev) => false);
      setIsOpen(false);
    }

    if (file) {
      axios
        .patch(
          "/api/v1/users/update-profile-image",
          {
            profileImage: file,
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((response) => {
          dispatch(updateProfile(response.data.data.user));
          toast.success("user profile image has been successfully updated", {
            position: "top-center",
            delay: 1000,
          });
          setLoading((prev) => false);
          setIsOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleFileChange = (event) => {
    setFile((prev) => event.target.files[0]);
    const image = event.target.files[0];
    if (image) {
      setSelectedFile(URL.createObjectURL(image));
    }
  };

  useEffect(() => {
    setFile(null);
    setLoading((prev) => false);
    setSelectedFile(null);
  }, [isOpen]);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          className="flex items-center justify-center  bg-white p-6 rounded-lg shadow-xl"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />
            <img
              src={selectedFile || profileImage}
              alt="Profile Preview"
              className="w-64 h-64 object-cover rounded-full"
            />
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateImage}
                className="px-2 py-1 w-32 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
              >
                {loading ? (
                  <ClipLoader color={"white"} size={20} />
                ) : (
                  "update image"
                )}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default EditProfileImageModal;
