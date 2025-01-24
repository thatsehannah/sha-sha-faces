import AppointmentCard from '@/components/dashboard/components/AppointmentCard';
import Container from '@/components/global/Container';
import { Separator } from '@/components/ui/separator';
import { fetchAllAppointments } from '@/utils/actions';
import React from 'react';

const AdminAppointmentsPage = async () => {
  const appointments = await fetchAllAppointments();

  return (
    <main>
      <Container className='py-20'>
        <div className='text-7xl font-normal'>Appointments</div>
        <Separator />
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
          {appointments.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appointment={appt}
            />
          ))}
        </div>
      </Container>
    </main>
  );
};

export default AdminAppointmentsPage;
