"use client";

import { Spinner } from "@/components/ui/spinner";
import { useAppData } from "@/context/AppContext";

export default function Employees() {
  const { loading, employees } = useAppData();
  return (
    <div>
      {loading && <Spinner />}
      {!loading && !employees && (
        <>Internal Server Error. Please try again later</>
      )}
      {!loading && employees && JSON.stringify(employees)}
    </div>
  );
}
