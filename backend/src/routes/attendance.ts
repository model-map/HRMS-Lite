import { Router } from "express";
import { getAttendance, markAttendance } from "../controller/attendance.js";

const router = Router();

router.get("/:employeeId", getAttendance);
router.post("/:employeeId/add", markAttendance);

export default router;
