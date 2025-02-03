import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import ClipLoader from "react-spinners/ClipLoader";

const Signup = () => {
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const handleSubmit = (e) => {
    setLoading((prev)=>true)
    e.preventDefault();
    if(!fullName || !email || !username || !password || !confirmPassword) {
      toast.error("All fields are required",{
        position:'top-center',
        pauseOnHover:false
      })
      setLoading((prev)=>false)
      return 
    }
    if (password !== confirmPassword) {
      console.log("password and confirm password should be same");
      toast.error("password and confirm password must be same",{
        position:"top-center",
        pauseOnHover:false
      })
      setLoading((prev)=>false)
      return;
    }

    try {
      axios
        .post("/api/v1/users/register", {
          username,
          fullName,
          email,
          password,
        })
        .then((signupResponse) => {
          console.log(signupResponse);
          if (signupResponse.status == 201) {
            console.log("user created successfully");
            axios
              .post("/api/v1/users/login", {
                email,
                password,
              })
              .then((loginResponse) => {
                setLoading((prev)=>false)
                toast.success("Loggedin Successfully",{
                  position:"top-center"
                })
                dispatch(login(loginResponse.data.data.user));
              })
              .catch((error) => {
                setLoading((prev)=>false)
                toast.error("error in logging in",{
                  position:"top-center"
                })
                console.log("error in logging in", error);
              });
          }
        })
        .catch((error) => {
          if(error.status==409){
            toast.error("user with these details already exists Please login")
          }
          setLoading((prev)=>false)
          console.log(error);
        });
    } catch (error) {
      setLoading((prev)=>false)
      console.log(error.message);
    }
  };
  return (
    <>
      <main className="w-full min-h-screen my-10 flex flex-col items-center justify-center px-4">
        <div className="max-w-sm w-full text-gray-600 space-y-5">
          <div className="text-center pb-8">
            <img
              src="/images/happy-pets-logo-black.png"
              width={200}
              className="mx-auto"
            />
            <div className="mt-5">
              <h3 className="text-gray-800 text-2xl font-bold underline sm:text-3xl">
                Register your account
              </h3>
            </div>
          </div>
          <form className="space-y-5">
            <div>
              <label className="font-medium">Full Name</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border   border-gray-600 focus:border-2 focus:border-[#2f0601] shadow-sm rounded-lg"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="font-medium">username</label>
              <input
                type="text"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border   border-gray-600 focus:border-2 focus:border-[#2f0601] shadow-sm rounded-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border   border-gray-600 focus:border-2 focus:border-[#2f0601] shadow-sm rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border   border-gray-600 focus:border-2 focus:border-[#2f0601] shadow-sm rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="font-medium">Confirm Password</label>
              <input
                type="password"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border   border-gray-600 focus:border-2 focus:border-[#2f0601] shadow-sm rounded-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full px-auto py-2 text-white font-medium bg-[#2f0601] items-center hover:bg-[#2f0601]  active:bg-white active:text-[#2f0601]  active:ring-offset active:ring-2 ring-[#2f0601] rounded-lg duration-150"
              onClick={handleSubmit}
            >
             {loading?<ClipLoader
              color={"white"} 
              size={23}
             /> :"Register"}
            </button>
          </form>
          <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100 active:ring-offset active:ring-2 active:ring-[#2f0601]">
            <svg
              className="w-5 h-5"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                fill="#4285F4"
              />
              <path
                d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                fill="#34A853"
              />
              <path
                d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                fill="#FBBC04"
              />
              <path
                d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <NavLink
              href="#"
              className="font-medium text-[#2f0601] hover:underline"
              to="/login"
            >
              Login
            </NavLink>
          </p>
        </div>
      </main>
    </>
  );
};

export default Signup;
