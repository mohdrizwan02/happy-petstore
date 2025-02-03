import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import jwt from "jsonwebtoken";

const authentication = asyncHandler(async (req, res, next) => {

  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    
      
    if (!token) {
      throw new ApiError(400, "Unauthorized request :: Token not found");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const userId = decodedToken._id;

    const user = await User.findById(userId).select("-password -refreshToken");
    

    if (!user) {
      throw new ApiError(
        401,
        "unauthorization request :: Invalid Access Token"
      );
    }

   

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(
      401,
      error?.message || "JWT error :: unable to fetch token"
    );
  }
});

export { authentication };


