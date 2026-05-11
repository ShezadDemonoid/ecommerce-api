// controllers/productController.mjs
import Product from "../models/productModel.mjs";

// -------------------- GET ALL PRODUCTS --------------------
const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message }); // Internal server error
  }
};

// -------------------- CREATE A NEW PRODUCT --------------------
const postProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body); // Create new product from request body
    res.status(201).json(product); // 201 = Created
  } catch (error) {
    res.status(400).json({ message: error.message }); // Bad request
  }
};

// -------------------- UPDATE A PRODUCT --------------------
const patchProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, // Product ID from URL
      req.body, // Updated fields
      { new: true, runValidators: true }, // Return updated doc & validate data
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    let message = "An error occurred";

    // Handle invalid ObjectId
    if (error.kind === "ObjectId") {
      message = "Invalid product ID format";
      return res.status(400).json({ message });
    }

    res.status(500).json({ message: error.message });
  }
};

// -------------------- DELETE A PRODUCT --------------------
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    let message = "An error occurred";

    if (error.kind === "ObjectId") {
      message = "Invalid product ID format";
      return res.status(400).json({ message });
    }

    res.status(500).json({ message });
  }
};

// -------------------- EXPORT CONTROLLERS --------------------
export { getProducts, postProduct, patchProduct, deleteProduct };
