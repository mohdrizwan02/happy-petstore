import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/ApiError.js";

import { User } from "../models/user.model.js";

import { ApiResponse } from "../utils/ApiResponse.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

import jwt from "jsonwebtoken";

import mongoose from "mongoose";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: true });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      502,
      "somethig went wrong while generating access token and refresh token "
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const profileImageLocalFilePath = req.file?.path;

  const { fullName, username, email, password } = req.body;

  if (!username || !email || !password || !fullName) {
    throw new ApiError(401, "All fields are required");
  }

  const userExisted = await User.findOne({
    $or: [
      {
        email,
      },
      {
        username,
      },
    ],
  });
  if (userExisted) {
    throw new ApiError(409, "user already existed please login");
  }

  let cloudinaryFilePath;
  let response;

  if (!profileImageLocalFilePath) {
    cloudinaryFilePath = "";
  } else {
    response = await uploadOnCloudinary(profileImageLocalFilePath);
    if (!response) {
      throw new ApiError(500, "upload on cloudinary is failed");
    }
    cloudinaryFilePath = response.url;
  }

  console.log(cloudinaryFilePath);

  const user = await User.create({
    fullName,
    username,
    email,
    password,
    profileImage: cloudinaryFilePath,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(
      502,
      "something error occured while registering the user"
    );
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        user: createdUser,
      },
      "user has been registerd successfully"
    )
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({
    $or: [
      {
        email,
      },
      {
        username,
      },
    ],
  });

  if (!user) {
    throw new ApiError(404, "Invalid credentials :: user not found");
  }

  const passwordCorrect = await user.isPasswordCorrect(password);
  if (!passwordCorrect) {
    throw new ApiError(401, "invalid password");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, {
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user successfully logged out"));
});

const refreshTokens = asyncHandler(async (req, res) => {
  const incomingToken = req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingToken) {
    throw new ApiError(400, " Unauthorized request :: no token ");
  }

  const decodedToken = await jwt.verify(
    incomingToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  console.log(decodedToken);

  const user = await User.findById(decodedToken?._id);

  if (!user) {
    throw new ApiError(401, "user not found :: Invalid Refresh Token");
  }

  if (incomingToken !== user?.refreshToken) {
    throw new ApiError(
      401,
      "invalid refresh Token :: or token has expired or used"
    );
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
        },
        "Access and Refresh Tokens Refreshed"
      )
    );
});

const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(401, "password and confirm password are required");
  }

  const user = await User.findById(req.user._id);

  const passwordCorrect = user.isPasswordCorrect(currentPassword);

  if (!passwordCorrect) {
    throw new ApiError(400, "the old password is invalid");
  }

  user.password = newPassword;

  await user.save({
    validateBeforeSave: false,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, {}, "user password has been successfully updated")
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: req.user },
        "user has been fetched successfully"
      )
    );
});

const updateProfileImage = asyncHandler(async (req, res) => {
  const profileImageLocalPath = req.file?.path;
  console.log(profileImageLocalPath)

  if (!profileImageLocalPath) {
    throw new ApiError(400, "profile image is required");
  }

  console.log(profileImageLocalPath);

  const response = await uploadOnCloudinary(profileImageLocalPath);

  if (!response) {
    throw new ApiError(500, "the upload on cloundinary is failed");
  }

  const cloudinaryFilePath = response.url;

  if (!cloudinaryFilePath) {
    throw new ApiError(500, "cloudinary file upload not happened");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        profileImage: cloudinaryFilePath,
      },
    },
    {
      new: true,
    }
  ).select(" -password -refreshToken");

  console.log(user);

  if (!user) {
    throw new ApiError(400, "error occured while updating the profile image");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: user },
        "User profile Image is successfully updated "
      )
    );
});

const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "please provide a user Id");
  }

  const user = await User.findById(new mongoose.Types.ObjectId(userId)).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(400, "invalid user Id or user not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user,
      },
      "user has been successfully fetched"
    )
  );
});

const updateProfileDetails = asyncHandler(async (req, res) => {
  const {
    country,
    state,
    city,
    house,
    locality,
    mobileNumber,
    pincode,
    about,
    fullName,
  } = req.body;
  

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        address: {
          country,
          state,
          city,
          locality,
          pincode,
          house,
        },
        mobileNumber,
        about,
        fullName,
        userUpdated:true
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: user },
        "user details has been successfully updated"
      )
    );
});

const getUserBlogs = asyncHandler(async (req, res) => {
  console.log(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, { id: req.user._id }, "user id"));
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  const userProfile = await User.aggregate([
    {
      $match: {
        _id: user._id,
      },
    },
    {
      $lookup: {
        from: "blogs",
        localField: "_id",
        foreignField: "owner",
        as: "userBlogs",
      },
    },
    {
      $lookup: {
        from: "pets",
        localField: "_id",
        foreignField: "owner",
        as: "userPets",
      },
    },
    {
      $addFields: {
        blogsCount: {
          $size: "$userBlogs",
        },
        petsCount: {
          $size: "$userPets",
        },
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        profileImage: 1,
        address: 1,
        about:1,
        email: 1,
        mobileNumber: 1,
        userUpdated: 1,
        isAdmin: 1,
        userBlogs: 1,
        userPets: 1,
        blogsCount: 1,
        petsCount: 1,
      },
    },
  ]);



  if (!userProfile) {
    throw new ApiError(401, "user doesn't exist");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        userProfile[0],
        "user profile has been fetched successfully"
      )
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshTokens,
  changePassword,
  getCurrentUser,
  updateProfileImage,
  updateProfileDetails,
  getUserBlogs,
  getUserById,
  getUserProfile,
};
