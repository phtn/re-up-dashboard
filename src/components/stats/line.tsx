"use client";

import { Bar, BarChart, Line, LineChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  {
    revenue: 10400,
    subscription: 240,
  },
  {
    revenue: 14405,
    subscription: 300,
  },
  {
    revenue: 9400,
    subscription: 200,
  },
  {
    revenue: 8200,
    subscription: 278,
  },
  {
    revenue: 7000,
    subscription: 189,
  },
  {
    revenue: 9600,
    subscription: 239,
  },
  {
    revenue: 11244,
    subscription: 278,
  },
  {
    revenue: 26475,
    subscription: 189,
  },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  subscription: {
    label: "Subscriptions",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function CardStat() {
  return (
    <Card className="space-y-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-semibold tracking-tighter">
          Total Revenue
        </CardTitle>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardHeader>

      <CardContent className="pb-0 space-y-10">
        <div className="text-3xl font-sans font-light text-gray-600">
          $15,231.89
        </div>
        <ChartContainer config={chartConfig} className="h-[60px] w-full">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="revenue"
              stroke="var(--color-revenue)"
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export const BChart = () => (
  <Card className="space-y-3">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="font-semibold tracking-tighter">
        Subscriptions
      </CardTitle>

      <p className="text-xs text-muted-foreground">+180.1% from last month</p>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="text-3xl text-gray-600 font-sans h-full font-light flex flex-1">
        +2,350
      </div>
      <ChartContainer
        config={chartConfig}
        className="place-self-end h-[60px] w-full"
      >
        <BarChart data={data}>
          <Bar
            dataKey="subscription"
            fill="var(--color-subscription)"
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
);

const chartConfig2 = {
  actual: {
    label: "Actual",
    color: "hsl(var(--primary))",
  },
  forecast: {
    label: "Forecast",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const data2 = [
  {
    forecast: 400,
    actual: 240,
  },
  {
    forecast: 300,
    actual: 139,
  },
  {
    forecast: 200,
    actual: 980,
  },
  {
    forecast: 278,
    actual: 390,
  },
  {
    forecast: 189,
    actual: 480,
  },
  {
    forecast: 239,
    actual: 380,
  },
  {
    forecast: 349,
    actual: 430,
  },
];

export function MetricStat() {
  return (
    <Card>
      <CardHeader className="flex whitespace-nowrap justify-between w-full">
        <CardTitle className="font-semibold tracking-tighter">
          Today&apos;s Forecast x Actual
        </CardTitle>
        <CardDescription className="text-xs">
          Your sales is above the forecasted level by 5% so far.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <ChartContainer
          config={chartConfig2}
          className="w-full text-void md:h-[102px]"
        >
          <LineChart
            data={data2}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="forecast"
              stroke="var(--color-forecast)"
              strokeOpacity={0.5}
              activeDot={{
                r: 6,
                fill: "var(--color-forecast)",
              }}
            />
            <Line
              type="monotone"
              dataKey="actual"
              strokeWidth={2}
              stroke="var(--color-actual)"
              activeDot={{
                r: 8,
                style: { fill: "var(--color-actual)" },
              }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
