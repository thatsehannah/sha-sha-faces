"use client";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Label } from "../ui/label";
import FormError from "./FormError";
import { Availability } from "@/utils/types";

type FormDatePickerProps = {
  name: string;
  label: string;
  availability: Availability[];
};

const FormDatePicker = ({ name, label, availability }: FormDatePickerProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const {
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const dateValue = watch(name);

  const getUnavailableDates = (date: Date) => {
    const unavailableDays = availability
      .filter((slot) => slot.isAvailable === false)
      .map((filteredSlot) => filteredSlot.day);

    if (unavailableDays.length > 0) {
      const dayOfWeek = format(date, "EEEE").toLowerCase();

      return unavailableDays.some((d) => d === dayOfWeek);
    }

    return false;
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
              value={dateValue ? format(new Date(dateValue), "PPPP") : ""}
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
              caption_label: "text-lg",
              day_disabled: "line-through",
            }}
            mode='single'
            selected={dateValue ? new Date(dateValue) : undefined}
            onSelect={(date) => {
              setValue(name, date?.toLocaleDateString());
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
