import User from "../model/userModel.mjs";

const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};
const postUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const patchUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      returnOriginal: false,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      throw "No user found with this id";
    }
    res.status(200).json(user);
  } catch (error) {
    let message = typeof error === "string" ? error : "An error occured";
    if (error.kind === "ObjectId") {
      message = "Incorrect ID format";
    }
    res.status(400).json({ message });
  }
};

export { getUsers, postUser, patchUser, deleteUser };
