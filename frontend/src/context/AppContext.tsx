"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { IAttendanceStatus } from "@/lib/constants";

export interface IEmployee {
  _id: string;
  name: string;
  email: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AttendanceProp = {
  _id: string;
  employeeId: string;
  date: Date;
  status: IAttendanceStatus;
  createdAt: Date;
  updatedAt: Date;
};

export interface IAttendance {
  employee: IEmployee;
  attendances: AttendanceProp[];
}

interface AppContextType {
  employees: IEmployee[] | null;
  employeeLoading: boolean;
  attendanceLoading: boolean;
  attendances: IAttendance[] | null;
  setEmployees?: React.Dispatch<React.SetStateAction<IEmployee[] | null>>;
  setEmployeeLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setAttendanceLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setAttendances?: React.Dispatch<React.SetStateAction<IAttendance[] | null>>;
}

// create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// create provider
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [employees, setEmployees] = useState<IEmployee[] | null>(null);
  const [employeeLoading, setEmployeeLoading] = useState<boolean>(true);
  const [attendanceLoading, setAttendanceLoading] = useState<boolean>(true);
  const [attendances, setAttendances] = useState<IAttendance[] | null>(null);

  // USE EFFECT TO FETCH EMPLOYEES FROM BACKEND ON PAGE MOUNT
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/v1/employees/all`,
        );
        setEmployees(data.employees);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const message =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch employees";
          toast.error(
            `Failed to fetch employees. Error code ${status}: ${message}`,
          );
        } else if (error instanceof Error) {
          toast.error(`Failed to fetch employees - ${error.message}`);
        } else {
          toast.error(`Failed to fetch employees - Unknown error`);
        }
      } finally {
        setEmployeeLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // USE EFFECT TO FETCH ATTENDANCES WHENEVER `employees` CHANGES
  useEffect(() => {
    const fetchAttendances = async () => {
      const result: IAttendance[] = [];
      if (employees && employees?.length > 0) {
        for (const employee of employees) {
          try {
            const { data } = await axios.get(
              `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/v1/attendance/${employee._id}`,
            );
            result.push(data);
            setAttendanceLoading(false);
          } catch (error) {
            if (axios.isAxiosError(error)) {
              const status = error.response?.status;
              const message =
                error.response?.data?.message ||
                error.message ||
                "Failed to fetch employees";
              toast.error(
                `Failed to fetch employees. Error code ${status}: ${message}`,
              );
            } else if (error instanceof Error) {
              toast.error(`Failed to fetch employees - ${error.message}`);
            } else {
              toast.error(`Failed to fetch employees - Unknown error`);
            }
          } finally {
            setAttendanceLoading(false);
          }
        }
        setAttendances(result);
      }
    };
    fetchAttendances();
  }, [employees]);

  return (
    <AppContext
      value={{
        employees,
        setEmployees,
        employeeLoading,
        attendanceLoading,
        attendances,
        setAttendances,
      }}
    >
      {children}
    </AppContext>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppData must be used within AppProvider");
  }
  return context;
};
