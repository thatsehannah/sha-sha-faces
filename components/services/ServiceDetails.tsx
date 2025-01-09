import Image from 'next/image';
import React from 'react';

type ServiceDetailsProps = {
  service: {
    name: string;
    price: number;
    duration: number;
    description: string;
    popular: boolean;
  };
};

const ServiceDetails = ({ service }: ServiceDetailsProps) => {
  return (
    <main className='flex lg:flex-row flex-col lg:even:flex-row-reverse'>
      <div className='lg:w-1/2 lg:h-[85vh] flex justify-center items-center bg-slate-200'>
        <div className='relative w-full h-full'>
          <Image
            src='/images/gif1.gif'
            alt='temp gif'
            fill
            sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw'
            className='w-full object-cover rounded-md'
          />
        </div>
      </div>
      <div className='lg:w-1/2 lg:h-[85vh] flex bg-red-100'>
        <div className='flex flex-col p-12'>
          <p className='capitalize text-4xl font-bold mb-4'>{service.name}</p>
          <div className='flex justify-between text-muted-foreground text-2xl mb-12'>
            <p>{service.duration} hours</p>
            <p>${service.price}</p>
          </div>
          <p className='text-2xl font-light'>{service.description}</p>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetails;
