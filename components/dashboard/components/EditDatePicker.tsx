'use client';

import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

type EditDatePickerProps = {
  label: string;
  name: string;
  defaultValue?: string;
};

const EditDatePicker = ({ label, name, defaultValue }: EditDatePickerProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { setValue, watch } = useFormContext();

  const dateValue = watch(name);
  console.log(defaultValue);
  console.log(dateValue);

  return (
    <div className='mb-8'>
      <Label className='text-xl font-light capitalize'>{label}</Label>
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
      >
        <PopoverTrigger asChild>
          <div>
            <Input
              id={name}
              placeholder='Select a date'
              value={dateValue ? format(dateValue, 'PPPP') : ''}
              readOnly
              className='mt-2 font-medium lg:text-[1rem] border-x-0 border-t-0 rounded-none shadow-none'
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
              setValue(name, date?.toLocaleDateString(), {
                shouldDirty: defaultValue !== date,
              });

              setIsPopoverOpen(false);
            }}
            disabled={(date) => date < new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EditDatePicker;
