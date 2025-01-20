import { Appointment, AppointmentFormFields } from '@/utils/types';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem } from '../ui/form';
import FormInputLabel from './FormInputLabel';
import { Textarea } from '../ui/textarea';

type FormTextAreaProps = {
  name: AppointmentFormFields;
  label: string;
  placeholder?: string;
  form: UseFormReturn<Appointment>;
};

const FormTextArea = ({
  name,
  label,
  placeholder,
  form,
}: FormTextAreaProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='mb-8'>
          <FormInputLabel text={label} />
          <FormControl>
            <div>
              <Textarea
                {...field}
                value={field.value ? String(field.value) : ''}
                placeholder={placeholder}
                className='h-32 text-black placeholder:text-gray-500 dark:placeholder:text-gray-700 placeholder:text-xl placeholder:font-extralight border-black shadow-none rounded-md text-xl md:text-2xl font-semibold'
              />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default FormTextArea;
