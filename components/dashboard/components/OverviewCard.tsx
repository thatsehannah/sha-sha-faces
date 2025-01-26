import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getStatusClasses } from '@/lib/utils';
import React from 'react';

type OverviewCardProps = {
  title: string;
  value: number;
  caption?: string;
};

const OverviewCard = ({ title, value, caption }: OverviewCardProps) => {
  console.log(title);

  return (
    <Card className='w-48 lg:w-64'>
      <CardHeader className='p-4 pb-1'>
        <CardTitle className={`capitalize text-xl font-light`}>
          <span className='uppercase font-bold tracking-wide'>{title}</span>{' '}
          Appointments
        </CardTitle>
      </CardHeader>
      <CardContent className='p-6 pt-0'>
        <p
          data-status={title}
          className={`text-4xl font-bold ${getStatusClasses(title)}`}
        >
          {value}
        </p>
        {caption && <p>{caption}</p>}
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
