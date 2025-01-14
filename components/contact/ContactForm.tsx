'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './components/FormInput';
import { z } from 'zod';
import { appointmentSchema } from '@/utils/appointmentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';
import services from '@/lib/services.json';
import FormDropdown from './components/FormDropdown';

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
      location: '',
    },
  });

  const serviceNames = services.map((service) => service.name);

  const onSubmit = (values: z.infer<typeof appointmentSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        className='bg-secondary dark:bg-secondary/80 rounded-md p-8 lg:px-20 lg:py-8 w-full lg:w-[65vw]'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          name='name'
          label='full name'
          placeholder='e.g. Jane Doe'
          form={form}
          type='text'
        />
        <FormInput
          name='email'
          label='email'
          placeholder='e.g. janedoe@domain.com'
          form={form}
          type='text'
        />
        <FormDropdown
          name='service'
          label='service'
          placeholder='Select a service'
          form={form}
          values={serviceNames}
          description='Please select only service per booking.'
        />
      </form>
    </Form>
  );
};

export default ContactForm;
