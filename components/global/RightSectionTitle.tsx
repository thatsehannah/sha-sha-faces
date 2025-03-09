import { cn } from "@/lib/utils";
import React from "react";

type RightSectionTypeProps = {
  title: string;
  className?: string;
};

const RightSectionTitle = ({ title, className }: RightSectionTypeProps) => {
  return (
    <div className='flex items-center px-4 gap-2 absolute top-5 right-8'>
      <p
        className={cn(
          "text-2xl uppercase font-medium text-tertiary-foreground",
          className
        )}
      >
        {title}
      </p>
      <div className='h-[1.5px] w-32 lg:w-56 bg-secondary-foreground' />
    </div>
  );
};

export default RightSectionTitle;
