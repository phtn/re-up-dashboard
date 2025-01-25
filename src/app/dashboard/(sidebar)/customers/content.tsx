"use client";

import CustomerTable from "@/components/ui/table/customers";

export const Content = () => {
  return (
    <main>
      <div className="px-4">
        <div className="h-fit rounded-lg overflow-hidden border border-gray-400 w-full md:min-h-min">
          <CustomerTable />
        </div>

        <div className="h-24"></div>
      </div>
    </main>
  );
};
