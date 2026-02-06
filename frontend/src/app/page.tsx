"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Users, BarChart2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-muted/10 p-8">
      {/* Hero Section */}
      <div className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to Employee Management Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Quickly access employee records, track attendance trends, and manage
          your workforce with ease.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Employee Records Card */}
        <Link href="/employees">
          <Card className="hover:scale-105 transition-transform cursor-pointer border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Users className="w-6 h-6 text-primary" /> Employee Records
              </CardTitle>
              <CardDescription>View and manage all employees</CardDescription>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-muted-foreground">
              Explore employee details, departments, roles, and other vital
              information.
            </CardContent>
          </Card>
        </Link>

        {/* Attendance Graph Card */}
        <Link href="/attendances">
          <Card className="hover:scale-105 transition-transform cursor-pointer border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BarChart2 className="w-6 h-6 text-secondary" /> Attendance
                Graph
              </CardTitle>
              <CardDescription>
                Track employee attendance trends
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4 text-sm text-muted-foreground">
              Visualize attendance data with interactive charts and monitor team
              productivity.
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
