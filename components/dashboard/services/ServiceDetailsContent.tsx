import { Service } from '@/utils/types';
import { Edit } from 'lucide-react';
import React from 'react';

type ServiceDetailProps = {
  data: string;
  label: string;
};

const ServiceDetail = ({ data, label }: ServiceDetailProps) => {
  return (
    <div className='flex items-center group/item gap-8 hover:bg-white/50 transition-all p-4 rounded-md'>
      <div>
        <p className='font-bold text-[1rem] mb-1'>{label}</p>
        <p className='font-light text-lg'>{data}</p>
      </div>
      <div className='flex gap-2 group/edit'>
        <div className='invisible group-hover/item:visible hover:cursor-pointer transition-all flex items-center gap-2'>
          <Edit className='group-hover/edit:scale-125 w-5 h-5' />
        </div>
      </div>
    </div>
  );
};

type ServiceDetailsContentProps = {
  service: Service;
};

const ServiceDetailsContent = ({ service }: ServiceDetailsContentProps) => {
  return (
    <div className='flex flex-col justify-between bg-soft-pink p-3 rounded-md'>
      <ServiceDetail
        data={service.description}
        label='Description'
      />
      <ServiceDetail
        data={`$${service.price.toString()}`}
        label='Price'
      />
      <ServiceDetail
        data={`${service.duration.toString()} hours`}
        label='Duration'
      />
    </div>
  );
};

export default ServiceDetailsContent;
