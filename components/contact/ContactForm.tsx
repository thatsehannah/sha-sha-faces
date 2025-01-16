'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './components/FormInput';
import { z } from 'zod';
import { appointmentSchema } from '@/utils/appointmentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';
import services from '@/utils/services.json';
import times from '@/utils/appointmentTimes.json';
import FormDropdown from './components/FormDropdown';
import { Button } from '../ui/button';
import FormDatePicker from './components/FormDatePicker';
import { useSearchParams } from 'next/navigation';

const ContactForm = () => {
  const searchParams = useSearchParams();
  const serviceNames = services.map((service) => service.name);
  const paramValue = searchParams.has('a') && searchParams.get('a');
  let defaultService: string = '';
  if (paramValue) {
    const idx = parseInt(paramValue);
    defaultService = serviceNames[idx];
  }

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
  });

  const onSubmit = (values: z.infer<typeof appointmentSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        className='bg-secondary rounded-md p-8 lg:px-20 lg:py-8 w-full lg:w-[65vw]'
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
          {/* service */}
          <FormDropdown
            name='service'
            label='type'
            placeholder='Select a service'
            form={form}
            values={serviceNames}
            description='Please select only 1 service per booking.'
            defaultValue={defaultService}
          />
          {/* date */}
          <FormDatePicker
            name='date'
            label='date'
            form={form}
          />
          {/* time */}
          <FormDropdown
            name='time'
            label='time'
            placeholder='Select a time'
            form={form}
            values={times}
          />
          {/* location */}
          <FormInput
            name='location'
            label='location'
            placeholder='e.g. Los Angeles, CA'
            form={form}
          />
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
