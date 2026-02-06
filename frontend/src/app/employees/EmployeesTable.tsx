import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { IEmployee } from "@/context/AppContext";
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
            <TableHead>{/* EMPTY TABLE HEAD */}</TableHead>
            <TableHead>{/* EMPTY TABLE HEAD */}</TableHead>
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
                <Button
                  className="bg-chart-4 text-primary font-bold"
                  size="sm"
                  asChild
                >
                  <Link href={`/employees/${employee._id}`}>View details</Link>
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  className="bg-chart-2 text-primary-foreground font-semibold"
                  size="sm"
                  asChild
                >
                  <Link href={`/attendances/${employee._id}`}>
                    View Attendance
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeesTable;
