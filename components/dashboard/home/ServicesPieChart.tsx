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
    pieChartLabel: string;
    total: number;
    fill: string;
  }[];
};

//TODO: figure out to create chart config dynamically
const ServicesPieChart = ({ data }: ServicesPieChartProps) => {
  //acc is the object (chartConfig) that we're building up
  //curr is the current service being processed from the data array
  const chartConfig2 = data.reduce((acc, item) => {
    acc[item.service] = { label: item.pieChartLabel, color: item.fill };

    //returning the iterator so it can be used in the next iteration
    return acc;
  }, {} as ChartConfig);

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
          config={chartConfig2}
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
