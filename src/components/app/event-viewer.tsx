import { Card } from "../ui/card";

interface IEvent {
  date: number;
  day: string;
  subject?: string;
  isActive?: boolean;
}

export function UpcomingEvents() {
  const tests: IEvent[] = [
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
