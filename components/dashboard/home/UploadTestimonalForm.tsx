"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { uploadPhoto } from "@/lib/supabase";
import { chunkArray } from "@/lib/utils";
import { createNewTestimonialScreenshot } from "@/utils/actions";
import { NewTestimonialScreenshot } from "@/utils/types";
import { CircleX, RotateCw } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { ChangeEvent } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

const UploadTestimonalForm = () => {
  const { toast } = useToast();

  //specify that the form will store an array of screenshots
  const form = useForm<{ screenshots: NewTestimonialScreenshot[] }>({
    defaultValues: { screenshots: [] },
  });

  //control is needed for useFieldArray to keep the screenshots array in sync with form state
  const { control, watch } = form;

  //fields is an array of all uploaded screenshots
  //append is a function to add new screenshots to fields
  //remove is a function to remove screenshots from fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: "screenshots",
  });

  const handleScreenshotChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      //append updates the useFieldArray state
      files.forEach((file) => {
        append({
          url: URL.createObjectURL(file),
          alt: "new testimonial",
          file,
        });
      });
    }
  };

  const handleFormSubmit = async (data: {
    screenshots: NewTestimonialScreenshot[];
  }) => {
    let numPhotosUploaded = 0;
    let isUploadComplete = false;
    const chunkSize = 3;
    const screenshotChunks = chunkArray(data.screenshots, chunkSize);

    try {
      for (const chunk of screenshotChunks) {
        const uploadedScreenshots = await Promise.all(
          chunk.map(async (screenshot) => {
            const newScreenshotUrl = await uploadPhoto(
              screenshot.file,
              "screenshots"
            );
            return {
              ...screenshot,
              url: newScreenshotUrl,
              alt: "testimonial screenshot",
            };
          })
        );

        await Promise.all(
          uploadedScreenshots.map((screenshotData) =>
            createNewTestimonialScreenshot(screenshotData)
          )
        );
        numPhotosUploaded += chunk.length;
      }

      isUploadComplete = true;

      toast({
        variant: "success",
        title: "Success ✅",
        description: `${numPhotosUploaded} photos uploaded successfully`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh ☹️",
        description:
          error instanceof Error ? error.message : "An error occurred ",
      });
    }

    if (isUploadComplete) {
      redirect("/admin#testimonials");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className='flex flex-col gap-4'>
          <div>
            <Input
              id='uploadScreenshot'
              type='file'
              className='w-auto bg-white'
              accept='image/*'
              multiple
              onChange={handleScreenshotChange}
            />
          </div>
          <div className='grid grid-cols-3 xl:grid-cols-4 gap-4'>
            {fields.map((_, idx) => {
              const screenshotValues = watch(`screenshots.${idx}`);

              return (
                <div
                  key={idx}
                  className='relative'
                >
                  <div className='absolute -top-2 -right-2 hover:scale-125 hover:cursor-pointer transition-all ease-in-out'>
                    <CircleX
                      fill='white'
                      onClick={() => remove(idx)}
                    />
                  </div>
                  <Image
                    src={screenshotValues.url}
                    alt={screenshotValues.alt}
                    height={300}
                    width={300}
                    className='object-cover aspect-square rounded-md'
                  />
                </div>
              );
            })}
          </div>
          <div className='w-full flex justify-end'>
            <Button
              type='submit'
              className='text-lg'
              disabled={fields.length === 0 || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <RotateCw className='mr-2 h-4 w-4 animate-spin' />
                  Please wait...
                </>
              ) : (
                <>Add</>
              )}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default UploadTestimonalForm;
