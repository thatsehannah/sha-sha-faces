'use client';

import React, { useState } from 'react';
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
  { value: 'very-unsatisfied', label: 'Very Unsatisifed', icon: Angry },
  { value: 'unsatisfied', label: 'Unsatisfied', icon: Frown },
  { value: 'neutral', label: 'Neutral', icon: Meh },
  { value: 'satisfied', label: 'Satisfied', icon: Smile },
  { value: 'very-satisfied', label: 'Very Satisfied', icon: Laugh },
] as const;

type RatingType = (typeof ratings)[number]['value'];

type RatingProps = {
  name: string;
};

const Rating = ({ name }: RatingProps) => {
  const {
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  const [selectedValues, setSelectedValues] = useState<
    Record<string, RatingType | undefined>
  >({}); // Store selected values

  const handleIconClick = (ratingValue: RatingType) => {
    setValue(name, ratingValue);
    clearErrors(name);

    // Update selectedValues state:
    setSelectedValues({ ...selectedValues, [name]: ratingValue });
  };

  const isIconFilled = (ratingValue: RatingType) => {
    return selectedValues[name] === ratingValue;
  };

  const getIconFillColor = (ratingValue: RatingType): string => {
    switch (ratingValue) {
      case 'very-unsatisfied':
        return 'fill-red-600';
      case 'unsatisfied':
        return 'fill-orange-500';
      case 'neutral':
        return 'fill-yellow-500';
      case 'satisfied':
        return 'fill-green-500';
      case 'very-satisfied':
        return 'fill-emerald-600';
      default: // Important: Add a default case
        return 'fill-gray-400'; // Or your default color
    }
  };

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
                    data-value={rating.value}
                    className={`h-12 w-12 stroke-black stroke-1 ${
                      isIconFilled(rating.value)
                        ? getIconFillColor(rating.value)
                        : 'fill-gray-400'
                    } data-[value="very-unsatisfied"]:hover:fill-red-600 data-[value="unsatisfied"]:hover:fill-orange-500 data-[value="neutral"]:hover:fill-yellow-500 data-[value="satisfied"]:hover:fill-green-500 data-[value="very-satisfied"]:hover:fill-emerald-600 data-[selected=true]:fill-current`}
                    onClick={() => handleIconClick(rating.value)}
                  />
                </TooltipTrigger>
                <TooltipContent
                  data-value={rating.value}
                  className='data-[value="very-unsatisfied"]:bg-red-600 data-[value="unsatisfied"]:bg-orange-500 data-[value="neutral"]:bg-yellow-500 data-[value="satisfied"]:bg-green-500 data-[value="very-satisfied"]:bg-emerald-600'
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
