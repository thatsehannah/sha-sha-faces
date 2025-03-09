import { cn } from "@/lib/utils";
import React from "react";

type LeftSectionTypeProps = {
  title: string;
  className?: string;
};

const LeftSectionTitle = ({ title, className }: LeftSectionTypeProps) => {
  return (
    <div className='flex items-center px-4 gap-2 absolute top-5 left-8'>
      <div className='h-[1.5px] w-32 lg:w-56 bg-secondary-foreground' />
      <p
        className={cn(
          "text-2xl uppercase font-medium text-tertiary-foreground",
          className
        )}
      >
        {title}
      </p>
    </div>
  );
};

export default LeftSectionTitle;
