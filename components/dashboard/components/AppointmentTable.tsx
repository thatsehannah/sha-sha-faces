import { columns } from '@/app/(dashboard)/admin/appointments/columns';
import React from 'react';
import DataTable from './DataTable';
import { AppointmentWithService } from '@/utils/types';

type AppointmentTableProps = {
  appointments: AppointmentWithService[];
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
