"use client";

import { Spinner } from "@/components/ui/spinner";
import { IEmployee, useAppData } from "@/context/AppContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EmployeesTable = ({ employees }: { employees: IEmployee[] }) => {
  return (
    <div className="grid w-full [&>div]:max-h-[300px] [&>div]:rounded [&>div]:border">
      <Table>
        <TableHeader>
          <TableRow className="*:whitespace-nowrap">
            <TableHead className="pl-4">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees.map((employee) => (
            <TableRow
              key={employee._id}
              className="*:whitespace-nowrap odd:bg-muted/50"
            >
              <TableCell className="pl-4">{employee._id}</TableCell>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>
                {new Date(employee.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button variant="default" size="sm" asChild>
                  <Link href={`/employees/${employee._id}`}>View details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default function Employees() {
  const { loading, employees } = useAppData() as {
    loading: boolean;
    employees: IEmployee[];
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Employees</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage and review all registered employees.
          </p>
        </div>

        <Separator className="mb-6" />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!employees) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground">
        Internal Server Error. Please try again later.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Employees</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage and review all registered employees.
        </p>
      </div>

      <Separator className="mb-6" />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Employee List</CardTitle>
        </CardHeader>
        <CardContent>
          <EmployeesTable employees={employees} />
        </CardContent>
      </Card>
    </div>
  );
}
