import { Appointment } from '@prisma/client';
import React from 'react';
import AppointmentCard from './AppointmentCard';

type AppointmendGridProps = {
  appointments: Appointment[];
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
