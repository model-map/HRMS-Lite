"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, User, Building2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { IEmployee, useAppData } from "@/context/AppContext";
import { CONSTANTS_DEPARTMENTS } from "@/lib/constants";

type FormValues = {
  name: string;
  email: string;
  department: string;
};

export default function AddEmployee() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    department: CONSTANTS_DEPARTMENTS[0],
  });
  const [employeeLoading, setEmployeeLoading] = useState(false);
  const { setEmployees } = useAppData() as {
    setEmployees: React.Dispatch<React.SetStateAction<IEmployee[]>>;
  };
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmployeeLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/v1/employees/add`,
        values,
      );
      toast.success(data.message);
      const newEmployee: IEmployee = data.employee;
      setEmployees((prev) => [...prev, newEmployee]);
      router.push("/employees");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || error.message || "Request failed";
        toast.error(message);
      } else {
        toast.error("Unknown error");
      }
    } finally {
      setEmployeeLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/10 px-4">
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <Card className="overflow-hidden shadow-lg">
          {/* Top Accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-primary" />

          <CardHeader className="pb-4 pt-6 text-center">
            <CardTitle className="text-3xl font-semibold">
              Add Employee
            </CardTitle>
            <CardDescription className="mt-1 text-muted-foreground">
              Enter employee details below
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-6 pt-2">
            <div className="grid gap-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" /> Name
              </Label>
              <Input
                id="name"
                name="name"
                value={values.name}
                onChange={onChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" /> Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={onChange}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />{" "}
                Department
              </Label>
              <Select
                value={values.department}
                onValueChange={(value) =>
                  setValues((prev) => ({ ...prev, department: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {CONSTANTS_DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>

          <CardFooter className="pt-0">
            <Button
              type="submit"
              className="w-full gap-2"
              disabled={employeeLoading}
            >
              {employeeLoading ? (
                <Spinner />
              ) : (
                <>
                  Submit <ArrowRight />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
