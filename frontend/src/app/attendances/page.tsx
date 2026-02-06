"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useAppData, IAttendance } from "@/context/AppContext";
import { Spinner } from "@/components/ui/spinner";

export default function EmployeeAttendanceChart() {
  const { attendanceLoading, attendances } = useAppData() as {
    attendanceLoading: boolean;
    attendances: IAttendance[];
  };

  if (attendanceLoading || !attendances) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  // Map data for chart
  const chartData = attendances.map((record) => ({
    employee: record.employee.name,
    attendance: record.attendances.filter((a) => a.status === "Present").length,
  }));

  const chartConfig = {
    attendance: {
      label: "Attendance",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Attendance</CardTitle>
        <CardDescription>Current attendance per employee</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{ left: 20, right: 20, top: 20, bottom: 20 }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="employee"
              tickLine={true}
              axisLine={true}
              tickMargin={10}
              padding={{ left: 20, right: 20 }}
              tickFormatter={(value) => value}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="attendance"
              fill="var(--color-attendance, #3b82f6)"
              barSize={40}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Attendance overview <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total attendance counts per employee
        </div>
      </CardFooter>
    </Card>
  );
}
