"use client";

import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CONSTANTS_ATTENDANCE_STATUS } from "@/lib/constants";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { IAttendance, useAppData } from "@/context/AppContext";

type AttendanceForm = {
  date?: Date;
  status: string;
};

export default function MarkAttendance({}) {
  const [values, setValues] = useState<AttendanceForm>({
    date: undefined,
    status: CONSTANTS_ATTENDANCE_STATUS[0],
  });
  const [loading, setLoading] = useState(false);
  const { setAttendances } = useAppData() as {
    setAttendances: React.Dispatch<React.SetStateAction<IAttendance[]>>;
  };
  const params = useParams();
  const employeeId = params?.employeeId;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.date || !values.status) return;

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/v1/attendance/${employeeId}/add`,
        {
          date: values.date,
          status: values.status,
        },
      );
      toast.success(data.message);

      // UPDATE ATTENDANCE HERE
      setAttendances((prev) => {
        if (!prev)
          return [
            {
              employee: data.employee,
              attendances: [data.attendance],
            },
          ];

        const index = prev.findIndex(
          (a) => a.employee._id === data.employee._id,
        );

        if (index !== -1) {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            attendances: [...updated[index].attendances, data.attendance],
          };
          return updated;
        } else {
          return [
            ...prev,
            {
              employee: data.employee,
              attendances: [data.attendance],
            },
          ];
        }
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to update attendance status";
        toast.error(message);
      } else if (error instanceof Error) {
        toast.error(`Failed to update attendance status: ${error.message}`);
      } else {
        toast.error(`Failed to update attendance status: Unknown error`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Mark Attendance</CardTitle>
          <CardDescription>Select date and status</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {/* Date Field */}
          <div className="grid gap-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full text-left border rounded-md px-3 py-2 bg-white dark:bg-muted"
                >
                  {values.date ? format(values.date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-md border shadow-md">
                <Calendar
                  mode="single"
                  selected={values.date}
                  onSelect={(date) => setValues((prev) => ({ ...prev, date }))}
                  autoFocus
                  className="rounded-md"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Status Field */}
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select
              value={values.status}
              onValueChange={(status) =>
                setValues((prev) => ({ ...prev, status }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CONSTANTS_ATTENDANCE_STATUS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Submit"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
