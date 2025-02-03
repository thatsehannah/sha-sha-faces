import Container from '@/components/global/Container';
import { Separator } from '@/components/ui/separator';
import { fetchAppointmentById, fetchServiceNames } from '@/utils/actions';

import React from 'react';
import EditAppointmentForm from '@/components/dashboard/appointments/EditAppointmentForm';

type Params = {
  params: Promise<{ id: string }>;
};

const EditAppointmentPage = async ({ params }: Params) => {
  const appointmentId = (await params).id;
  const appointment = await fetchAppointmentById(appointmentId);
  const serviceNames = await fetchServiceNames();

  return (
    <main>
      <Container className='py-20 w-screen lg:w-[80vw]'>
        <div className='pb-3'>
          <p className='text-5xl font-normal'>Edit Appointment</p>
        </div>
        <Separator />
        <EditAppointmentForm
          appointment={appointment}
          partialServices={serviceNames}
        />
      </Container>
    </main>
  );
};

export default EditAppointmentPage;
