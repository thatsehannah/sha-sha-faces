'use client';

import { FormField, FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { EditAppointmentFormFields } from '@/utils/types';
import { Appointment } from '@prisma/client';
import { SelectValue } from '@radix-ui/react-select';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

type EditDropdownProps = {
  label: string;
  values: string[];
  name: EditAppointmentFormFields;
  form: UseFormReturn<Appointment>;
};

const EditDropdown = ({ label, values, name, form }: EditDropdownProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Label
            htmlFor={label}
            className='text-xl font-light capitalize'
          >
            {label}
          </Label>
          <Select
            value={field.value ? String(field.value) : ''}
            onValueChange={field.onChange}
          >
            <SelectTrigger className='capitalize font-medium'>
              <SelectValue></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {values.map((value) => (
                <SelectItem
                  key={value}
                  value={value}
                  className='capitalize'
                >
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default EditDropdown;
