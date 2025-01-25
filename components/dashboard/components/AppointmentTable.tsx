import { columns } from '@/app/(dashboard)/admin/appointments/columns';
import DataTable from '@/app/(dashboard)/admin/appointments/dataTable';
import { Appointment } from '@prisma/client';
import React from 'react';

type AppointmentTableProps = {
  appointments: Appointment[];
};

const AppointmentTable = ({ appointments }: AppointmentTableProps) => {
  return (
    <div className='mt-8'>
      <DataTable
        columns={columns}
        data={appointments}
      />
    </div>
  );
};

export default AppointmentTable;
