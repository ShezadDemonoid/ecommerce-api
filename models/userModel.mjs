import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["customer", "admin", "manager"],
      default: "customer",
    },

    address: {
      street: String,
      suite: String,
      city: String,
      zipcode: String,

      geo: {
        lat: Number,
        lng: Number,
      },
    },

    phone: String,

    website: String,

    company: {
      name: String,
      catchPhrase: String,
      bs: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
