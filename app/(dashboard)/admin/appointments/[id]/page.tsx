import Container from '@/components/global/Container';
import { Separator } from '@/components/ui/separator';
import { fetchAppointmentById } from '@/utils/actions';

import React from 'react';
import EditAppointmentForm from '@/components/dashboard/appointments/EditAppointmentForm';

type Params = {
  params: Promise<{ id: string }>;
};

const EditAppointmentPage = async ({ params }: Params) => {
  const appointmentId = (await params).id;
  const appointment = await fetchAppointmentById(appointmentId);

  return (
    <main>
      <Container className='py-20 w-screen lg:w-[80vw]'>
        <div>
          <p className='text-5xl font-normal'>Edit Appointment</p>
        </div>
        <Separator />
        <EditAppointmentForm appointment={appointment} />
      </Container>
    </main>
  );
};

export default EditAppointmentPage;
