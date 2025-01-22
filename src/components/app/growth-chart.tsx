import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GrowthChart() {
  return (
    <Card className="bg-gradient-to-b from-background to-emerald-500/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Indicators</CardTitle>
            <p className="text-sm text-muted-foreground">
              Growth Earning %2.6 From Last Year
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Daily
            </Button>
            <Button variant="ghost" size="sm">
              Monthly
            </Button>
            <Button variant="ghost" size="sm" className="text-emerald-500">
              Yearly
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-end">
          {/* This is a placeholder for the chart. In a real app, you'd use a charting library */}
          <div className="w-full h-[200px] rounded-lg bg-gradient-to-t from-emerald-500/20 to-transparent relative">
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500/50" />
            <div
              className="absolute bottom-0 left-0 right-0 h-[100px] border-r-2 border-emerald-500"
              style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">
              Total Earns ($5,948)
            </div>
            <div className="text-2xl">0.00675 BTC</div>
          </div>
          <div className="flex items-center gap-2 text-emerald-500">
            <span>+5.7%</span>
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
