import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { IEmployee, useAppData } from "@/context/AppContext";
import axios from "axios";
import { Badge, Building2, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const EmployeeCard = ({ employee }: { employee: IEmployee }) => {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const { setEmployees } = useAppData() as {
    setEmployees: React.Dispatch<React.SetStateAction<IEmployee[]>>;
  };
  const router = useRouter();

  const handleDelete = async (employeeId: string) => {
    try {
      setDeleteLoading(true);
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/v1/employees/delete`,
        {
          data: { employeeId },
        },
      );
      toast.success(data.message);
      //   REMOVE USER FROM employees
      const deletedEmployee: IEmployee = data.employee;
      setEmployees((prev) =>
        prev ? prev.filter((e) => e._id !== deletedEmployee._id) : prev,
      );
      router.push("/employees");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to delete employee - Unexpected error occured. Please try again later.";
        toast.error(message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          "Failed to delete employee - Unexpected error occured. Please try again later.",
        );
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Card className="relative max-w-xl overflow-hidden">
      {/* subtle top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-primary" />

      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <User className="h-6 w-6 text-muted-foreground" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-xl font-semibold">{employee.name}</h2>
            <p className="truncate text-sm text-muted-foreground">
              {employee.email}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4" />
            Department: {employee.department}
          </div>
          <Badge>{employee.department}</Badge>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Created</p>
            <p className="font-medium">
              {new Date(employee.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Last Updated</p>
            <p className="font-medium">
              {new Date(employee.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <Separator />
        <Button
          variant="destructive"
          className="w-full hover:cursor-pointer"
          onClick={() => handleDelete(employee._id)}
          disabled={deleteLoading}
        >
          {deleteLoading && <Spinner />}
          {!deleteLoading && <>Delete Employee</>}
        </Button>
        <Button className="w-full hover:cursor-pointer bg-chart-2" asChild>
          <Link href={`/attendances/${employee._id}`}>
            View Attendance Records
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
