import { Appointment } from '@prisma/client';
import React from 'react';

type AppointmentTableProps = {
  appointments: Appointment[];
};

const AppointmentTable = ({ appointments }: AppointmentTableProps) => {
  return <div>AppointmentTable</div>;
};

export default AppointmentTable;
