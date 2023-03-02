import mongoose from "mongoose";

const productSchema = mongoose.schema({
  id: Number,
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
  images: [String],
});

export default mongoose.model("Product", productSchema);
