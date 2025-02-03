import AppointmentForm from '@/components/contact/AppointmentForm';
import Container from '@/components/global/Container';
import SectionTitle from '@/components/global/SectionTitle';
import { fetchServiceInfo } from '@/utils/actions';
import React, { Suspense } from 'react';

const ContactPage = async () => {
  const serviceData = await fetchServiceInfo();

  return (
    <main className='relative'>
      <SectionTitle
        title='booking form'
        alignment='left'
      />
      <Container className='py-20 flex flex-col justify-center items-center'>
        <Suspense>
          <AppointmentForm serviceData={serviceData} />
        </Suspense>
      </Container>
    </main>
  );
};

export default ContactPage;
