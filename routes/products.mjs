import express from "express";
import {
  deleteProduct,
  getProducts,
  patchProduct,
  postProduct,
} from "../controllers/productsController.mjs";

export const router = express.Router();

// router.get("/", getProducts);
// router.post("/", postProduct);
// router.patch("/:id", patchProducts);
// router.delete("/:id", deleteProducts);

router.route("/").get(getProducts).post(postProduct);
router.route("/:id").patch(patchProduct).delete(deleteProduct);
