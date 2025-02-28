"use client";

import React from "react";
import { Label } from "../ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useFormContext } from "react-hook-form";
import FormError from "../form/FormError";
import { RATING_OPTIONS } from "@/utils/constants";

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
          {RATING_OPTIONS.map((rating, idx) => (
            <TooltipProvider key={idx}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <rating.icon
                    className={`h-12 w-12 stroke-black stroke-1 ${
                      rating.hoverColor
                    } ${
                      selectedValue === rating.value
                        ? rating.fillColor
                        : "fill-transparent"
                    }`}
                    onClick={() => {
                      setValue(name, rating.value);
                      clearErrors(name);
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent className={rating.tooltipBgColor}>
                  <p className='capitalize text-[1rem] font-medium text-black'>
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
