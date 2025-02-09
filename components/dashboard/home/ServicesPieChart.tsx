'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import { Cell, Label, Pie, PieChart, Tooltip } from 'recharts';

type ServicesPieChartProps = {
  data: {
    service: string;
    total: number;
  }[];
};

const ServicesPieChart = ({ data }: ServicesPieChartProps) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [chartColors, setChartColors] = useState<string[]>([]);

  const getChartColors = (count: number) => {
    const colors = [];

    for (let i = 1; i <= count; i++) {
      const color = `--chart-${i}`;
      colors.push(color);
    }

    return colors;
  };

  const dataArr = Array.from(data);
  const onPieEnter = (index: number) => {
    setActiveIndex(index);
  };

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const colors = getChartColors(data.length);
    setChartColors(colors);
  }, [data.length]);

  return (
    <Card>
      <CardHeader className='pb-0'>
        <CardTitle className='text-2xl font-medium'>
          Popular Services Requested
        </CardTitle>
        <CardDescription>Totals</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <PieChart
          width={600}
          height={400}
        >
          <Pie
            activeIndex={activeIndex}
            data={Array.from(data)}
            dataKey='total'
            nameKey='service'
            innerRadius={70}
            onMouseEnter={onPieEnter}
            strokeWidth={5}
            style={{ cursor: 'pointer', outline: 'none' }}
          >
            {dataArr.map((_, idx) => (
              <Cell
                key={`cell-${idx}`}
                fill={`hsl(var(${chartColors[idx % chartColors.length]}))`}
              />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor='middle'
                      dominantBaseline='middle'
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className='fill-foreground text-3xl font-bold'
                      >
                        {currentYear}
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
          <Tooltip />
        </PieChart>
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
