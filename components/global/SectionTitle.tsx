import React from 'react';

type SectionTypeProps = {
  title: string;
  orientation: 'left' | 'right';
};

const SectionTitle = ({ title, orientation }: SectionTypeProps) => {
  return (
    <div className='relative'>
      <div
        className={`flex items-center gap-2 absolute -top-3 ${orientation}-8`}
      >
        {orientation === 'left' && (
          <div className='h-[1.5px] w-56 bg-primary' />
        )}
        <p className='text-xl uppercase font-medium'>{title}</p>
        {orientation === 'right' && (
          <div className='h-[1.5px] w-56 bg-primary' />
        )}
      </div>
    </div>
  );
};

export default SectionTitle;
