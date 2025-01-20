import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Appointment, AppointmentFormFields } from '@/utils/types';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import FormInputLabel from './FormInputLabel';

type FormDropwdownProps = {
  name: AppointmentFormFields;
  label: string;
  values: string[];
  placeholder?: string;
  form: UseFormReturn<Appointment>;
};

const FormDropdown = ({
  name,
  label,
  values,
  placeholder,
  form,
}: FormDropwdownProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='mb-8'>
          <FormInputLabel text={label} />
          <Select
            {...field}
            value={field.value ? String(field.value) : ''}
            onValueChange={(value) => field.onChange(value)}
            defaultValue={field.value ? String(field.value) : ''}
          >
            <FormControl>
              <SelectTrigger className='h-12 border-black capitalize text-black text-xl md:text-2xl font-semibold data-[placeholder]:text-gray-500 dark:data-[placeholder]:text-gray-700 data-[placeholder]:text-xl data-[placeholder]:normal-case data-[placeholder]:font-extralight'>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className='capitalize text-lg'>
              {values.map((value, idx) => (
                <SelectItem
                  value={value}
                  key={idx}
                  className='capitalize text-lg font-medium'
                >
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage className='text-lg dark:text-red-700' />
        </FormItem>
      )}
    />
  );
};

export default FormDropdown;
