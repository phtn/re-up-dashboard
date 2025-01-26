"use client";

import { Bar, BarChart, Line, LineChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "../ui/button";
import { Icon } from "../ui/icons";

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
    color: "var(--primary)",
  },
  subscription: {
    label: "Subscriptions",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

const CTitle = (props: { title: string }) => (
  <CardTitle className="md:font-semibold capitalize text-base md:text-[16px] tracking-tight text-foreground/60">
    {props.title}
  </CardTitle>
);

const CValue = (props: { value: string | number }) => (
  <div className="text-3xl font-geist-sans tracking-tight font-extrabold">
    {props.value}
  </div>
);

const CScope = (props: { scope: string }) => (
  <div className="flex items-end gap-1 rounded-md bg-gray-400/10 p-1.5">
    <p className="text-xs capitalize md:font-normal">{props.scope}</p>
    <Button variant={"ghost"} className="size-4 p-0">
      <Icon
        name="ChevRight"
        className="dark:text-gray-500 rotate-90 shrink-0"
      />
    </Button>
  </div>
);

const CTrend = (props: { trend: string }) => (
  <p className="text-xs font-light md:font-normal text-foreground/60">
    {props.trend}
  </p>
);

export function CardStat() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CTitle title="total revenue" />
        <CScope scope="today" />
      </CardHeader>

      <CardContent className="pb-0 space-y-4">
        <CValue value={"$15,231.89"} />
        <ChartContainer
          config={chartConfig}
          className="place-self-end h-[80px] md:h-[60px] w-full"
        >
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
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <CTitle title="subscriptions" />
      <CTrend trend="+180.1% from last month" />
    </CardHeader>
    <CardContent className="space-y-4 pb-0">
      <CValue value={"+2,350"} />
      <ChartContainer
        config={chartConfig}
        className="place-self-end h-[80px] md:h-[60px] w-full"
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
    color: "var(--primary)",
  },
  forecast: {
    label: "Forecast",
    color: "var(--primary)",
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
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CTitle title="Forecast" />
      </CardHeader>
      <CardContent className="pb-4">
        <ChartContainer config={chartConfig2} className="w-full md:h-[102px]">
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
            <ChartTooltip
              content={
                <ChartTooltipContent className="bg-white/5 backdrop-blur-md" />
              }
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
