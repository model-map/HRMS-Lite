import mongoose, { Schema, Document } from "mongoose";
import {
  CONSTANTS_ATTENDANCE_STATUS,
  IAttendanceStatus,
} from "../utils/constants.js";

export interface IAttendance extends Document {
  employeeId: string;
  date: Date;
  status: IAttendanceStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema: Schema<IAttendance> = new Schema(
  {
    employeeId: {
      type: String,
      ref: "Employee",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    status: {
      type: String,
      enum: CONSTANTS_ATTENDANCE_STATUS,
      default: "Present",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Attendance = mongoose.model<IAttendance>("Attendance", schema);
