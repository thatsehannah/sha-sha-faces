import { Appointment, AppointmentFormFields } from '@/utils/types';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Checkbox } from '../ui/checkbox';

type FormCheckboxProps = {
  name: AppointmentFormFields;
  label: string;
  form: UseFormReturn<Appointment>;
};

const FormCheckbox = ({ name, label, form }: FormCheckboxProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col justify-center items-center mb-8'>
          <FormControl>
            <div className='flex justify-center items-center gap-2'>
              <Checkbox
                checked={!!field.value}
                onCheckedChange={(checked) => field.onChange(checked)}
              />
              <FormLabel className='text-lg text-foreground'>{label}</FormLabel>
            </div>
          </FormControl>
          <FormMessage className='text-lg dark:text-red-700' />
        </FormItem>
      )}
    />
  );
};

export default FormCheckbox;
