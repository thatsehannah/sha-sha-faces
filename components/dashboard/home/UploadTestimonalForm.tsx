"use client";

import { Input } from "@/components/ui/input";
import { NewTestimonialScreenshot } from "@/utils/types";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const UploadTestimonalForm = () => {
  const form = useForm<{ screenshots: NewTestimonialScreenshot[] }>({
    defaultValues: { screenshots: [] },
  });

  return (
    <FormProvider {...form}>
      <form>
        <div>
          <Input
            id='uploadScreenshot'
            type='file'
            className='w-auto bg-white'
            accept='image/*'
            multiple
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default UploadTestimonalForm;
