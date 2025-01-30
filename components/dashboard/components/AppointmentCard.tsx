import { Appointment } from '@prisma/client';
import services from '@/utils/services.json';
import React from 'react';
import ServiceIconSvg from '@/components/services/ServiceIconSvg';
import { BadgeCheck, MapPin, User } from 'lucide-react';
import AppointmentDetailsSheet from './AppointmentDetailsSheet';
import { getStatusClasses, isDateWithinTwoDays } from '@/lib/utils';

type AppointmentCardProps = {
  appointment: Appointment;
};

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const serviceSvg = services.find((s) => s.name === appointment.service)!.svg;
  const isNew = isDateWithinTwoDays(appointment.createdAt);

  return (
    <>
      <AppointmentDetailsSheet appointment={appointment}>
        <div className='w-full shadow-lg rounded-lg p-6 mb-8 bg-slate-100 dark:bg-sidebar hover:cursor-pointer hover:-translate-y-4 hover:scale-105 transition-all duration-300 relative'>
          {isNew && (
            <div className='absolute top-2 right-2 bg-lime-200 p-1 rounded-md text-black text-[12px] font-medium'>
              New
            </div>
          )}
          <div className='flex gap-6 h-full'>
            <div className='w-1/5 bg-secondary hidden xl:flex items-center justify-center p-4 rounded-md'>
              <ServiceIconSvg
                svg={serviceSvg}
                className='w-4 h-4 lg:w-16 lg:h-16'
              />
            </div>
            <div className='flex flex-col justify-between gap-8'>
              <p className='font-bold text-xl'>
                <span className='capitalize'>{appointment.service}</span> @{' '}
                {appointment.time}
              </p>
              <div className='flex gap-10 text-muted-foreground'>
                <div className='flex flex-col justify-center'>
                  <User className='stroke-primary' />
                  <p className='lg:text-[16px] font-medium'>
                    {appointment.name}
                  </p>
                </div>
                <div className='flex flex-col justify-center'>
                  <MapPin className='stroke-secondary' />
                  <p className='lg:text-[16px] font-medium'>
                    {appointment.location}
                  </p>
                </div>
                <div className='flex flex-col justify-center'>
                  <BadgeCheck className='stroke-muted-foreground' />
                  <p
                    data-status={appointment.status}
                    className={`lg:text-[16px] font-medium ${getStatusClasses(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppointmentDetailsSheet>
    </>
  );
};

export default AppointmentCard;
