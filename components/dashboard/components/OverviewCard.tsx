import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStatusClasses } from '@/lib/utils';
import React from 'react';

type OverviewCardProps = {
  title: string;
  value: number;
  caption?: string;
};

const OverviewCard = ({ title, value, caption }: OverviewCardProps) => {
  return (
    <Card className='w-42 lg:w-72'>
      <CardHeader className='p-4 pb-1'>
        <CardTitle className={`capitalize text-[1rem] lg:text-lg font-light`}>
          <span className='uppercase font-bold tracking-wide'>{title}</span>{' '}
          Appointments
        </CardTitle>
      </CardHeader>
      <CardContent className='p-6 pt-0'>
        <p
          data-status={title}
          className={`lg:text-3xl text-2xl font-bold ${getStatusClasses(
            title
          )}`}
        >
          {value}
        </p>
        {caption && <p>{caption}</p>}
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
