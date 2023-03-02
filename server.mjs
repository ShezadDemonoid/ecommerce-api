import express from "express";
import dotenv from "dotenv";
import { router as usersRouter } from "./routes/users.mjs";
import { router as productsRouter } from "./routes/products.mjs";

import { connectDB } from "./config/db.mjs";
import mongoose from "mongoose";

dotenv.config();
mongoose.set("strictQuery", false);
await connectDB();

const port = process.env.PORT ? process.env.PORT : 3000;
const app = express();

app.use(express.json());
app.use("/users", usersRouter);

app.use("/products", productsRouter);

// async function readUsers() {
//   const data = await fs.readFile("users.json", "utf-8");
//   return JSON.parse(data);
// }
// async function writeUsers(users) {
//   await fs.writeFile("users.json", JSON.stringify(users, null, 2));
// }

// app.get("/users", async (req, res) => {
//   const users = await readUsers();
//   res.json(users);
// });

// app.post("/users", async (req, res) => {
//   const users = await readUsers();
//   users.push(req.body);
//   await writeUsers(users);
//   res.json(req.body);
// });

// app.patch("/users/:id", async (req, res) => {
//   let users = await readUsers();
//   const id = req.params.id;
//   let updatedUser = {};
//   users = users.map((user) => {
//     if (user.id.toString() === id) {
//       updatedUser = { ...user, ...req.body };
//       return updatedUser;
//     }

//     return user;
//   });
//   await writeUsers(users);
//   res.json(updatedUser);
// });

// app.delete("/users/:id", async (req, res) => {
//   let users = await readUsers();
//   const id = req.params.id;
//   users = users.filter((user) => user.id.toString() !== id);
//   await writeUsers(users);
//   res.send();
// });

app.listen(port);
