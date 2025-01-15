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
import { Button } from '../ui/button';
import FormDatePicker from './components/FormDatePicker';

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
        <section className='mb-20'>
          <p className='text-3xl lg:text-4xl text-black font-bold mb-6'>
            Contact Information
          </p>
          <FormInput
            name='name'
            label='full name'
            placeholder='e.g. Jane Doe'
            form={form}
          />
          <FormInput
            name='email'
            label='email'
            placeholder='e.g. janedoe@domain.com'
            form={form}
          />
          <FormInput
            name='phoneNumber'
            label='phone number'
            placeholder='e.g. (213) 555-5555'
            form={form}
          />
        </section>

        <section className='mb-20'>
          <p className='text-3xl lg:text-4xl text-black font-bold mb-4'>
            Appointment Information
          </p>
          <FormDropdown
            name='service'
            label='type'
            placeholder='Select a service'
            form={form}
            values={serviceNames}
            description='Please select only 1 service per booking.'
          />
          {/* date */}
          <FormDatePicker
            name='date'
            label='date'
            form={form}
          />

          {/* time */}
          {/* location */}
        </section>

        <section className='mb-20'>
          <p className='text-3xl lg:text-4xl text-black font-bold mb-4'>
            Additional Information
          </p>
          {/* how did you hear about us */}
          {/* custom requests */}
        </section>
        <Button
          className='text-xl uppercase'
          type='submit'
        >
          Send Request
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
