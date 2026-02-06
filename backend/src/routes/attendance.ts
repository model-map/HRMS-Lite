import { Router } from "express";
import { getAttendance } from "../controller/attendance.js";

const router = Router();

router.get("/:employeeId", getAttendance);

export default router;
