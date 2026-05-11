import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: String,
  email: String,
  role: {
    type: String,
    enum: ["customer", "admin", "manager"],
    default: "customer",
  },
  address: {
    city: String,
    geo: {
      lat: Number,
      lng: Number,
    },
    street: String,
    suite: String,
    city: String,
    zipcode: String,
  },
  phone: String,
  website: String,
  company: {
    name: String,
    catchPhrase: String,
    bs: String,
  },
});

export default mongoose.model("User", userSchema);
