import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !image) {
      toast.error("Some fields are empty", {
        position: "top-center",
      });
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    setLoading((prev) => true);
    setTimeout(() => {
      axios
        .post("/api/v1/blogs/add-blog", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          toast.success("Your Blog has been Successfully added", {
            position: "top-center",
          });
          setLoading((prev) => false);
          setContent((prev) => "");
          setImage((prev) => null);
          setPreview((prev) => null);
          setTitle((prev) => "");
        })
        .catch((error) => {
          setLoading((prev) => false);
          console.log(error);
          toast.error("error occurred while adding , please try again");
        });
    }, 2000);
  };
  return (
    <div className="min-h-screen  flex justify-start items-center p-4">
      <div className=" max-w-5xl w-full  p-6 rounded-lg ">
        <h2 className="text-2xl font-semibold mb-4">Create a Blog</h2>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block font-medium mb-3">Blog Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="w-full p-2 border border-gray-500 rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>

        {/* content Input */}
        <div className="mb-4">
          <label className="block font-medium mb-3">content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content..."
            rows={4}
            className="w-full p-2 border border-gray-500 rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Image Upload Box */}
        <div className="mb-4 max-w-md">
          <label className="block font-medium mb-3">Upload Image</label>
          {!preview ? (
            <label className="w-full h-40 border-2 border-dashed border-gray-500 flex items-center justify-center rounded-lg cursor-pointer text-gray-400 hover:border-blue-400">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              Click to Upload
            </label>
          ) : (
            <div className="relative w-full ">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <label className="bg-blue-500 text-white px-2 py-1 text-xs rounded cursor-pointer">
                  Edit
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e)}
                  />
                </label>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                  onClick={handleRemoveImage}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex sm:justify-end justify-center">
          {/* Submit Button */}
          <button
            className=" w-28 bg-[#2f0601] text-white p-2 rounded-lg hover:bg-[#2f0601]/85"
            onClick={handleSubmit}
          >
            {loading ? <ClipLoader
              size={20}
              color="white"
            /> : "Add Blog"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
