import { Router } from "express";
import { addEmployee, getAllEmployees } from "../controller/employees.js";

const router = Router();

router.post("/add", addEmployee);
router.get("/all", getAllEmployees);

export default router;
