import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.mjs";

import { authMiddleware } from "../middleware/authMiddleware.mjs";
import { authorize } from "../middleware/authorize.mjs";

export const router = express.Router();

/*
  EMPLOYEE ACCESS RULES

  admin   -> full CRUD
  manager -> read only
  customer -> no access
*/

// Get all employees
router.get("/", authMiddleware, authorize("admin", "manager"), getEmployees);

// Get one employee
router.get("/:id", authMiddleware, authorize("admin", "manager"), getEmployee);

// Create employee
router.post("/", authMiddleware, authorize("admin"), createEmployee);

// Update employee
router.put("/:id", authMiddleware, authorize("admin"), updateEmployee);

// Delete employee
router.delete("/:id", authMiddleware, authorize("admin"), deleteEmployee);
