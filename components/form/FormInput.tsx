import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Appointment, AppointmentFormFields } from '@/utils/types';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import FormInputLabel from './FormInputLabel';

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
          <FormInputLabel
            name={name}
            text={label}
          />
          <FormControl>
            <div>
              <Input
                {...field}
                placeholder={placeholder}
                value={field.value ? String(field.value) : ''}
                onChange={(value) => field.onChange(value)}
                className='h-12 text-black placeholder:text-gray-500 dark:placeholder:text-gray-700 placeholder:text-xl placeholder:font-extralight border-black border-x-0 border-t-0 shadow-none rounded-none text-xl md:text-2xl font-semibold'
              />
            </div>
          </FormControl>
          <FormMessage className='text-lg dark:text-red-700' />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
