// controllers/userController.mjs
import User from "../models/userModel.mjs";

// -------------------- GET ALL USERS --------------------
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// -------------------- CREATE A NEW USER --------------------
const postUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user); // 201 = Created
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// -------------------- UPDATE A USER --------------------
const patchUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }, // return updated doc & validate fields
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    let message = "An error occurred";

    if (error.kind === "ObjectId") {
      message = "Invalid user ID format";
      return res.status(400).json({ message });
    }

    res.status(500).json({ message });
  }
};

// -------------------- DELETE A USER --------------------
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    let message = "An error occurred";

    if (error.kind === "ObjectId") {
      message = "Invalid user ID format";
      return res.status(400).json({ message });
    }

    res.status(500).json({ message });
  }
};

// -------------------- EXPORT CONTROLLERS --------------------
export { getUsers, postUser, patchUser, deleteUser };
