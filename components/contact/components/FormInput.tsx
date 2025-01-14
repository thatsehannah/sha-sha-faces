import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Appointment, AppointmentFormFields } from '@/utils/types';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

type FormInputProps = {
  name: AppointmentFormFields;
  label: string;
  placeholder?: string;
  form: UseFormReturn<Appointment>;
};

const FormInput = ({ name, label, placeholder, form }: FormInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='mb-8'>
          <FormLabel className='text-black text-lg font-light'>
            {label}
          </FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className='h-12 text-black placeholder:text-gray-500 placeholder:text-xl border-black border-x-0 border-t-0 shadow-none rounded-none text-xl md:text-2xl font-semibold'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
