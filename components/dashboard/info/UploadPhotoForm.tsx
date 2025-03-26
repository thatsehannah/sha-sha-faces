"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { uploadPhoto } from "@/lib/supabase";
import { chunkArray } from "@/lib/utils";
import { createNewPortfolioPhoto } from "@/utils/actions";
import { NewPhoto } from "@/utils/types";
import { RotateCw } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { ChangeEvent } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

const UploadPhotoForm = () => {
  const { toast } = useToast();

  const form = useForm<{ photos: NewPhoto[] }>({
    defaultValues: { photos: [] },
  });
  const { control, setValue, watch } = form;
  const { fields, append } = useFieldArray({ control, name: "photos" });

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      files.forEach((file) => {
        append({
          isFeatured: false,
          isShown: false,
          category: "",
          url: URL.createObjectURL(file),
          alt: "new photo",
          file: file,
        });
      });
    }
  };

  const handleFormSubmit = async (data: { photos: NewPhoto[] }) => {
    let numPhotosUploaded = 0;
    let isUploadComplete = false;
    const chunkSize = 3;
    const photoChunks = chunkArray(data.photos, chunkSize);

    try {
      for (const chunk of photoChunks) {
        const uploadedPhotos = await Promise.all(
          chunk.map(async (photo) => {
            const newPhotoUrl = await uploadPhoto(photo.file);
            return {
              ...photo,
              url: newPhotoUrl,
              alt: `${photo.category} photo`,
            };
          })
        );

        await Promise.all(
          uploadedPhotos.map((photoData) => createNewPortfolioPhoto(photoData))
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
      redirect("/admin/info");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className='flex flex-col gap-4'>
          <div className=''>
            <Input
              id='uploadPhoto'
              type='file'
              className='w-auto'
              accept='image/*'
              multiple
              onChange={handlePhotoChange}
            />
          </div>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-8'>
            {fields.map((_, idx) => {
              const photoValues = watch(`photos.${idx}`);

              return (
                <div
                  key={idx}
                  className='flex gap-4'
                >
                  <Image
                    src={photoValues.url}
                    alt={photoValues.alt}
                    height={300}
                    width={300}
                    className='object-cover aspect-square rounded-md'
                  />
                  <div className='flex flex-col gap-6 w-full'>
                    <div className='flex flex-col gap-1'>
                      <Label htmlFor={`isFeatured-${idx}`}>
                        Featured Photo
                      </Label>

                      <Switch
                        id={`isFeatured-${idx}`}
                        checked={photoValues.isFeatured}
                        onCheckedChange={(value) => {
                          setValue(`photos.${idx}.isFeatured`, value);
                        }}
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Label htmlFor={`isShown-${idx}`}>
                        Show in Portfolio
                      </Label>

                      <Switch
                        id={`isShown-${idx}`}
                        onCheckedChange={(value) => {
                          setValue(`photos.${idx}.isShown`, value);
                        }}
                      />
                    </div>
                    <div className='flex flex-col gap-1 w-3/4'>
                      <Label htmlFor={`category-${idx}`}>Category</Label>
                      <Select
                        onValueChange={(value) => {
                          setValue(`photos.${idx}.category`, value);
                        }}
                      >
                        <SelectTrigger
                          id={`category-${idx}`}
                          className='text-[1rem] data-[placeholder]:text-gray-500 data-[placeholder]:font-extralight'
                        >
                          <SelectValue placeholder='Select a category' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            className='text-[1rem]'
                            value='bridal'
                          >
                            Bridal
                          </SelectItem>
                          <SelectItem
                            className='text-[1rem]'
                            value='glam'
                          >
                            Glam
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
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

export default UploadPhotoForm;
