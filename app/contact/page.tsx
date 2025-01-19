'use client';

import AppointmentForm from '@/components/contact/AppointmentForm';
import Container from '@/components/global/Container';
import SectionTitle from '@/components/global/SectionTitle';
import React, { Suspense } from 'react';

const ContactPage = () => {
  return (
    <main className='relative'>
      <SectionTitle
        title='booking form'
        alignment='left'
      />
      <Container className='py-20 flex flex-col justify-center items-center'>
        <Suspense>
          <AppointmentForm />
        </Suspense>
      </Container>
    </main>
  );
};

export default ContactPage;
