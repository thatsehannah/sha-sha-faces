"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  updateGalleryPhotoCategory,
  updateGalleryPhotoVisibility,
} from "@/utils/actions";
import { GalleryPhoto } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type ManageGalleryCardProps = {
  photos: GalleryPhoto[];
};

const ManageGalleryCard = ({ photos }: ManageGalleryCardProps) => {
  const { toast } = useToast();

  const showToast = (message: string) => {
    toast({
      variant: "success",
      description: message,
    });
  };

  const handleIsFeaturedSwitch = useDebouncedCallback(
    async (id: string, value: boolean) => {
      await updateGalleryPhotoVisibility(id, "isFeatured", value);
    },
    3000
  );

  const handleIsShownSwitch = useDebouncedCallback(
    async (id: string, value: boolean) => {
      await updateGalleryPhotoVisibility(id, "isShown", value);
    },
    3000
  );

  const handleCategoryChange = useDebouncedCallback(
    async (id: string, value: string) => {
      await updateGalleryPhotoCategory(id, value);
    },
    3000
  );

  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex gap-4 justify-between items-center mb-4'>
            <CardTitle className='text-2xl font-medium'>
              Manage Photos
            </CardTitle>
            <Button asChild>
              <Link href='/admin/info/add-photo'>Add Photo to Gallery</Link>
            </Button>
          </div>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-8'>
            {/* TODO: add pagination and/or filter */}
            {photos.map((photo) => (
              <div
                className='flex justify-center lg:justify-start gap-4'
                key={photo.id}
              >
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  className='object-cover aspect-square hover:scale-110 hover:cursor-pointer transition-all ease-in-out rounded-md'
                  width={200}
                  height={200}
                />
                <div className='flex flex-col gap-6 w-full'>
                  <div className='flex flex-col gap-1'>
                    <Label htmlFor={`isFeatured-${photo.id}`}>
                      Featured Photo
                    </Label>

                    <Switch
                      id='isFeatured'
                      defaultChecked={photo.isFeatured}
                      onCheckedChange={(value) => {
                        showToast("Featured visibility saved.");
                        handleIsFeaturedSwitch(photo.id, value);
                      }}
                    />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <Label htmlFor='isShown'>Show in Gallery</Label>

                    <Switch
                      id='isShown'
                      defaultChecked={photo.isShown}
                      onCheckedChange={(value) => {
                        showToast("Gallery visibility saved.");
                        handleIsShownSwitch(photo.id, value);
                      }}
                    />
                  </div>
                  <div className='flex flex-col gap-1 w-3/4'>
                    <Label htmlFor='category'>Category</Label>

                    <Select
                      defaultValue={photo.category}
                      onValueChange={(value) => {
                        showToast("Category change saved.");
                        handleCategoryChange(photo.id, value);
                      }}
                    >
                      <SelectTrigger
                        id='category'
                        className='text-[1rem] data-[placeholder]:text-gray-500 dark:data-[placeholder]:text-gray-700 data-[placeholder]:font-extralight'
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
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ManageGalleryCard;
