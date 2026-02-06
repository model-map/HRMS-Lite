"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export interface IEmployee {
  _id: string;
  name: string;
  email: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AppContextType {
  employees: IEmployee[] | null;
  setEmployees?: React.Dispatch<React.SetStateAction<IEmployee[] | null>>;
  loading: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

// create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// create provider
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [employees, setEmployees] = useState<IEmployee[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  return <AppContext value={{ employees, loading }}>{children}</AppContext>;
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppData must be used within AppProvider");
  }
  return context;
};
