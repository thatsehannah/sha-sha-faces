import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { Appointment, AppointmentFormFields } from '@/utils/types';
import { PopoverContent } from '@radix-ui/react-popover';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import FormInputLabel from './FormInputLabel';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

type FormDatePickerProps = {
  name: AppointmentFormFields;
  label: string;
  form: UseFormReturn<Appointment>;
};

const FormDatePicker = ({ name, label, form }: FormDatePickerProps) => {
  //test, will not be final product
  const unavailableDates = [
    new Date(2025, 0, 20),
    new Date(2025, 1, 14),
    new Date(2025, 1, 20),
  ];

  const getUnavailableDates = (date: Date) => {
    return unavailableDates.some((d) => d.getTime() === date.getTime());
  };

  https: return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='mb-8'>
          <FormInputLabel text={label} />
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <div>
                  <Input
                    placeholder='mm/dd/yyyy'
                    value={field.value ? format(field.value, 'PPPP') : ''}
                    onChange={field.onChange}
                    className='h-12 text-black placeholder:text-gray-500 dark:placeholder:text-gray-700 placeholder:text-xl placeholder:font-extralight border-black border-x-0 border-t-0 shadow-none rounded-none text-xl md:text-2xl font-semibold text-left'
                  />
                </div>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto'
              align='start'
            >
              <Calendar
                className='bg-background rounded-md'
                classNames={{
                  caption_label: 'text-lg',
                  day_disabled: 'line-through',
                }}
                mode='single'
                selected={new Date(field.value)}
                onSelect={field.onChange}
                disabled={(date) =>
                  date < new Date() || getUnavailableDates(date)
                }
                initialFocus
                captionLayout='dropdown'
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};

export default FormDatePicker;
