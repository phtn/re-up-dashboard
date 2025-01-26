"use client";
import SampleTable from "@/components/ui/table/index";

export const Content = () => {
  return (
    <main>
      <div className="px-4">
        <div className="h-fit rounded-lg overflow-hidden border border-gray-400 w-full md:min-h-min">
          <SampleTable />
        </div>

        <div className="h-24"></div>
      </div>
    </main>
  );
};
