import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

const Container = ({ className, children }: ContainerProps) => {
  return (
    <main className={cn('mx-auto max-w-6xl xl:max-w-7xl px-8', className)}>
      {children}
    </main>
  );
};

export default Container;
