import React from 'react';

type SectionTypeProps = {
  title: string;
  alignment: 'left' | 'right';
};

const SectionTitle = ({ title, alignment }: SectionTypeProps) => {
  return (
    <div className={`flex items-center gap-2 absolute top-5 ${alignment}-8`}>
      {alignment === 'left' && <div className='h-[1.5px] w-56 bg-primary' />}
      <p className='text-xl uppercase font-medium'>{title}</p>
      {alignment === 'right' && <div className='h-[1.5px] w-56 bg-primary' />}
    </div>
  );
};

export default SectionTitle;