import AppointmentContainer from '@/components/dashboard/components/AppointmentContainer';
import { fetchAllAppointments } from '@/utils/actions';
import React, { Suspense } from 'react';

export type Layout = 'grid' | 'table';

const AdminAppointmentsPage = async () => {
  const appointments = await fetchAllAppointments();
  console.log('Fetched appointments: ', appointments);

  return (
    <main>
      <Suspense>
        <AppointmentContainer appointments={appointments} />
      </Suspense>
    </main>
  );
};

export default AdminAppointmentsPage;
