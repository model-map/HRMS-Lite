"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { AttendanceProp } from "@/context/AppContext";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { toast } from "sonner";

const AttendanceTable = ({
  attendances,
}: {
  attendances: AttendanceProp[];
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleStatus = async (
    e: React.MouseEvent<HTMLButtonElement>,
    attendanceId: string,
  ) => {
    const status = (e.currentTarget as HTMLButtonElement).textContent;
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/v1/attendance/${attendanceId}/update`,
        {
          status,
        },
      );
      toast.success(`${data.message} Please refresh the page to see changes.`);
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
    <div className="grid w-full [&>div]:max-h-[300px] [&>div]:rounded [&>div]:border">
      <Table>
        <TableHeader>
          <TableRow className="*:whitespace-nowrap">
            <TableHead className="pl-4">ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Marked At</TableHead>
            <TableHead>{/* EMPTY TABLE HEAD */}</TableHead>
            <TableHead>{/* EMPTY TABLE HEAD */}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {attendances.map((attendance) => (
            <TableRow
              key={attendance._id}
              className="*:whitespace-nowrap odd:bg-muted/50"
            >
              <TableCell className="pl-4">{attendance._id}</TableCell>
              <TableCell className="font-medium">
                {new Date(attendance.date).toLocaleDateString()}
              </TableCell>
              <TableCell>{attendance.status}</TableCell>
              <TableCell>
                {new Date(attendance.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  variant="default"
                  className="font-bold hover:cursor-pointer"
                  size="sm"
                  onClick={(e) => handleStatus(e, attendance._id)}
                  disabled={loading}
                >
                  Present
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  className=" font-semibold hover:cursor-pointer"
                  size="sm"
                  onClick={(e) => handleStatus(e, attendance._id)}
                  disabled={loading}
                >
                  Absent
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceTable;
