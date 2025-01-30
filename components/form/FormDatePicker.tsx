'use client';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { PopoverContent } from '@radix-ui/react-popover';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { Label } from '../ui/label';
import FormError from './FormError';

type FormDatePickerProps = {
  name: string;
  label: string;
};

const FormDatePicker = ({ name, label }: FormDatePickerProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const {
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const dateValue = watch(name);

  //test, will not be final product
  const getUnavailableDates = (date: Date) => {
    const unavailableDates = [
      new Date(2025, 0, 20),
      new Date(2025, 1, 14),
      new Date(2025, 1, 20),
    ];

    return unavailableDates.some((d) => d.getTime() === date.getTime());
  };

  return (
    <div className='mb-8'>
      <Label className='text-black text-lg'>{label}</Label>
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
      >
        <PopoverTrigger asChild>
          <div>
            <Input
              id={name}
              placeholder='Select a date'
              value={dateValue ? format(new Date(dateValue), 'PPPP') : ''}
              onChange={(e) => {
                const value = e.target.value;
                setValue(name, value);
                if (value) {
                  clearErrors(name);
                }
              }}
              className='h-12 text-black placeholder:text-gray-500 dark:placeholder:text-gray-700 placeholder:text-xl placeholder:font-extralight border-black border-x-0 border-t-0 shadow-none rounded-none text-xl md:text-2xl font-semibold text-left'
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className='w-auto p-0'
          align='start'
        >
          <Calendar
            className='bg-background rounded-md'
            classNames={{
              caption_label: 'text-lg',
              day_disabled: 'line-through',
            }}
            mode='single'
            selected={dateValue ? new Date(dateValue) : undefined}
            onSelect={(date) => {
              setValue(name, date?.toISOString());
              clearErrors(name);
              setIsPopoverOpen(false);
            }}
            disabled={(date) => date < new Date() || getUnavailableDates(date)}
          />
        </PopoverContent>
      </Popover>
      {errors[name] && <FormError>{errors[name].message as string}</FormError>}
    </div>
  );
};

export default FormDatePicker;
