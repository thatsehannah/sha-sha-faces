"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { NewTestimonialScreenshot } from "@/utils/types";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const UploadTestimonalForm = () => {
  const form = useForm<{ screenshots: NewTestimonialScreenshot[] }>({
    defaultValues: { screenshots: [] },
  });

  return (
    <section>
      <div className='bg-muted p-12 rounded-lg w-full'>
        <p className='text-2xl font-medium'>Your Testimonials</p>
        <Separator className='my-6 bg-primary' />
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
      </div>
    </section>
  );
};

export default UploadTestimonalForm;
