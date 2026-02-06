"use client";

import { Spinner } from "@/components/ui/spinner";
import { IAttendance, useAppData } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AttendanceTable from "./AttendanceTable";
import { useParams } from "next/navigation";

export default function Employees() {
  const { attendanceLoading, attendances } = useAppData() as {
    attendanceLoading: boolean;
    attendances: IAttendance[];
  };

  const params = useParams();
  const employeeId = params.employeeId;

  if (!attendances) {
    return <Spinner />;
  }

  const employeeRecord = attendances.find((c) => c.employee._id === employeeId);
  const employeeAttendances = employeeRecord?.attendances ?? [];

  if (attendanceLoading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Employees</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage and review all registered attendances.
          </p>
        </div>

        <Separator className="mb-6" />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Employee Attendance</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage and review an employee attendance.
        </p>
      </div>

      <Separator className="mb-6" />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Employee</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {employeeAttendances.length === 0 && (
            <div>No Attendance Records Found. Please mark an attendance.</div>
          )}
          {employeeAttendances.length > 0 && (
            <AttendanceTable attendances={employeeAttendances} />
          )}
          <Button variant="default">
            <Link href={`/attendances/${employeeId}/add`}>Mark Attendance</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
