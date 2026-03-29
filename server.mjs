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

// Initialize Express app
const app = express();

// -------------------- MIDDLEWARE --------------------

// Parse incoming JSON requests
app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // Use env variable for frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// -------------------- ROUTES --------------------
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/employees", employeeRouter);

// -------------------- START SERVER --------------------
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("MongoDB connected");

    // Start Express server
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); // Exit if DB connection fails
  }
};

startServer();
