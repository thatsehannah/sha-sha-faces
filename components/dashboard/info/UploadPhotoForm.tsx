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
import {
  createNewPortfolioPhoto,
  fetchPortfolioCategoryLength,
} from "@/utils/actions";
import { NewPhoto } from "@/utils/types";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const UploadPhotoForm = () => {
  const { toast } = useToast();
  const [newPhoto, setNewPhoto] = useState<File>();

  const form = useForm<NewPhoto>({
    defaultValues: {
      isFeatured: false,
      isShown: false,
      category: "",
    },
  });

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const photo = e.target.files[0];
      setNewPhoto(photo);
    }
  };

  const handleFormSubmit = async (photo: NewPhoto) => {
    try {
      const rawPhoto = newPhoto as File;
      const newPhotoUrl = await uploadPhoto(rawPhoto);
      const categoryLength = await fetchPortfolioCategoryLength(photo.category);

      const newPortfolioPhoto: NewPhoto = {
        ...photo,
        url: newPhotoUrl,
        alt: `${photo.category} photo ${categoryLength}`,
      };

      const resultMessage = await createNewPortfolioPhoto(newPortfolioPhoto);

      toast({
        variant: "success",
        title: "Success ✅",
        description: resultMessage,
      });

      redirect("/admin/info");
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
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <div className='flex flex-col gap-4'>
          <div className=''>
            <Input
              id='uploadPhoto'
              type='file'
              className='w-auto'
              accept='image/*'
              onChange={handlePhotoChange}
            />
          </div>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-8'>
            {newPhoto && (
              <div className='flex gap-4'>
                <Image
                  src={URL.createObjectURL(newPhoto)}
                  alt='new photo'
                  height={200}
                  width={200}
                  className='object-cover aspect-square rounded-md'
                />
                <div className='grid grid-cols-1 w-full gap-2'>
                  <div className='flex flex-col gap-1'>
                    <Label
                      className='text-[1rem]'
                      htmlFor='isFeatured'
                    >
                      Featured Photo
                    </Label>
                    <Switch
                      id='isFeatured'
                      onCheckedChange={(value) =>
                        form.setValue("isFeatured", value)
                      }
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <Label
                      className='text-[1rem]'
                      htmlFor='isShown'
                    >
                      Show in Portfolio
                    </Label>
                    <Switch
                      id='isShown'
                      onCheckedChange={(value) =>
                        form.setValue("isShown", value)
                      }
                    />
                  </div>
                  <div className='flex flex-col gap-1 w-3/4'>
                    <Label
                      className='text-[1rem]'
                      htmlFor='category'
                    >
                      Category
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("category", value)
                      }
                    >
                      <SelectTrigger className='text-[1rem]'>
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
            )}
          </div>
          <div className='w-full flex justify-end'>
            <Button
              type='submit'
              className='text-lg'
              disabled={newPhoto === undefined || form.formState.isSubmitting}
            >
              Add
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default UploadPhotoForm;
