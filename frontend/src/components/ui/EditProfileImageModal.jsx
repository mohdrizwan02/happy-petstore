import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Ensure this is set to the root element

const EditProfileImageModal = ({ imageUrl, onUpdate }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editedProfileImage,setEditedProfileImage] = useState()

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={() => setModalIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
      >
        Edit Profile Image
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="flex items-center justify-center min-h-screen bg-white p-6 rounded-lg shadow-xl"
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
            src={selectedFile || imageUrl}
            alt="Profile Preview"
            className="w-64 h-64 object-cover rounded-full"
          />
          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => setModalIsOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedFile) onUpdate(selectedFile);
                setModalIsOpen(false);
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
            >
              Update Image
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditProfileImageModal;
