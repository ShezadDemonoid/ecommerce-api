// server.mjs
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Import routers for different modules
import { router as usersRouter } from "./routes/users.mjs";
import { router as productsRouter } from "./routes/products.mjs";
import { router as employeeRouter } from "./routes/employees.mjs";

// Import MongoDB connection function
import { connectDB } from "./config/db.mjs";

// Load environment variables from .env file
dotenv.config();

// Disable strict query warnings in Mongoose
mongoose.set("strictQuery", false);

// Connect to MongoDB
await connectDB();

// Define server port from environment variable or fallback to 3000
const port = process.env.PORT ? process.env.PORT : 3000;

// Initialize Express app
const app = express();

// -------------------- MIDDLEWARE --------------------

// Parse incoming JSON requests
app.use(express.json());

// Enable CORS (allow requests from different origins)
app.use(
  cors({
    origin: "http://localhost:5173", // Replace "*" with your frontend URL in production for security
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  }),
);

// -------------------- ROUTES --------------------

// User-related routes
app.use("/api/users", usersRouter);

// Product-related routes
app.use("/api/products", productsRouter);

// Employee CRUD API routes
app.use("/api/employees", employeeRouter);

// -------------------- START SERVER --------------------
app.listen(port, () => console.log(`Server running on port ${port}`));
