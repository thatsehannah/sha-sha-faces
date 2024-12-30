import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

const Container = ({ className, children }: ContainerProps) => {
  return <main className={cn('', className)}>{children}</main>;
};

export default Container;
