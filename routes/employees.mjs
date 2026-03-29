import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.mjs";

export const router = express.Router();

router.get("/", getEmployees); // Get all employees
router.get("/:id", getEmployee); // Get employee by ID
router.post("/", createEmployee); // Create new employee
router.put("/:id", updateEmployee); // Update employee
router.delete("/:id", deleteEmployee); // Delete employee
