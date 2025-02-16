import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router";

const RehomePage = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState();
  const [color, setColor] = useState("");
  const [isVaccinated, setIsVaccinated] = useState();
  const [isSpayed, setIsSpayed] = useState();
  const [isNeutered, setIsNeutered] = useState();
  const [isGoodWithChildren, setIsGoodWithChildren] = useState();
  const [isGoodWithAnimals, setIsGoodWithAnimals] = useState();
  const [reason, setReason] = useState();
  const [currentStep, setCurrntStep] = useState(1);
  const [healthIssues, setHealthIssues] = useState([""]);
  const [careTips, setCareTips] = useState([""]);
  const [description, setDescription] = useState();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState(userData.mobileNumber || "");
  const [images, setImages] = useState(Array(6).fill(null));
  const [error, setError] = useState("");
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);

  const petTypes = useSelector((state) => state.pet.pets);
  const colors = useSelector((state) => state.pet.colors);
  const states = useSelector((state) => state.pet.states);

  

  const handleSubmit = (e) => {
    setLoading((prev) => true);
    console.log("Name:", name);
    console.log("Type:", type);
    console.log("Breed:", breed);
    console.log("Age:", age);
    console.log("Gender:", gender);
    console.log("Color:", color);
    console.log("Is Vaccinated:", isVaccinated);
    console.log("Is Spayed:", isSpayed);
    console.log("Is Neutered:", isNeutered);
    console.log("Is Good With Children:", isGoodWithChildren);
    console.log("Is Good With Animals:", isGoodWithAnimals);
    console.log("Reason:", reason);
    console.log("Current Step:", currentStep);
    console.log("Health Issues:", healthIssues);
    console.log("Care Tips:", careTips);
    console.log("Description:", description);
    console.log("Full Name:", fullName);
    console.log("Phone:", phone);
    console.log("Images:", images);
    console.log("State:", state);
    console.log("City:", city);
    console.log("Pincode:", pincode);

    if (
      !name ||
      !type ||
      !breed ||
      !age ||
      !gender ||
      !color ||
      !isVaccinated ||
      !isSpayed ||
      !isNeutered ||
      !isGoodWithChildren ||
      !isGoodWithAnimals ||
      !reason ||
      !description ||
      !fullName ||
      !phone ||
      !state ||
      !city ||
      !pincode ||
      !images.some((image) => image !== null)
    ) {
      setError((prev) => " Validation failed! Some fields are empty.");

      toast.error("Validation failed! Some fields are empty.", {
        position: "top-center",
      });
      setLoading((prev) => false);
      setCurrntStep((prev) => 1);
      return;
    }

    const formData = new FormData();

    // Append text fields
    formData.append("name", name);
    formData.append("type", type);
    formData.append("breed", breed);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("color", color);
    formData.append("isVaccinated", isVaccinated);
    formData.append("isSpayed", isSpayed);
    formData.append("isNeutered", isNeutered);
    formData.append("isGoodWithChildren", isGoodWithChildren);
    formData.append("isGoodWithAnimals", isGoodWithAnimals);
    formData.append("reason", reason);
    formData.append("description", description);
    formData.append("fullName", fullName);
    formData.append("phone", phone);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("pincode", pincode);

    // Append array fields as JSON strings
    formData.append("healthIssues", JSON.stringify(healthIssues));
    formData.append("careTips", JSON.stringify(careTips));

    // Append images as files
    images.forEach((image, index) => {
      if (image) {
        formData.append("images", image); // `images` matches your multer field name
      }
    });

    setTimeout(() => {
      axios
        .post("/api/v1/pets/add-pet", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response) {
            console.log("pet has been added successfully");
            setLoading((prev) => false);
            navigate("/profile");
            toast.success(
              "Your Pet has been successfully listed for adoption",
              {
                position: "top-center",
              }
            );
          }
        })
        .catch((error) => {
          toast.error("error adding your pet for listing please try again");
          setLoading((prev)=>false)
          navigate("/rehome-a-pet");
        });
    }, 2000);
  };

  const addCareTip = () => {
    if (!careTips.includes("")) {
      setCareTips([...careTips, ""]); // Add a new empty string for another tip
    } else return;
  };

  const removeCareTip = (index) => {
    if (careTips[index] === "") {
      const updatedTips = careTips.filter((_, i) => i !== index);
      setCareTips(updatedTips.length > 0 ? updatedTips : [""]); // Ensure at least one input remains
    }
  };

  const removehealthIssue = (index) => {
    if (healthIssues[index] === "") {
      const updatedIssues = healthIssues.filter((_, i) => i !== index);
      setHealthIssues(updatedIssues.length > 0 ? updatedIssues : [""]); // Ensure at least one input remains
    }
  };

  const addHealthIssue = () => {
    if (!healthIssues.includes("")) {
      setHealthIssues([...healthIssues, ""]);
    } else return;
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file; // Preview the image
      setImages(newImages);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null; // Set to null to remove the image
    setImages(newImages);
  };

  return (
    <>
      <div className="min-h-screen">
        <div className="my-8">
          <h1 className="text-center sm:text-4xl mb-5 text-2xl font-bold text-gray-700">
            Rehome a Pet
          </h1>
          {currentStep === 1 && (
            <div className="lg:mx-24 md:mx-16 sm:mx-10 mx-4 ">
              <h1 className="sm:text-2xl mb-2 text-xl font-bold text-[#2f0601]">
                Pet details
              </h1>
              <div className="">
                <div className="border border-[#2f0601]/50 h-0"></div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="mt-4 col-span-4 sm:col-span-3 md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Pet Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder=""
                    value={name}
                    onChange={(e) => setName((prev) => e.target.value)}
                  />
                </div>
                <div className="col-span-full sm:col-span-3 mt-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Pet Type ?
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {petTypes.map((pet, index) => (
                      <label
                        className={`
                        flex flex-col items-center md:p-4 px-2 py-4  rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:border-[#2f0601]
                        ${
                          type === pet.value
                            ? "border-[#2f0601]"
                            : "border-gray-200"
                        }
                      `}
                        key={index}
                      >
                        <input
                          type="radio"
                          name="type"
                          value={pet.value}
                          checked={type === pet.value}
                          onChange={(e) => setType((prev) => e.target.value)}
                          className="sr-only"
                        />
                        <div className="container mx-auto">
                          <img
                            src={`/public/images/${pet.value}Logo.png`}
                            className="h-16 mx-auto"
                          />

                          <h1 className="text-base text-center  font-medium">
                            {pet.name}
                          </h1>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="col-span-full mt-3">
                  <div className="">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Pet Breed ?
                    </label>
                    <select
                      id="breed"
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                      value={breed}
                      onChange={(e) => setBreed((prev) => e.target.value)}
                    >
                      <option defaultValue={""} hidden>
                        Select breed here
                      </option>
                      {type ? (
                        petTypes.map(
                          (pet) =>
                            pet.value === type &&
                            pet.breed.map((item, index) => (
                              <option value={item.value} key={index}>
                                {item.name}
                              </option>
                            ))
                        )
                      ) : (
                        <option value={""}>First select the pet type</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="col-span-full sm:col-span-3 lg:col-span-2  mt-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Pet Gender?
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label
                      className={`
                        flex flex-col items-center md:p-4 px-2 py-4  rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:border-[#2f0601]
                        ${
                          gender === "male"
                            ? "border-[#2f0601]"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <input
                        name="gender"
                        value="male"
                        type="radio"
                        onChange={(e) => setGender(e.target.value)}
                        checked={gender === "male"}
                        className="sr-only"
                      />
                      Male
                    </label>
                    <label
                      className={`
                        flex flex-col items-center md:p-4 px-2 py-4  rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:border-[#2f0601]
                        ${
                          gender === "female"
                            ? "border-[#2f0601]"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <input
                        name="gender"
                        value="female"
                        type="radio"
                        onChange={(e) => setGender(e.target.value)}
                        checked={gender === "female"}
                        className="sr-only"
                      />
                      Female
                    </label>
                  </div>
                </div>
                <div className="col-span-full  mt-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Pet Age?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <label
                      className={`
                        flex flex-col items-center md:p-4 px-2 py-4  rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:border-[#2f0601]
                        ${
                          age === "puppy"
                            ? "border-[#2f0601]"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <input
                        name="age"
                        value="puppy"
                        type="radio"
                        onChange={(e) => setAge(e.target.value)}
                        checked={age === "puppy"}
                        className="sr-only"
                      />
                      Puppyhood
                    </label>
                    <label
                      className={`
                        flex flex-col items-center md:p-4 px-2 py-4  rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:border-[#2f0601]
                        ${
                          age === "adolescence"
                            ? "border-[#2f0601]"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <input
                        name="age"
                        value="adolescence"
                        type="radio"
                        onChange={(e) => setAge(e.target.value)}
                        checked={age === "adolescence"}
                        className="sr-only"
                      />
                      Adolescence
                    </label>
                    <label
                      className={`
                        flex flex-col items-center md:p-4 px-2 py-4  rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:border-[#2f0601]
                        ${
                          age === "adult"
                            ? "border-[#2f0601]"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <input
                        name="age"
                        value="adult"
                        type="radio"
                        onChange={(e) => setAge(e.target.value)}
                        checked={age === "adult"}
                        className="sr-only"
                      />
                      Adulthood
                    </label>
                    <label
                      className={`
                        flex flex-col items-center md:p-4 px-2 py-4  rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:border-[#2f0601]
                        ${
                          age === "old" ? "border-[#2f0601]" : "border-gray-200"
                        }
                      `}
                    >
                      <input
                        name="age"
                        value="old"
                        type="radio"
                        onChange={(e) => setAge(e.target.value)}
                        checked={age === "old"}
                        className="sr-only"
                      />
                      Old
                    </label>
                  </div>
                </div>
                <div className="mt-4 col-span-4 sm:col-span-3 md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Pet Color
                  </label>
                  <select
                    id="breed"
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    value={color}
                    onChange={(e) => setColor((prev) => e.target.value)}
                  >
                    <option defaultValue={""} hidden>
                      select color
                    </option>
                    {colors.map((item, index) => (
                      <option value={item.value} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-full mt-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Pet Vaccination?
                  </label>
                  <div className="grid md:grid-cols-4 grid-cols-2  gap-4">
                    <label
                      className={`
                        flex flex-col items-center px-2 py-2  rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:border-[#2f0601]
                        ${
                          isVaccinated === true
                            ? "border-[#2f0601]"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <input
                        name="isVaccinated"
                        value={true}
                        type="radio"
                        onChange={(e) => setIsVaccinated((prev) => true)}
                        checked={isVaccinated === true}
                        className="sr-only"
                      />
                      Yes, Pet is Vaccinated
                    </label>
                    <label
                      className={`
                        flex flex-col items-center  px-2 py-2  rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:border-[#2f0601]
                        ${
                          isVaccinated === false
                            ? "border-[#2f0601]"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <input
                        name="isVaccinated"
                        value={false}
                        type="radio"
                        onChange={(e) => setIsVaccinated((prev) => false)}
                        checked={isVaccinated === false}
                        className="sr-only"
                      />
                      No, Pet is not Vaccinated
                    </label>
                  </div>
                </div>
                <div className="col-span-full mt-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Pet Neutered?
                  </label>
                  <div className="grid md:grid-cols-4 grid-cols-2  gap-4">
                    <label
                      className={`
                        flex flex-col items-center px-2 py-2  rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:border-[#2f0601]
                        ${
                          isNeutered === true
                            ? "border-[#2f0601]"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <input
                        name="isNeutered"
                        value={true}
                        type="radio"
                        onChange={(e) => setIsNeutered((prev) => true)}
                        checked={isNeutered === true}
                        className="sr-only"
                      />
                      Yes, Pet is Neutered
                    </label>
                    <label
                      className={`
                        flex flex-col items-center  px-2 py-2  rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:border-[#2f0601]
                        ${
                          isNeutered === false
                            ? "border-[#2f0601]"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <input
                        name="isNeutered"
                        value={false}
                        type="radio"
                        onChange={(e) => setIsNeutered((prev) => false)}
                        checked={isNeutered === false}
                        className="sr-only"
                      />
                      No, Pet is not Neutered
                    </label>
                  </div>
                </div>
                <div className="col-span-full mt-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Pet Spayed?
                  </label>
                  <div className="grid md:grid-cols-4 grid-cols-2  gap-4">
                    <label
                      className={`
                        flex flex-col items-center px-2 py-2  rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:border-[#2f0601]
                        ${
                          isSpayed === true
                            ? "border-[#2f0601]"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <input
                        name="isSpayed"
                        value={true}
                        type="radio"
                        onChange={(e) => setIsSpayed((prev) => true)}
                        checked={isSpayed === true}
                        className="sr-only"
                      />
                      Yes, Pet is Spayed
                    </label>
                    <label
                      className={`
                        flex flex-col items-center  px-2 py-2  rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:border-[#2f0601]
                        ${
                          isSpayed === false
                            ? "border-[#2f0601]"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <input
                        name="isSpayed"
                        value={false}
                        type="radio"
                        onChange={(e) => setIsSpayed((prev) => false)}
                        checked={isSpayed === false}
                        className="sr-only"
                      />
                      No, Pet is not Spayed
                    </label>
                  </div>
                </div>
                <div className="col-span-full mt-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Pet good with Animals?
                  </label>
                  <div className="grid md:grid-cols-4 grid-cols-2  gap-4">
                    <label
                      className={`
                        flex flex-col items-center px-2 py-2  rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:border-[#2f0601]
                        ${
                          isGoodWithAnimals === true
                            ? "border-[#2f0601]"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <input
                        name="isGoodWithAnimals"
                        value={true}
                        type="radio"
                        onChange={(e) => setIsGoodWithAnimals((prev) => true)}
                        checked={isGoodWithAnimals === true}
                        className="sr-only"
                      />
                      Yes, Pet is good with Animals
                    </label>
                    <label
                      className={`
                        flex flex-col items-center  px-2 py-2  rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:border-[#2f0601]
                        ${
                          isGoodWithAnimals === false
                            ? "border-[#2f0601]"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <input
                        name="isGoodWithAnimals"
                        value={false}
                        type="radio"
                        onChange={(e) => setIsGoodWithAnimals((prev) => false)}
                        checked={isGoodWithAnimals === false}
                        className="sr-only"
                      />
                      No, Pet is not good with Animals
                    </label>
                  </div>
                </div>
                <div className="col-span-full mt-3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Pet good with Children?
                  </label>
                  <div className="grid md:grid-cols-4 grid-cols-2  gap-4">
                    <label
                      className={`
                        flex flex-col items-center px-2 py-2  rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:border-[#2f0601]
                        ${
                          isGoodWithChildren === true
                            ? "border-[#2f0601]"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <input
                        name="isGoodWithChildren"
                        value={true}
                        type="radio"
                        onChange={(e) => setIsGoodWithChildren((prev) => true)}
                        checked={isGoodWithChildren === true}
                        className="sr-only"
                      />
                      Yes, Pet is good with Children
                    </label>
                    <label
                      className={`
                        flex flex-col items-center  px-2 py-2  rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:border-[#2f0601]
                        ${
                          isGoodWithChildren === false
                            ? "border-[#2f0601]"
                            : "border-gray-200"
                        }
                      `}
                    >
                      <input
                        name="isGoodWithChildren"
                        value={false}
                        type="radio"
                        onChange={(e) => setIsGoodWithChildren((prev) => false)}
                        checked={isGoodWithChildren === false}
                        className="sr-only"
                      />
                      No, Pet is not good with Children
                    </label>
                  </div>
                </div>

                <div className="my-5 col-span-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Why do you want to donate the Pet?
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type=""
                    placeholder=""
                    value={reason}
                    onChange={(e) => setReason((prev) => e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="lg:mx-24 md:mx-16 sm:mx-10 mx-4 ">
              <h1 className="sm:text-2xl mb-2 text-xl font-bold text-[#2f0601]">
                Additional details
              </h1>
              <div className="">
                <div className="border border-[#2f0601]/50 h-0"></div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="mt-4 col-span-4 ">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    About Pet?
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type=""
                    placeholder=""
                    value={description}
                    onChange={(e) => setDescription((prev) => e.target.value)}
                  />
                </div>
                <div className="mt-4 col-span-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Any Pet Care tips?
                    </label>
                    <button
                      onClick={addCareTip}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      + Add
                    </button>
                  </div>
                  {careTips.map((tip, index) => (
                    <div
                      className="flex gap-4 mb-2 justify-between"
                      key={index}
                    >
                      <input
                        key={index}
                        type="text"
                        value={tip}
                        onChange={(e) => {
                          let updatedTips = [...careTips];
                          updatedTips[index] = e.target.value;
                          setCareTips((prev) => updatedTips);
                        }}
                        placeholder={`tip ${index + 1}`}
                        className="block w-full p-2  border border-gray-300 rounded"
                      />
                      <button
                        onClick={() => removeCareTip(index)}
                        className="w-8 h-8 my-auto bg-red-500  text-white rounded-lg hover:bg-red-600"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 col-span-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Any Pet Health Issues?
                    </label>
                    <button
                      onClick={addHealthIssue}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      + Add
                    </button>
                  </div>
                  {healthIssues.map((issue, index) => (
                    <div
                      className="flex gap-4 mb-2 justify-between"
                      key={index}
                    >
                      <input
                        type="text"
                        value={issue}
                        onChange={(e) => {
                          let updatedIssues = [...healthIssues];
                          updatedIssues[index] = e.target.value;
                          setHealthIssues((prev) => updatedIssues);
                        }}
                        placeholder={`issue ${index + 1}`}
                        className="block w-full p-2  border border-gray-300 rounded"
                      />
                      <button
                        onClick={() => removehealthIssue(index)}
                        className="w-8 h-8 my-auto bg-red-500  text-white rounded-lg hover:bg-red-600"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 col-span-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Upload Images
                  </label>
                  <div className="grid sm:grid-cols-3 grid-cols-2 gap-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="relative  h-40 border border-gray-300 flex items-center justify-center rounded-lg overflow-hidden bg-gray-100"
                      >
                        {image ? (
                          <>
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Uploaded ${index}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-2 left-2 flex gap-2">
                              {/* Edit Image */}
                              <label className="bg-blue-500 text-white px-2 py-1 text-xs rounded cursor-pointer">
                                Edit
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleImageChange(index, e)}
                                />
                              </label>
                              {/* Remove Image */}
                              <button
                                className="bg-red-500 text-white px-2 py-1 text-xs rounded"
                                onClick={() => removeImage(index)}
                              >
                                Remove
                              </button>
                            </div>
                          </>
                        ) : (
                          <label className="cursor-pointer text-gray-500">
                            + Add Image
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleImageChange(index, e)}
                            />
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="lg:mx-24 md:mx-16 sm:mx-10 mx-4 ">
              <h1 className="sm:text-2xl mb-2 text-xl font-bold text-[#2f0601]">
                Owner details and Location
              </h1>
              <div className="">
                <div className="border border-[#2f0601]/50 h-0"></div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="md:col-span-2 col-span-4 mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    FullName
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder=""
                    value={fullName}
                    onChange={(e) => setFullName((prev) => e.target.value)}
                  />
                </div>
                <div className="md:col-span-2 col-span-4 mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder=""
                    value={phone}
                    onChange={(e) => setPhone((prev) => e.target.value)}
                  />
                </div>
                <div className="col-span-full mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    State
                  </label>
                  <select
                    id="city"
                    className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={state}
                    onChange={(e) => setState((prev) => e.target.value)}
                  >
                    <option defaultValue={""} hidden>
                      Select State
                    </option>
                    {states.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-full mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    City
                  </label>
                  <select
                    id="city"
                    className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={city}
                    onChange={(e) => setCity((prev) => e.target.value)}
                  >
                    <option defaultValue={""} hidden>
                      Select city
                    </option>
                    {state ? (
                      states.map(
                        (item) =>
                          item.value === state &&
                          item.cities.map((item, index) => (
                            <option value={item.value} key={index}>
                              {item.name}
                            </option>
                          ))
                      )
                    ) : (
                      <option> please select state</option>
                    )}
                  </select>
                </div>
                <div className="col-span-full mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Pincode
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder=""
                    value={pincode}
                    onChange={(e) => setPincode((prev) => e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
          <div
            className={`flex  lg:mx-24 md:mx-16 sm:mx-10 mt-10 mx-4
            ${currentStep === 1 ? "justify-end" : "justify-between"}
          `}
          >
            {currentStep > 1 && (
              <button
                className="p-2 text-white font-semibold w-20 rounded-lg bg-[#2f0601]"
                onClick={() => setCurrntStep((prev) => prev - 1)}
              >
                previous
              </button>
            )}
            <button
              className="p-2 text-white font-semibold w-20 rounded-lg bg-[#2f0601]"
              onClick={(e) => {
                if (currentStep < 3) {
                  setCurrntStep((prev) => prev + 1);
                }
                if (currentStep === 3) {
                  handleSubmit(e);
                }
              }}
            >
              {currentStep === 3 ? (
                loading ? (
                  <ClipLoader color={"white"} size={20} />
                ) : (
                  "submit"
                )
              ) : (
                "Next"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RehomePage;
