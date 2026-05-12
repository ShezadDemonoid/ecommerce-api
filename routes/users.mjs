import express from "express";

import {
  deleteUser,
  getUsers,
  patchUser,
  postUser,
} from "../controllers/userController.mjs";

import { authMiddleware } from "../middleware/authMiddleware.mjs";
import { authorize } from "../middleware/authorize.mjs";

export const router = express.Router();

/*
  USER ACCESS RULES

  admin   -> full CRUD
  manager -> no access
  customer -> no access
*/

// Get users / Create user
router
  .route("/")
  .get(authMiddleware, authorize("admin"), getUsers)
  .post(authMiddleware, authorize("admin"), postUser);

// Update/Delete user
router
  .route("/:id")
  .patch(authMiddleware, authorize("admin"), patchUser)
  .delete(authMiddleware, authorize("admin"), deleteUser);
