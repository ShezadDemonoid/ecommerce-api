import express from "express";
import {
  deleteUser,
  getUsers,
  patchUser,
  postUser,
} from "../controllers/userController.mjs";

export const router = express.Router();

// router.get("/", getUsers);
// router.post("/", postUser);
// router.patch("/:id", patchUsers);
// router.delete("/:id", deleteUsers);

router.route("/").get(getUsers).post(postUser);
router.route("/:id").patch(patchUser).delete(deleteUser);
