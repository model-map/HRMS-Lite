import { Request, Response } from "express";
import { TryCatch } from "../utils/TryCatch.js";
import { Employee } from "../model/Employee.js";
import { Attendance } from "../model/Attendance.js";

// CONTROLLER TO GET EMPLOYEE'S ATTENDANCES
export const getAttendance = TryCatch(async (req: Request, res: Response) => {
  const employeeId = req.params.employeeId;
  const employee = await Employee.findById({ _id: employeeId });
  if (!employee) {
    return res.status(400).json({
      message: `Failed to mark attendance - no employee found with the provided ID.`,
    });
  }
  //   Get all attendance for provided employee id
  const attendances = await Attendance.find({ employeeId }).sort({ date: 1 });

  return res.json({
    employee,
    attendances,
  });
});
