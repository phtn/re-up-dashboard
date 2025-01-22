"use client";

import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const nav = pathname.split("/")[2];
  return (
    <header className="flex h-16 shrink-0 items-center py-1.5 ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#" className="font-bold capitalize text-xl">
                {nav ?? `sales`}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

interface TestDay {
  date: number;
  day: string;
  subject?: string;
  isActive?: boolean;
}

export function UpcomingEvents() {
  const tests: TestDay[] = [
    { date: 22, day: "Monday" },
    { date: 23, day: "Tuesday", subject: "Math", isActive: true },
    { date: 24, day: "Wednesday", subject: "Art", isActive: true },
    { date: 25, day: "Thursday" },
    { date: 26, day: "Friday" },
  ];

  return (
    <div className="px-4">
      <div className="flex items-center p-6 gap-3 mb-6">
        <h2 className="text-[28px] font-normal">Upcoming Tests</h2>
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <Calendar className="size-[18px]" />
          <span>Test Day</span>
        </div>
      </div>
      <div className="flex gap-3">
        {tests.map((test) => (
          <Card
            key={test.date}
            className={`flex size-[110px] flex-col items-center justify-center p-2 rounded-2xl border-0 ${
              test.isActive ? "bg-[#18181B] text-white" : "bg-[#F8F8F8]"
            }`}
          >
            <span className="text-[42px] font-normal leading-tight">
              {test.date}
            </span>
            <span className="text-sm mt-0.5">{test.day}</span>
            {test.subject && (
              <span className="mt-1 text-sm">{test.subject}</span>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
