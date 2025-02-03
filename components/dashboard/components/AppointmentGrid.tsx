import React from 'react';
import AppointmentCard from './AppointmentCard';
import { AppointmentWithService } from '@/utils/types';

type AppointmendGridProps = {
  appointments: AppointmentWithService[];
};

const AppointmentGrid = ({ appointments }: AppointmendGridProps) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
      {appointments.map((appt) => (
        <AppointmentCard
          key={appt.id}
          appointment={appt}
        />
      ))}
    </div>
  );
};

export default AppointmentGrid;
