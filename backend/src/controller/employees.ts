import { Request, Response } from "express";
import { TryCatch } from "../utils/TryCatch.js";
import { CONSTANTS_DEPARTMENTS } from "../utils/constants.js";
import { Employee } from "../model/Employee.js";

// CONTROLLER TO ADD AN EMPLOYEE
export const addEmployee = TryCatch(async (req: Request, res: Response) => {
  const name = req.body?.name?.trim();
  const email = req.body?.email?.trim();
  const department = req.body?.department?.trim();
  //   Check if required fields exist
  if (!name || !email || !department) {
    return res.status(400).json({
      message:
        "Failed to create employee record - name, email, and department are required.",
    });
  }
  // Regex to validate names: allows letters (including accented), spaces, hyphens, and apostrophes; 2 to 50 characters long
  if (!name.match(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/)) {
    return res.status(400).json({
      message:
        "Failed to create employee record - Invalid name. Only letters, spaces, hyphens, and apostrophes are allowed (2–50 characters).",
    });
  }
  // Check if email provided is valid email
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res
      .status(400)
      .json({ message: `Failed to create employee record - Invalid email.` });
  }
  // Check if Department is one of ["HR", "Finance", "Marketing", "IT"]
  if (!CONSTANTS_DEPARTMENTS.includes(department)) {
    return res.status(400).json({
      message: `Failed to create employee record - Invalid department. Must be one of (HR, Finance, Marketing, IT)`,
    });
  }
  // If all details are good
  //   Find if employee with email already exists
  const employee = await Employee.findOne({ email });
  if (employee) {
    return res.status(409).json({
      message: "Employee with email id already exists",
      employee,
    });
  }
  // Create a new employee
  const newEmployee = await Employee.create({
    name,
    email,
    department,
  });
  return res.status(201).json({
    message: `Successfully created employee record`,
    employee: newEmployee,
  });
});

// CONTROLLER TO GET ALL EMPLOYEES
export const getAllEmployees = TryCatch(async (req: Request, res: Response) => {
  const employees = await Employee.find().sort({ createdAt: 1 });
  res.json({ employees });
});

// CONTROLLER TO DELETE AN EMPLOYEE
export const deleteEmployee = TryCatch(async (req: Request, res: Response) => {
  const employeeId = req.body?.employeeId?.trim() || null;
  // Check if employeeId is provided
  if (!employeeId) {
    return res.status(400).json({
      message: `Failed to delete employee - no employeeId provided`,
    });
  }

  // Find employee with provided employee id and delete
  const employee = await Employee.findByIdAndDelete({ _id: employeeId }); //Returns either deleted document or null
  // If there was no employee with provided id
  if (!employee) {
    return res.status(400).json({
      message: "Failed to delete employee - No such employee exists.",
    });
  }
  return res.json({
    message: `Successfully deleted employee`,
    employee,
  });
});
