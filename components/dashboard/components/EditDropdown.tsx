'use client';

import { FormField, FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { SelectValue } from '@radix-ui/react-select';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { EditAppointment } from '@/utils/types';

type EditDropdownProps = {
  label: string;
  values: string[];
  name: keyof EditAppointment;
  form: UseFormReturn<EditAppointment>;
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
            <SelectTrigger className='capitalize font-medium text-[1rem]'>
              <SelectValue></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {values.map((value) => (
                <SelectItem
                  key={value}
                  value={value}
                  className='capitalize text-lg'
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
