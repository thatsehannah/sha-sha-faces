import { AppointmentWithService } from '@/utils/types';
import { format } from 'date-fns';
import React from 'react';

type RecentAppointmentDetailProps = {
  appointment: AppointmentWithService;
};

const RecentAppointmentDetail = ({
  appointment,
}: RecentAppointmentDetailProps) => {
  return (
    <div className='my-8'>
      <p className='capitalize font-bold'>{appointment.service.name}</p>
      <p>{appointment.name}</p>
      <p className='italic'>{format(appointment.date, 'PPPP')}</p>
    </div>
  );
};

export default RecentAppointmentDetail;
