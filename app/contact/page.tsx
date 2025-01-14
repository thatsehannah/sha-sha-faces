'use client';

import ContactForm from '@/components/contact/ContactForm';
import InstructionsDrawer from '@/components/contact/InstructionsDrawer';
import Container from '@/components/global/Container';
import SectionTitle from '@/components/global/SectionTitle';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';

const ContactPage = () => {
  const [open, setOpen] = useState(false);

  const handleOpenDrawer = () => {
    setOpen(!open);
  };

  return (
    <main className='relative'>
      <SectionTitle
        title='booking form'
        alignment='left'
      />
      <Container className='py-20 flex flex-col justify-center items-center'>
        <div className='flex flex-col items-center gap-5 lg:gap-3 mb-28'>
          <p className='text-xl lg:text-2xl font-light'>
            Please review{' '}
            <span
              className='text-primary font-bold hover:cursor-pointer underline'
              onClick={handleOpenDrawer}
            >
              instructions
            </span>{' '}
            prior to booking to ensure a smooth experience.
          </p>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='terms'
              className='w-6 h-6'
            />
            <Label
              htmlFor='terms'
              className='text-md'
            >
              I have read and understood booking instructions.
            </Label>
          </div>
        </div>
        <ContactForm />
      </Container>
      <InstructionsDrawer
        open={open}
        onOpenChange={handleOpenDrawer}
      />
    </main>
  );
};

export default ContactPage;
