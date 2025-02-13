import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      trim: true,
    },

    images: [
      {
        type: String,
      },
    ],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    type: {
      type: String,
      // required: true,
      lowercase: true,
    },

    breed: {
      type: String,
      // required: true,
      lowercase: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      // required: true,
    },

    color: {
      type: String,
    },

    age: {
      type: String,
    },

    isVaccinated: {
      type: Boolean,
      default: false,
    },

    isSpayed: {
      type: Boolean,
      default: false,
    },

    isNeutered: {
      type: Boolean,
      default: false,
    },

    healthIssues: [
      {
        type: String,
      },
    ],

    careTips: [
      {
        type: String,
      },
    ],

    adoptionStatus: {
      isAdopted: {
        type: Boolean,
        default: false,
      },
      date: {
        type: String,
      },
    },

    description: {
      type: String,
      // required: true,
    },

    isGoodWithChildren: {
      type: Boolean,
      default: true,
    },

    isGoodWithAnimals: {
      type: Boolean,
      default: true,
    },

    location: {
      country: {
        type: String,
        // required: true,
        trim: true,
      },
      state: {
        type: String,
        // required: true,
        trim: true,
      },
      city: {
        type: String,
        // required: true,
        trim: true,
      },
      pincode: {
        type: String,
        // required: true,
      },
    },

    reason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

petSchema.plugin(mongooseAggregatePaginate);

export const Pet = mongoose.model("Pet", petSchema);
