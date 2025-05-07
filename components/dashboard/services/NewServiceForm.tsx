"use client";

import {
  newServiceSchema,
  validateNewServiceSchema,
} from "@/utils/newServiceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import SimpleFormInput from "./form/SimpleFormInput";
import { Button } from "@/components/ui/button";
import { FormNewService, NewService } from "@/utils/types";
import { FALLBACK_SERVICE_SVG } from "@/utils/constants";
import { createNewService } from "@/utils/actions";
import { useToast } from "@/hooks/use-toast";

const NewServiceForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof newServiceSchema>>({
    resolver: zodResolver(newServiceSchema),
    defaultValues: {
      name: "",
      price: "",
      durationHours: "",
      durationMinutes: "",
      description: "",
      pieChartLabel: "",
    },
  });

  const handleCreateService = async (data: FormNewService) => {
    try {
      const validatedData = validateNewServiceSchema(data);

      const duration = `${validatedData.durationHours} hr${
        validatedData.durationMinutes !== "0"
          ? ` ${validatedData.durationMinutes} min`
          : ""
      }`;

      const price = `$${validatedData.price}`;

      const newService: NewService = {
        name: validatedData.name.toLowerCase(),
        duration,
        description: validatedData.description,
        price,
        svgData: FALLBACK_SERVICE_SVG,
      };

      const resultMessage = await createNewService(newService);

      toast({
        variant: "success",
        title: "Success! ✅",
        description: resultMessage,
      });

      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh ☹️",
        description:
          error instanceof Error ? error.message : "An error occurred ",
      });
    }
  };

  const onInvalid = (errors: FieldErrors<FormNewService>) => {
    toast({
      variant: "destructive",
      title: "Uh oh ☹️",
      description:
        "There are errors in your form. Please fix them before submitting.",
    });

    const firstError = Object.keys(errors)[0];
    const errorElement = document.querySelector(`[name="${firstError}"`);
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleCreateService, onInvalid)}>
          <section className='flex flex-col gap-8 my-8'>
            <div className='grid grid-cols-2 lg:flex lg:flex-row lg:gap-32 gap-8'>
              <SimpleFormInput
                label='name'
                fieldName='name'
                type='text'
                className='w-auto lg:w-80'
              />
              <SimpleFormInput
                label='duration (hours)'
                fieldName='durationHours'
                type='number'
                min={0}
                max={23}
                maxLength={2}
                className='w-16'
                suffix='hr'
              />
              <SimpleFormInput
                label='duration (minutes)'
                fieldName='durationMinutes'
                type='number'
                maxLength={2}
                min={0}
                max={45}
                step={15}
                className='w-16'
                suffix='min'
              />
              <SimpleFormInput
                label='price'
                fieldName='price'
                type='text'
                maxLength={4}
                className='w-20'
                prefix='$'
              />
            </div>
            <div className='flex lg:flex-row flex-col lg:gap-32 gap-8'>
              <SimpleFormInput
                label='description'
                fieldName='description'
                type='text'
                inputType='textarea'
                className='h-60 w-80'
              />
              <SimpleFormInput
                label='chart label (for admin stats)'
                fieldName='pieChartLabel'
                type='text'
                className='w-auto lg:w-80'
              />
            </div>
            <div>
              <Button type='submit'>Create</Button>
            </div>
          </section>
        </form>
      </FormProvider>
    </>
  );
};

export default NewServiceForm;
