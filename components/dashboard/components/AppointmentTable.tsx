import { columns } from '@/app/(dashboard)/admin/appointments/columns';
import DataTable from '@/app/(dashboard)/admin/appointments/DataTable';
import { Appointment } from '@prisma/client';
import { format } from 'date-fns';
import React from 'react';

type AppointmentTableProps = {
  appointments: Appointment[];
};

const AppointmentTable = ({ appointments }: AppointmentTableProps) => {
  const formattedAppointments = appointments.map((appt) => {
    const formattedDate = format(appt.date, 'PPPP');

    return { ...appt, date: formattedDate };
  });

  return (
    <div>
      <DataTable
        columns={columns}
        data={formattedAppointments}
      />
    </div>
  );
};

export default AppointmentTable;
