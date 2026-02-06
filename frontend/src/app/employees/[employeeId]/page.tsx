"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { IEmployee, useAppData } from "@/context/AppContext";
import { Badge, Building2, User } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const EmployeeCard = ({ employee }: { employee: IEmployee }) => {
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
      </CardContent>
    </Card>
  );
};

export default function Employee() {
  const { employeeId } = useParams<{ employeeId: string }>();

  const { loading, employees } = useAppData() as {
    loading: boolean;
    employees: IEmployee[];
  };

  const employee = employees?.find((c) => c._id === employeeId) || null;

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Employee Details</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage and review employee details.
          </p>
        </div>

        <Separator className="mb-6" />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground">
        Internal Server Error. Please try again later.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Employee Details</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage and review employee details.
        </p>
      </div>

      <Separator className="mb-6" />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Employee Details</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 items-center">
            {/* Left: employee info */}
            <EmployeeCard employee={employee} />

            {/* Right: illustration */}
            <div className="relative h-64 w-full">
              <Image
                src="/user.svg"
                alt="User illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
