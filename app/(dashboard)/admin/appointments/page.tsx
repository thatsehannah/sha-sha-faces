import AppointmentContainer from '@/components/dashboard/components/AppointmentContainer';
import { fetchAllAppointments } from '@/utils/actions';
import React, { Suspense } from 'react';

const AdminAppointmentsPage = async () => {
  const appointments = await fetchAllAppointments();

  return (
    <main>
      <Suspense>
        <AppointmentContainer appointments={appointments} />
      </Suspense>
    </main>
  );
};

export default AdminAppointmentsPage;
