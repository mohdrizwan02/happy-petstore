import React from "react";
import { FaEdit } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";
import { Navigate, useNavigate } from "react-router";
import { MdOutlineBrokenImage } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import ProfileImageModal from "./ui/ProfileImageModal.jsx";
import EditProfileImageModal from "./ui/EditProfileImageModal.jsx";

const Profile = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [user, setUser] = useState();
  useEffect(() => {
    try {
      axios
        .get("/api/v1/users/get-user-profile")
        .then((response) => {
          setUser((prev) => response.data.data);
        })
        .catch((error) => {
          toast.error("error occurred while getting user profile", {
            position: "top-center",
          });
        });
    } catch (error) {
      console.log(error.status);
    }
  }, [editModalIsOpen]);

  const navigate = useNavigate();
  return (
    <>
      {user ? (
        <div className="bg-white max-w-screen sm:mx-20 mx-10 m-8 md:mx-28 lg:mx-44  min-h-screen">
          <div className="md:flex block my-5">
            <div className="md:w-[40%] rounded-lg ">
              <div className=" flex justify-center">
                <img
                  src={
                    user.profileImage
                      ? user.profileImage
                      : "images/dummy-profile.png"
                  }
                  height={300}
                  width={300}
                  alt=""
                  className="rounded-full h-52 w-52 object-cover object-center"
                />
              </div>
              <div className="flex justify-around mt-5">
                <button
                  className=" bg-[#2f0601] text-white hover:underline px-2 py-1 flex items-center rounded-lg gap-2 "
                  onClick={() => setModalIsOpen(true)}
                >
                  {" "}
                  View <MdOutlineBrokenImage className="" />
                </button>
                <EditProfileImageModal
                  imageUrl={
                    user.ProfileImage
                      ? user.ProfileImage
                      : "images/dummy-profile.png"
                  }
                  isOpen={editModalIsOpen}
                  setIsOpen={setEditModalIsOpen}
                />
                <ProfileImageModal
                  imageUrl={
                    user.ProfileImage
                      ? user.profileImage
                      : "images/dummy-profile.png"
                  }
                  isOpen={modalIsOpen}
                  setIsOpen={setModalIsOpen}
                />
                <button
                  className="bg-[#2f0601] text-white px-2 hover:underline py-1 flex items-center rounded-lg gap-2 "
                  onClick={() => setEditModalIsOpen(true)}
                >
                  {" "}
                  Edit <MdOutlineBrokenImage className="" />{" "}
                </button>
              </div>
            </div>
            <div className="mt-10 md:w-[60%] flex justify-between">
              <div className="">
                <h1 className="font-semibold  text-2xl md:text-3xl">
                  {user.fullName}
                </h1>
                <h1 className="text-lg flex items-center">
                  <LuUser className="mr-2 font-bold" /> {"  "}@ {user.username}
                </h1>
                <h1 className="text-black mt-5">{user.about}</h1>
              </div>
              <div className="">
                <button
                  className="bg-[#2f0601] px-3 py-1 flex text-xl items-center hover:text-[#2f0601] hover:bg-white hover:ring-2 hover:ring-inset hover:ring-[#2f0601] active:underline md:text-2xl text-white rounded-lg"
                  onClick={() => navigate("/profile/edit")}
                >
                  {" "}
                  <FaEdit />
                  edit
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="border border-[#2f0601] h-0"></div>
          </div>
          <div className="font-semibold my-5 text-xl md:text-2xl ">
            Contact Details :
            <div className="flex-col font-normal text-lg items-center gap-2">
              <div className=" sm:flex mt-3 justify-between">
                <div className="flex gap-2 items-center">
                  <MdOutlineMail /> Email
                </div>
                <div className="">{user.email}</div>
              </div>
            </div>
            <div className="flex-col font-normal text-lg items-center gap-2">
              <div className=" sm:flex mt-3  justify-between">
                <div className="flex gap-2 items-center">
                  <MdOutlineLocalPhone /> Phone
                </div>
                <div className="flex justify-start">
                  {user.mobileNumber ? user.mobileNumber : "00000000"}
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="border border-[#2f0601] h-0"></div>
          </div>
          <div className="font-semibold my-5 text-xl md:text-2xl ">
            <div className="flex-col font-normal text-lg items-center gap-2">
              <div className=" sm:flex mt-3  justify-between">
                <div className="flex gap-2 font-semibold items-center">
                  <MdOutlineHome className="text-2xl " /> Address
                </div>
                <div className="flex-col">
                  <div className="">
                    {user?.address?.house ? user.address.house : "xxxxx"} ,{" "}
                    {user?.address?.locality ? user.address.locality : "xxxxxxx"}{" "}
                  </div>
                  <div className="">
                    {user?.address?.city ? user.address.city : "xxxxxxxx"} ,{" "}
                    {user?.address?.pincode ? user.address.pincode : "000000"}{" "}
                  </div>
                  <div className="">
                    {user?.address?.state ? user?.address?.state : "xxxxxx"} ,
                    {user?.address?.country ? user?.address?.country : "xxxxxx"}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="border border-[#2f0601] h-0"></div>
          </div>
          <div className="font-semibold my-5 text-xl md:text-2xl ">
            <div className="flex justify-between items-center ">
              <div className="">My blogs</div>

              <button
                onClick={() => navigate("/profile/blogs")}
                className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-[#2f0601] hover:bg-white hover:text-[#2f0601] hover:ring-inset hover:ring-2 active:underline hover:ring-[#2f0601] active:bg-indigo-700 rounded-lg sm:mt-0"
              >
                Manage my Blogs
              </button>
            </div>

            <section className="">
              <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <ul className="grid gap-x-8 gap-y-10 mt-16 sm:grid-cols-2 lg:grid-cols-3">
                  {user.userBlogs?.map((blog) => (
                    <li
                      className="w-full mx-auto group sm:max-w-sm"
                      key={blog.title}
                    >
                      <a href="">
                        <img
                          src={blog.image}
                          loading="lazy"
                          alt=""
                          className="w-full rounded-lg"
                        />
                        <div className="mt-3 space-y-2">
                          <span className="block text-indigo-600 text-sm">
                            Added At {blog.createdAt.slice(0, 10)}
                          </span>
                          <h3 className="text-lg text-gray-800 duration-150 group-hover:text-indigo-600 font-semibold">
                            {blog.title}
                          </h3>
                          <p className="text-gray-600 text-sm duration-150 group-hover:text-gray-800">
                            {blog.content}
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div>Loading......</div>
      )}
    </>
  );
};

export default Profile;
