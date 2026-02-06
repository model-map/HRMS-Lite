import { Router } from "express";
import { addEmployee } from "../controller/employees.js";

const router = Router();

router.post("/add", addEmployee);

export default router;
