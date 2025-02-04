'use client';

import React from 'react';
import { Angry, Frown, Laugh, Meh, Smile } from 'lucide-react';
import { Label } from '../ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { useFormContext } from 'react-hook-form';
import FormError from '../form/FormError';

const ratings = [
  {
    value: 'very-unsatisfied',
    label: 'Very Unsatisifed',
    icon: Angry,
    hoverColor: 'hover:fill-red-600',
    fillColor: 'fill-red-600',
  },
  {
    value: 'unsatisfied',
    label: 'Unsatisfied',
    icon: Frown,
    hoverColor: 'hover:fill-orange-500',
    fillColor: 'fill-orange-500',
  },
  {
    value: 'neutral',
    label: 'Neutral',
    icon: Meh,
    hoverColor: 'hover:fill-yellow-500',
    fillColor: 'fill-yellow-500',
  },
  {
    value: 'satisfied',
    label: 'Satisfied',
    icon: Smile,
    hoverColor: 'hover:fill-green-500',
    fillColor: 'fill-green-500',
  },
  {
    value: 'very-satisfied',
    label: 'Very Satisfied',
    icon: Laugh,
    hoverColor: 'hover:fill-emerald-600',
    fillColor: 'fill-emerald-600',
  },
];

type RatingProps = {
  name: string;
};

const Rating = ({ name }: RatingProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  const selectedValue = watch(name);

  return (
    <div className='mb-8'>
      <Label className='text-black text-lg'>Rating</Label>
      <div className='flex flex-col mt-2'>
        <div className='flex flex-row gap-4'>
          {ratings.map((rating, idx) => (
            <TooltipProvider key={idx}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <rating.icon
                    className={`h-12 w-12 stroke-black stroke-1 ${
                      rating.hoverColor
                    } ${
                      selectedValue === rating.value
                        ? rating.fillColor
                        : 'fill-transparent'
                    }`}
                    onClick={() => {
                      setValue(name, rating.value);
                      clearErrors(name);
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent
                  className={`${rating.fillColor.replace('fill-', 'bg-')}`}
                >
                  <p className='capitalize text-[1rem] font-medium'>
                    {rating.label}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        {errors[name] && (
          <FormError>{errors[name].message as string}</FormError>
        )}
      </div>
    </div>
  );
};

export default Rating;
