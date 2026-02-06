import mongoose, { Schema, Document } from "mongoose";
import { CONSTANTS_DEPARTMENTS, IDepartment } from "../utils/constants.js";

export interface IEmployee extends Document {
  name: string;
  email: string;
  department: IDepartment;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema: Schema<IEmployee> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      enum: CONSTANTS_DEPARTMENTS,
      default: "IT",
    },
  },
  {
    timestamps: true,
  },
);

export const Employee = mongoose.model<IEmployee>("Employee", schema);
