"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { IEmployee, useAppData } from "@/context/AppContext";
import axios from "axios";
import { Badge, Building2, User } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import EmployeeCard from "./EmployeeCard";

export default function Employee() {
  const { employeeId } = useParams<{ employeeId: string }>();

  const { employeeLoading, employees } = useAppData() as {
    employeeLoading: boolean;
    employees: IEmployee[];
  };

  const employee = employees?.find((c) => c._id === employeeId) || null;

  if (employeeLoading) {
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
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold">Employee Details</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            No such employee exists.
          </p>
        </div>

        <Separator className="mb-6" />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!employeeLoading && !employee) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-muted-foreground">
        No such employee exists.
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
