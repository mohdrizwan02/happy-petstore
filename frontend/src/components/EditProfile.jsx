import React, { useEffect, useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateProfile } from "../store/authSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import ClipLoader from "react-spinners/ClipLoader.js";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [house, setHouse] = useState();
  const [locality, setLocality] = useState();
  const [pincode, setPincode] = useState();
  const [about, setAbout] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      axios
        .get("/api/v1/users/current-user")
        .then((response) => {
          setUser(response.data.data.user);
          setAbout(response.data.data.user.about);
          setCity(response.data.data.user.address.city);
          setCountry(response.data.data.user.address.country);
          setState(response.data.data.user.address.state);
          setLocality(response.data.data.user.address.locality);
          setPincode(response.data.data.user.address.pincode);
          setHouse(response.data.data.user.address.house);
          setMobileNumber(response.data.data.user.mobileNumber);
          let words = response.data.data.user.fullName.split(" ");
          setFirstName(words[0]);
          setLastName(words[1]);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const fullName = firstName + " " + lastName;
    setTimeout(() => {
      try {
        axios
          .patch("/api/v1/users/update-profile-details", {
            country,
            state,
            city,
            locality,
            pincode,
            about,
            mobileNumber,
            house,
            fullName,
          })
          .then((response) => {
            toast.success("user details has been successfully updated", {
              position: "top-center",
            });
            dispatch(updateProfile(response.data.data.user));
            setLoading((prev) => false);
            navigate("/profile");
          })
          .catch((error) => {
            toast.error("there was an error updating profile details", {
              position: "top-center",
            });
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }, 2000);
  };

  return (
    <>
      {user ? (
        <form className="md:mx-20 px-5 my-10 mx-10">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12 pt-12">
              <h2 className="text-base/7 font-semibold text-gray-900">
                Edit Profile
              </h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                This information will be displayed publicly.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4 ">
                  <label
                    htmlFor="username"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-[#2f0601] focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                        @
                      </div>
                      <input
                        required
                        id="username"
                        name="username"
                        value={user.username}
                        type="text"
                        disabled
                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    About
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 focus-ring-2 focus:ring-inset focus:ring-[#2f0601] placeholder:text-gray-400 focus:outline-2 ring-1 ring-black focus:-outline-offset-2  sm:text-sm/6"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </div>
                  <p className="mt-3 text-sm/6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-4 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="first-name"
                      name="first-name"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      autoComplete="given-name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 focus-ring-2 focus:ring-inset focus:ring-[#2f0601] placeholder:text-gray-400 focus:outline-2 ring-1 ring-black focus:-outline-offset-2  sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="last-name"
                      name="last-name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      autoComplete="family-name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 focus-ring-2 focus:ring-inset focus:ring-[#2f0601] placeholder:text-gray-400 focus:outline-2 ring-1 ring-black focus:-outline-offset-2  sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="col-span-4 sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Mobile Number
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="email"
                      name="email"
                      type="text"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 focus-ring-2 focus:ring-inset focus:ring-[#2f0601] placeholder:text-gray-400 focus:outline-2 ring-1 ring-black focus:-outline-offset-2  sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className=" col-span-4 ">
                  <label
                    htmlFor="username"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Email
                  </label>

                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-[#2f0601] focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"></div>
                    <input
                      required
                      id="username"
                      name="username"
                      type="text"
                      value={user.email}
                      disabled
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="country"
                      value={country}
                      name="country"
                      autoComplete="country-name"
                      onChange={(e) => setCountry(e.target.value)}
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 o focus-ring-2 focus:ring-inset focus:ring-[#2f0601]offset-1 outline-[#2f0601] focus:outline-2 ring-1 ring-black focus:-outline-offset-2  sm:text-sm/6"
                    >
                      <option value={"India"}>India</option>
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-3">
                  <label
                    htmlFor="street-address"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    House No
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="street-address"
                      name="street-address"
                      type="text"
                      contentEditable
                      value={house}
                      onChange={(e) => setHouse(e.target.value)}
                      autoComplete="street-address"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 focus-ring-2 focus:ring-inset focus:ring-[#2f0601] placeholder:text-gray-400 focus:outline-2 ring-1 ring-black focus:-outline-offset-2  sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="col-span-4 sm:col-span-3">
                  <label
                    htmlFor="street-address"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Locality
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="street-address"
                      name="street-address"
                      type="text"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      autoComplete="street-address"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 focus-ring-2 focus:ring-inset focus:ring-[#2f0601] placeholder:text-gray-400 focus:outline-2 ring-1 ring-black focus:-outline-offset-2  sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="col-span-4 sm:col-span-3 ">
                  <label
                    htmlFor="city"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="city"
                      name="city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      autoComplete="address-level2"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 focus-ring-2 focus:ring-inset focus:ring-[#2f0601] placeholder:text-gray-400 focus:outline-2 ring-1 ring-black focus:-outline-offset-2  sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-3">
                  <label
                    htmlFor="region"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="region"
                      name="region"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      type="text"
                      autoComplete="address-level1"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 focus-ring-2 focus:ring-inset focus:ring-[#2f0601] placeholder:text-gray-400 focus:outline-2 ring-1 ring-black focus:-outline-offset-2  sm:text-sm/6"
                    />
                  </div>
                </div>

                <div className="col-span-4 sm:col-span-3">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      required
                      id="postal-code"
                      name="postal-code"
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      autoComplete="postal-code"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 focus-ring-2 focus:ring-inset focus:ring-[#2f0601] placeholder:text-gray-400 focus:outline-2 ring-1 ring-black focus:-outline-offset-2  sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm/6 font-semibold text-gray-900"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>
            <button
              className="rounded-md bg-[#2f0601] px-3  h-10 w-20 text-base font-semibold text-white shadow-xs  hover:text-white hover:bg-[#2f0601]/75  "
              onClick={handleSubmit}
            >
              {loading ? <ClipLoader color={"white"} size={20} /> : "save"}
            </button>
          </div>
        </form>
      ) : (
        <div className="h-screen"> loading......</div>
      )}
    </>
  );
};

export default EditProfile;
