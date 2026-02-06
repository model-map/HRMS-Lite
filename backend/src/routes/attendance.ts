import { Router } from "express";
import {
  getAttendance,
  markAttendance,
  updateAttendance,
} from "../controller/attendance.js";

const router = Router();

router.get("/:employeeId", getAttendance);
router.post("/:employeeId/add", markAttendance);
router.patch("/:attendanceId/update", updateAttendance);

export default router;
