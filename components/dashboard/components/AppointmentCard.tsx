import { Appointment } from '@prisma/client';
import services from '@/utils/services.json';
import React from 'react';
import ServiceIconSvg from '@/components/services/ServiceIconSvg';
import { BadgeCheck, MapPin, User } from 'lucide-react';

type AppointmentCardProps = {
  appointment: Appointment;
};

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const serviceSvg = services.find((s) => s.name === appointment.service)!.svg;

  return (
    <div className='w-full shadow-lg rounded-lg p-6 mb-8 bg-slate-100 dark:bg-sidebar hover:cursor-pointer hover:-translate-y-4 hover:scale-105 hover:shadow-secondary transition-all duration-300'>
      <div className='flex gap-6 h-full'>
        <div className='w-1/5 bg-secondary flex items-center justify-center p-4 rounded-md'>
          <ServiceIconSvg
            svg={serviceSvg}
            className='w-4 h-4 lg:w-16 lg:h-16'
          />
        </div>
        <div className='flex flex-col justify-between'>
          <p className='font-bold text-2xl'>
            <span className='capitalize'>{appointment.service}</span> @{' '}
            {appointment.time}
          </p>
          <div className='flex gap-16 text-muted-foreground'>
            <div className='flex flex-col justify-center items-center'>
              <User className='stroke-secondary' />
              <p className='text-lg font-medium'>{appointment.name}</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <MapPin className='stroke-secondary' />
              <p className='text-lg font-medium'>{appointment.location}</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <BadgeCheck className='stroke-secondary' />
              <p className='text-lg font-medium'>{appointment.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
