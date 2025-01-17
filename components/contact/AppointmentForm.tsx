'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { appointmentSchema } from '@/utils/appointmentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '../ui/form';
import services from '@/utils/services.json';
import times from '@/utils/appointmentTimes.json';
import discoveries from '@/utils/discoveries.json';
import { Button } from '../ui/button';
import { useSearchParams } from 'next/navigation';
import FormInput from '../form/FormInput';
import FormDropdown from '../form/FormDropdown';
import FormDatePicker from '../form/FormDatePicker';
import FormTextArea from '../form/FormTextArea';
import { Appointment } from '@/utils/types';
import { createAppointmentAction } from '@/utils/actions';
import { useToast } from '@/hooks/use-toast';

const AppointmentForm = () => {
  const { toast } = useToast();
  const serviceNames = services.map((service) => service.name);

  //getting service (via index) from query string
  const searchParams = useSearchParams();
  const paramValue = searchParams.has('a') && searchParams.get('a');
  let defaultService: string = '';
  if (paramValue) {
    const idx = parseInt(paramValue);
    defaultService = serviceNames[idx];
  }

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      date: '',
      time: '',
      service: defaultService,
      addtlDetails: '',
      location: '',
    },
  });

  const handleOnSubmit = (values: Appointment) => {
    const result = createAppointmentAction(values);

    toast({
      variant: result.type === 'success' ? 'success' : 'destructive',
      title: result.title,
      description: result.message,
    });
  };

  return (
    <Form {...form}>
      <form
        className='bg-secondary rounded-md p-8 lg:px-20 lg:py-8 w-full lg:w-[65vw]'
        onSubmit={form.handleSubmit(handleOnSubmit)}
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
          <FormDropdown
            name='discovery'
            label='how did you hear about us?'
            placeholder='Select a source'
            form={form}
            values={discoveries}
          />
          {/* custom requests */}
          <FormTextArea
            name='addtlDetails'
            label='comments'
            placeholder='Add any information you would like for me to know prior to your appointment.'
            form={form}
          />
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

export default AppointmentForm;
