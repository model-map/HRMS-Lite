export const CONSTANTS_DEPARTMENTS = [
  "HR",
  "Finance",
  "Marketing",
  "IT",
] as const;

export const CONSTANTS_ATTENDANCE_STATUS = ["Present", "Absent"] as const;

// Department = "HR" | "Finance" | "Marketing" | "IT"
export type IDepartment = (typeof CONSTANTS_DEPARTMENTS)[number];
export type IAttendanceStatus = (typeof CONSTANTS_ATTENDANCE_STATUS)[number];
