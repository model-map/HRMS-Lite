import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { AttendanceProp, IAttendance } from "@/context/AppContext";
import Link from "next/link";

const AttendanceTable = ({
  attendances,
}: {
  attendances: AttendanceProp[];
}) => {
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
          {attendances.map((attendance) => (
            <TableRow
              key={attendance._}
              className="*:whitespace-nowrap odd:bg-muted/50"
            >
              <TableCell className="pl-4">{attendance._id}</TableCell>
              <TableCell className="font-medium">{attendance.name}</TableCell>
              <TableCell>{attendance.email}</TableCell>
              <TableCell>{attendance.department}</TableCell>
              <TableCell>
                {new Date(attendance.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  className="bg-chart-4 text-primary font-bold"
                  size="sm"
                  asChild
                >
                  <Link href={`/attendances/${attendance._id}`}>
                    View details
                  </Link>
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  className="bg-chart-2 text-primary-foreground font-semibold"
                  size="sm"
                  asChild
                >
                  <Link href={`/attendances/${attendance._id}`}>
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

export default AttendanceTable;
