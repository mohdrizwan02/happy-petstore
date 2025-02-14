import React, { useState } from "react";

const RehomePage = () => {
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [breed, setBreed] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [color, setColor] = useState();
  const [isVaccinated, setIsVaccinated] = useState();
  const [isSpayed, setIsSpayed] = useState();
  const [isNeutered, setIsNeutered] = useState();
  const [healthIssues, setHealthIssues] = useState();
  const [careTips, setCareTips] = useState();
  const [description, setDescription] = useState();
  const [isGoodWithChildren, setIsGoodWithChildren] = useState();
  const [isGoodWithAnimals, setIsGoodWithAnimals] = useState();
  const [reason, setreason] = useState();
  const [currentStep, setCurrntStep] = useState(1);

  const types = [
    {
      name: "Dog",
      value: "dog",
      logo: "/public/images/dogLogo.png",
      breed: [
        {
          name: "d1",
          value: "d1",
        },
        {
          name: "d2",
          value: "d2",
        },
        {
          name: "d3",
          value: "d3",
        },
        {
          name: "d4",
          value: "d4",
        },
      ],
    },
    ,
    {
      name: "Cat",
      value: "cat",
      logo: "/public/images/catLogo.png",
      breed: [
        {
          name: "c1",
          value: "c1",
        },
        {
          name: "c2",
          value: "c2",
        },
        {
          name: "c3",
          value: "c3",
        },
        {
          name: "c4",
          value: "c4",
        },
        {
          name: "c5",
          value: "c5",
        },
      ],
    },
    {
      name: "Bird",
      value: "bird",
      logo: "/public/images/birdLogo.png",
      breed: [
        {
          name: "b1",
          value: "b1",
        },
        {
          name: "b2",
          value: "b2",
        },
        {
          name: "b3",
          value: "b3",
        },
        {
          name: "b4",
          value: "b4",
        },
      ],
    },
  ];

  const handleSubmit = () => {
    console.log(currentStep);
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
                    {types.map((item) => (
                      <label
                        className={`
                        flex flex-col items-center md:p-4 px-2 py-4  rounded-lg border-2 cursor-pointer
                        transition-all duration-200 hover:border-[#2f0601]
                        ${
                          type === item.value
                            ? "border-[#2f0601]"
                            : "border-gray-200"
                        }
                      `}
                        key={item.name}
                      >
                        <input
                          type="radio"
                          name="type"
                          value={item.value}
                          checked={type === item.value}
                          onChange={(e) => setType((prev) => e.target.value)}
                          className="sr-only"
                        />
                        <div className="container mx-auto">
                          <img src={item.logo} className="h-16 mx-auto" />

                          <h1 className="text-base text-center  font-medium">
                            {item.name}
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
                        types.map(
                          (item) =>
                            item.value === type &&
                            item.breed.map((item) => (
                              <option value={item.value} key={item.name}>
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
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder=""
                  />
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
                className=""
                onClick={() => setCurrntStep((prev) => prev - 1)}
              >
                previous
              </button>
            )}
            <button
              className=""
              onClick={() => {
                if (currentStep < 3) {
                  setCurrntStep((prev) => prev + 1);
                }
                if (currentStep === 3) {
                  handleSubmit();
                }
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RehomePage;
