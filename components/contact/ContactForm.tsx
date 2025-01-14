'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './components/FormInput';
import { z } from 'zod';
import { appointmentSchema } from '@/utils/appointmentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';

const ContactForm = () => {
  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      date: '',
      time: '',
      service: '',
      addtlDetails: '',
    },
  });

  const onSubmit = (values: z.infer<typeof appointmentSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        className='bg-primary rounded-md p-4 w-full lg:w-[50vw]'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          name='name'
          label='Full Name'
          placeholder='Your full name'
          form={form}
        />
        <FormInput
          name='email'
          label='Email'
          placeholder='Your email'
          form={form}
        />
      </form>
    </Form>
  );
};

export default ContactForm;
