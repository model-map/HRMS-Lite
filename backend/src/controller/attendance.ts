import { Request, Response } from "express";
import { TryCatch } from "../utils/TryCatch.js";
import { Employee } from "../model/Employee.js";
import { Attendance, IAttendance } from "../model/Attendance.js";
import { CONSTANTS_ATTENDANCE_STATUS } from "../utils/constants.js";

export const markAttendance = TryCatch(async (req: Request, res: Response) => {
  const employeeId = req.params.employeeId;
  const date = req.body.date.trim();
  const status = req.body.status.trim();

  if (!employeeId || !date || !status) {
    return res.status(400).json({
      message:
        "Failed to mark employee attendance - employeeId, date, and status are required.",
    });
  }
  //   Check if employee with corresponding id exists
  const employee = await Employee.findById({ _id: employeeId });
  if (!employee) {
    return res.status(400).json({
      message: `Failed to mark attendance - no employee found with the provided ID.`,
    });
  }
  // Check if date is valid date
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return res.status(400).json({
      message: `Failed to mark attendance - Invalid Date`,
    });
  }

  // Check if status is either 'Present' or 'Absent'
  if (!CONSTANTS_ATTENDANCE_STATUS.includes(status)) {
    return res.status(400).json({
      message: `Failed to mark attendance - Invalid attendance status. Must be either of ${CONSTANTS_ATTENDANCE_STATUS}`,
    });
  }
  //   Check if an attendance with provided date already exists
  const attendanceOnDate = await Attendance.findOne({
    employeeId,
    date,
  });
  // If no record exists, create one with provided data
  let attendance: IAttendance | null = null;
  if (!attendanceOnDate) {
    attendance = await Attendance.create({
      employeeId: employeeId as string,
      date,
      status,
    });
  } else {
    // If record already exists then find by id and update
    attendance = await Attendance.findByIdAndUpdate(
      attendanceOnDate._id,
      { status },
      { new: true },
    );
  }
  res.json({
    employee,
    attendance,
  });
});

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

// CONTROLLER TO UPDATE EMPLOYEE'S ATTENDANCE
export const updateAttendance = TryCatch(
  async (req: Request, res: Response) => {
    const attendanceId = req.params.attendanceId;
    const status = req.body.status.trim();

    if (!attendanceId) {
      return res.status(400).json({
        message: `Failed to update attendance - no attendance found with the provided ID.`,
      });
    }

    // Check if status is either 'Present' or 'Absent'
    if (!CONSTANTS_ATTENDANCE_STATUS.includes(status)) {
      return res.status(400).json({
        message: `Failed to update attendance - Invalid attendance status. Must be either of ${CONSTANTS_ATTENDANCE_STATUS}`,
      });
    }

    //   Get attendance
    const attendance = await Attendance.findOne({ _id: attendanceId });

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found." });
    }

    if (attendance.status === status) {
      return res
        .status(409)
        .json({
          message: `Attendance is already marked as ${status}`,
          attendance,
        });
    }

    // Update status
    attendance.status = status;
    await attendance.save();

    return res
      .status(200)
      .json({ message: "Attendance updated successfully.", attendance });
  },
);
