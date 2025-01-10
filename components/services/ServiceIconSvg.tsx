import { cn } from '@/lib/utils';
import React from 'react';

type ServiceIconSvgProps = {
  className?: string;
  svg: {
    pathData: string;
    properties: {
      [key: string]: string | undefined;
    };
  };
};

const ServiceIconSvg = ({ className, svg }: ServiceIconSvgProps) => {
  return (
    <svg
      className={cn('w-[12rem] h-[12rem] lg:w-[20rem] lg:h-[20rem]', className)}
      xmlns='http://www.w3.org/2000/svg'
      xmlSpace='preserve'
      {...svg.properties}
    >
      <path d={svg.pathData} />
    </svg>
  );
};

export default ServiceIconSvg;
