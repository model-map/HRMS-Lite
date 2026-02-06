import { Router } from "express";
import {
  addEmployee,
  deleteEmployee,
  getAllEmployees,
} from "../controller/employees.js";

const router = Router();

router.post("/add", addEmployee);
router.get("/all", getAllEmployees);
router.delete("/delete", deleteEmployee);

export default router;
