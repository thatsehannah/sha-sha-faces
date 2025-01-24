import AppointmentContainer from '@/components/dashboard/components/AppointmentContainer';
import { fetchAllAppointments } from '@/utils/actions';
import React from 'react';

export type Layout = 'grid' | 'table';

const AdminAppointmentsPage = async () => {
  const appointments = await fetchAllAppointments();

  return (
    <main>
      <AppointmentContainer appointments={appointments} />
    </main>
  );
};

export default AdminAppointmentsPage;
