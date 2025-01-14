'use client';

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
        <div className='flex flex-col items-center gap-3'>
          <p className='text-2xl'>
            Please review{' '}
            <span
              className='text-primary font-bold hover:cursor-pointer'
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
      </Container>
      <InstructionsDrawer
        open={open}
        onOpenChange={handleOpenDrawer}
      />
    </main>
  );
};

export default ContactPage;
