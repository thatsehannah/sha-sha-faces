"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import React from "react";
import { Pie, PieChart } from "recharts";

type ServicesPieChartProps = {
  data: {
    service: string;
    total: number;
  }[];
};

//TODO: figure out to create chart config dynamically
const ServicesPieChart = ({ data }: ServicesPieChartProps) => {
  const chartConfig = {
    "bridal party": {
      label: "Bridal Party",
    },
    "full glam makeup application": {
      label: "Full Glam",
    },
    "virtual one on one makeup lesson": {
      label: "Virtual 1/1 Lesson",
    },
    "daily set rate": {
      label: "Daily Set Rate",
    },
    "one on one makeup lesson": {
      label: "1/1 Lesson",
    },
    "bridal consultation": {
      label: "Bridal Consult",
    },
    "bridal makeup": {
      label: "Bridal Makeup",
    },
    "house call/travel fee": {
      label: "House Call/Travel",
    },
  } satisfies ChartConfig;

  const dataArr = Array.from(data);

  return (
    <Card className='flex flex-col w-full'>
      <CardHeader>
        <CardTitle className='text-2xl font-medium'>
          Popular Services Requested
        </CardTitle>
        <CardDescription>Totals</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className='mx-auto max-h-[450px]'
        >
          <PieChart>
            <Pie
              data={dataArr}
              dataKey='total'
            />
            <ChartLegend
              content={<ChartLegendContent nameKey='service' />}
              className='-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center text-sm'
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='justify-center'>
        <div>
          <p className='text-muted-foreground'>
            Showing popular services requested
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServicesPieChart;
