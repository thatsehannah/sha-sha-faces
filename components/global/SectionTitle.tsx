import React from "react";

type SectionTypeProps = {
  title: string;
  alignment: "left" | "right";
};

const SectionTitle = ({ title, alignment }: SectionTypeProps) => {
  return (
    <div
      className={`flex items-center px-4 gap-2 absolute top-5 ${alignment}-8`}
    >
      {alignment === "left" && (
        <div className='h-[1.5px] w-32 lg:w-56 bg-secondary-foreground' />
      )}
      <p className='text-xl uppercase font-medium text-primary-foreground'>
        {title}
      </p>
      {alignment === "right" && (
        <div className='h-[1.5px] w-32 lg:w-56 bg-secondary-foreground' />
      )}
    </div>
  );
};

export default SectionTitle;
