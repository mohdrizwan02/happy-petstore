import mongoose from "mongoose";
import { Pet } from "../models/pet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addPet = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    breed,
    gender,
    color,
    age,
    isVaccinated,
    isSpayed,
    isNeutered,
    isAdopted,
    date,
    description,
    isGoodWithChildren,
    isGoodWithAnimals,
    reason,
    careTips,
    healthIssues,
    country,
    state,
    city,
    pincode,
  } = req.body;

  const owner = req.user?._id;

  const images = req.files;

  let cloudinaryFilesPath = [];

  let imagesLocalPath = [];

  images.map((image) => {
    imagesLocalPath.push(image.path);
  });

  for (let i = 0; i < imagesLocalPath.length; i++) {
    const response = await uploadOnCloudinary(imagesLocalPath[i]);

    cloudinaryFilesPath[i] = response.url;
  }

  const createdPet = await Pet.create({
    name,
    type,
    breed,
    gender,
    color,
    age,
    images: cloudinaryFilesPath,
    isVaccinated,
    isSpayed,
    isNeutered,
    owner,
    adoptionStatus: {
      isAdopted,
      date,
    },
    careTips,
    healthIssues,
    description,
    isGoodWithChildren,
    isGoodWithAnimals,
    reason,
    location: {
      country,
      state,
      city,
      pincode,
    },
  });

  if (!createdPet) {
    throw new ApiError(500, "Failed to add the pet");
  }

  console.log(createdPet);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        pet: createdPet,
      },
      "pet has been successfully add for adoption"
    )
  );
});

const getPets = asyncHandler(async (req, res) => {
  const pets = await Pet.find({});

  return res.status(200)
  .json(
    new ApiResponse(
      200,
      {
        pets
      },
      "pets has been successfully fetched"
    )
  )



});

const getPetById = asyncHandler(async (req, res) => {
  const { petId } = req.params;
  console.log(petId);

  const pet = await Pet.findById(new mongoose.Types.ObjectId(petId));

  console.log(pet);

  if (!pet) {
    throw new ApiError(400, "pet not found :: invalid pet id");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        pet,
      },
      "pet has been successfully fetched"
    )
  );
});

const setPetAsAdopted = asyncHandler(async (req, res) => {
  const { petId } = req.params;

  const pet = await Pet.findById(new mongoose.Types.ObjectId(petId));
 
  if (String(pet.owner) !== String(req.user._id)) {
    throw new ApiError(
      400,
      "you are not the owner of this pet :: unauthorized request"
    );
  }

  pet.adoptionStatus.isAdopted = true;
  pet.adoptionStatus.date = Date();

  const updatedPet = await pet.save({
    validateBeforeSave: false,
  });

  if(!updatedPet){
    throw new ApiError(
      500,
      "occured and error while marking pet as adopted"
    )
  }

  return res.status(200)
  .json(
    new ApiResponse(
      200,
      {
        pet:updatedPet
      },
      "pet has been successfully marked adopted"
    )
  )

});


const removePet = asyncHandler ( async(req,res)=>{
    const {petId} = req.params

    const pet = await Pet.findById(new mongoose.Types.ObjectId(petId))

    if(!pet){
      throw new ApiError(
        400,
        "Pet not found or Invalid pet Id"
      )
    }

    if(String(pet.owner)!==String(req.user._id)){
      throw new ApiError(
        400,
        "you are not the owner :: unauthorized request"
      )
    }

   try {
     const response = await Pet.deleteOne({_id: petId})
     console.log(response)

     if (!response) {
      throw new ApiError(400, "error removing the pet or Invalid pet id");
    }

    if (response.deletedCount == 0) {
      return res.status(300).json(
        new ApiResponse(
          300,

          response,
          "Pet has been already removed"
        )
      );
    }

    if (response.deletedCount == 1) {
      return res
        .status(200)
        .json(
          new ApiResponse(200, response, "Pet has been successfully removed")
        );
    }

   } catch (error) {
      throw new ApiError(
        400,
        "invalid pet id"
      )
   }


} )




export { addPet, getPets, getPetById, setPetAsAdopted ,removePet};


