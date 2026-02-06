"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
    attendance: record.attendances.length,
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
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="employee"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              padding={{ left: 20, right: 20 }}
              tickFormatter={(value) => value} // employee name
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="attendance"
              type="natural"
              stroke="var(--color-attendance, #3b82f6)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
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
