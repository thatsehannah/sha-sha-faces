'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { NewPhoto } from '@/utils/types';
import Image from 'next/image';
import React, { ChangeEvent, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const UploadPhotoForm = () => {
  const [newPhotos, setNewPhotos] = useState<File[]>([]);

  const form = useForm<NewPhoto[]>();

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedPhotos = Array.from(e.target.files);
      setNewPhotos((prevState) => [...prevState, ...selectedPhotos]);
    }
  };

  const handleFormSubmit = (photos: NewPhoto[]) => {
    console.log(photos);
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
            {newPhotos.map((photo, idx) => {
              const photoUrl = URL.createObjectURL(photo);

              return (
                <div
                  key={idx}
                  className='flex gap-4'
                >
                  <Image
                    src={photoUrl}
                    alt={`new photo ${idx + 1}`}
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
                        onCheckedChange={(value) => console.log(value)}
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Label
                        className='text-[1rem]'
                        htmlFor='isShown'
                      >
                        Show in Gallery
                      </Label>
                      <Switch
                        id='isShown'
                        onCheckedChange={(value) => console.log(value)}
                      />
                    </div>
                    <div className='flex flex-col gap-1 w-3/4'>
                      <Label
                        className='text-[1rem]'
                        htmlFor='category'
                      >
                        Category
                      </Label>
                      <Select>
                        <SelectTrigger className='text-[1rem]'>
                          <SelectValue />
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
