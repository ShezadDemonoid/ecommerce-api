import Product from "../model/productModel.mjs";

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
};
const postProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const patchProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        returnOriginal: false,
      }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      throw "No product found with this id";
    }
    res.status(200).json(product);
  } catch (error) {
    let message = typeof error === "string" ? error : "An error occured";
    if (error.kind === "ObjectId") {
      message = "Incorrect ID format";
    }
    res.status(400).json({ message });
  }
};

export { getProducts, postProduct, patchProduct, deleteProduct };
