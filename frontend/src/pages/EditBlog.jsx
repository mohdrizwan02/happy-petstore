import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [preview, setPreview] = useState();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [blog, setBlog] = useState();

  const { blogId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setPageLoading(() => true);
    window.scrollTo(0, 0);
    setTimeout(() => {
      console.log(blogId);
      axios
        .get(`/api/v1/blogs/${blogId}`)
        .then((response) => {
          console.log(response);
          
          setBlog((prev) => response.data.data.blog);
          setTitle((prev) => response.data.data.blog.title);
          setContent((prev) => response.data.data.blog.content);
          setPreview((prev) => response.data.data.blog.image);
          setPageLoading((prev) => false);
        })
        .catch((error) => {
          setPageLoading((prev) => false);
          console.log(error);
        });
    }, 1500);
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Some fields are empty", {
        position: "top-center",
      });
      return;
    }

    setLoading((prev) => true);
    setTimeout(() => {
      axios
        .patch(`/api/v1/blogs/${blogId}/edit-blog`, {
          title,
          content,
        })
        .then((response) => {
          toast.success("Your Blog has been Successfully edited ", {
            position: "top-center",
          });
          setLoading((prev) => false);
          navigate("/profile");
          setContent((prev) => "");
          setTitle((prev) => "");
        })
        .catch((error) => {
          setLoading((prev) => false);
          console.log(error);
          toast.error("error occurred while adding , please try again",{
            position:"top-center"
          });
        });
    }, 2000);
  };
  return (
    <div className="">
      <div className="min-h-screen  flex justify-start items-center p-4">
        {pageLoading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : blog ? (
          <div className=" max-w-5xl w-full  p-6 rounded-lg ">
            <h2 className="text-2xl font-semibold mb-4">Edit Blog</h2>

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
              <label className="block font-medium mb-3">Blog Image</label>

              <div className="relative w-full ">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="flex sm:justify-end justify-center">
              {/* Submit Button */}
              <button
                className=" w-28 bg-[#2f0601] text-white p-2 rounded-lg hover:bg-[#2f0601]/85"
                onClick={handleUpdate}
              >
                {loading ? (
                  <ClipLoader size={20} color="white" />
                ) : (
                  "update Blog"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-10">
            <div className="">
              <h1 className="">failed to get blog go to profile</h1>
            </div>
            <div className="">
              <button className="bg-[#2f0601] text-white rounded-lg px-2 py-1">
                Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBlog;
