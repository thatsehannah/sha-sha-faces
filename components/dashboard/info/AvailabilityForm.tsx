"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getAvailabilityTimeOptions } from "@/lib/utils";
import { submitWeeklyAvailability } from "@/utils/actions";
import { Availability } from "@/utils/types";
import { RotateCw } from "lucide-react";
import React, { useMemo } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

type AvailabilityFormProps = {
  availability: Availability[];
};

type AvailabilityFormData = {
  availabilities: Availability[];
};

const AvailabilityForm = ({ availability }: AvailabilityFormProps) => {
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      availabilities: availability,
    },
  });

  const dropdownMenuTimeOptions = useMemo(
    () => getAvailabilityTimeOptions(),
    []
  );

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const { fields } = useFieldArray({
    control: form.control,
    name: "availabilities",
  });

  const handleFormSubmit = async ({ availabilities }: AvailabilityFormData) => {
    try {
      const resultMessage = await submitWeeklyAvailability(availabilities);

      toast({
        variant: "success",
        title: "Success ✅",
        description: resultMessage,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh ☹️",
        description:
          error instanceof Error ? error.message : "An error occurred ",
      });
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={handleSubmit((data) => {
            handleFormSubmit(data);
          })}
        >
          <div className='grid xl:grid-cols-2 grid-cols-1 gap-8'>
            {fields.map((field, idx) => {
              const isAvailable = watch(`availabilities.${idx}.isAvailable`);
              const from = watch(`availabilities.${idx}.from`);
              const to = watch(`availabilities.${idx}.to`);

              return (
                <div
                  key={field.id}
                  className='flex items-center gap-4'
                >
                  <Checkbox
                    defaultChecked={field.isAvailable}
                    checked={isAvailable}
                    onCheckedChange={(value) => {
                      setValue(
                        `availabilities.${idx}.isAvailable`,
                        Boolean(value)
                      );
                      if (value === false) {
                        setValue(`availabilities.${idx}.from`, "");
                        setValue(`availabilities.${idx}.to`, "");
                      }
                    }}
                  />
                  <div className='flex flex-col gap-2 w-3/4'>
                    <p className='text-lg capitalize font-light'>{field.day}</p>
                    {form.getValues(`availabilities.${idx}.isAvailable`) ===
                    false ? (
                      <p className='font-bold'>Not available</p>
                    ) : (
                      <div className='flex items-center gap-4'>
                        <Select
                          required
                          value={from}
                          onValueChange={(value) =>
                            setValue(`availabilities.${idx}.from`, value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder='From'
                              className='w-full'
                            />
                          </SelectTrigger>
                          <SelectContent className='bg-background p-4 border-2 rounded-md overflow-scroll'>
                            {dropdownMenuTimeOptions.map((time, idx) => (
                              <SelectItem
                                key={idx}
                                value={time}
                              >
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        -
                        <Select
                          required
                          value={to}
                          onValueChange={(value) =>
                            setValue(`availabilities.${idx}.to`, value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='To' />
                          </SelectTrigger>
                          <SelectContent className='bg-background p-4 border-2 rounded-md overflow-scroll'>
                            {dropdownMenuTimeOptions.map((time, idx) => (
                              <SelectItem
                                key={idx}
                                value={time}
                              >
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className='mt-6 flex justify-end'>
            <Button
              disabled={isSubmitting}
              size='lg'
              type='submit'
            >
              {isSubmitting ? (
                <>
                  <RotateCw className='mr-2 h-4 w-4 animate-spin' />
                  Submitting...
                </>
              ) : (
                <>Submit</>
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AvailabilityForm;
