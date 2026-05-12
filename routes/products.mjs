import express from "express";

import {
  deleteProduct,
  getProducts,
  patchProduct,
  postProduct,
} from "../controllers/productsController.mjs";

import { authMiddleware } from "../middleware/authMiddleware.mjs";
import { authorize } from "../middleware/authorize.mjs";

export const router = express.Router();

/*
  PRODUCT ACCESS RULES

  admin   -> full CRUD
  manager -> create/update/read
  customer -> read only
*/

// Get products
router
  .route("/")
  .get(authMiddleware, authorize("admin", "manager", "customer"), getProducts)
  .post(authMiddleware, authorize("admin", "manager"), postProduct);

// Update/Delete product
router
  .route("/:id")
  .patch(authMiddleware, authorize("admin", "manager"), patchProduct)
  .delete(authMiddleware, authorize("admin"), deleteProduct);
