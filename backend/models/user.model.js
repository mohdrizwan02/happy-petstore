import mongoose from "mongoose";

import jwt from "jsonwebtoken";

import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required "],
    },
    fullName: {
      type: String,

      trim: true,
    },
    mobileNumber: {
      type: Number,
    },
    profileImage : {
      type : String,
    },
    userUpdated:{
      type:Boolean,
      default:false,
    },
    address: {
      country: {
        type: String,

        trim: true,
      },
      state: {
        type: String,

        trim: true,
      },
      city: {
        type: String,

        trim: true,
      },
      pincode: {
        type: Number,
      },
      house: {
        type: String,
        trim: true,
      },
      locality: {
        type: String,
        trim: true,
      },
    },

    refreshToken: {
      type: String,
    },
    isAdmin :{
      type:Boolean,
      default : false,
    
    },
   about : {
    type:String
   }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  } catch (error) {
    console.log("error generating access token");
  }
};

userSchema.methods.generateRefreshToken = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
  } catch (error) {
    console.log("error generate the refresh token");
  }
};

export const User = mongoose.model("User", userSchema);
