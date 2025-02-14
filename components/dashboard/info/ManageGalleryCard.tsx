'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { updateGalleryPhotoVisibility } from '@/utils/actions';
import { GalleryPhoto } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

type ManageGalleryCardProps = {
  photos: GalleryPhoto[];
};

const ManageGalleryCard = ({ photos }: ManageGalleryCardProps) => {
  const handleIsFeaturedSwitch = useDebouncedCallback(
    async (id: string, value: boolean) => {
      await updateGalleryPhotoVisibility(id, 'isFeatured', value);
    },
    3000
  );

  const handleIsShownSwitch = useDebouncedCallback(
    async (id: string, value: boolean) => {
      await updateGalleryPhotoVisibility(id, 'isShown', value);
    },
    3000
  );
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Photos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'>
            {photos.map((photo) => (
              <div
                className='flex justify-center xl:justify-start gap-4'
                key={photo.id}
              >
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  className='object-cover aspect-square hover:scale-110 hover:cursor-pointer transition-all ease-in-out rounded-md'
                  width={200}
                  height={200}
                />
                <div>
                  {/* TODO: create add image button */}
                  <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-1'>
                      <Label htmlFor='isFeatured'>Featured Photo</Label>
                      <Switch
                        id='isFeatured'
                        defaultChecked={photo.isFeatured}
                        onCheckedChange={(value) =>
                          handleIsFeaturedSwitch(photo.id, value)
                        }
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <Label htmlFor='isShown'>Show in Gallery</Label>
                      <Switch
                        id='isShown'
                        defaultChecked={photo.isShown}
                        onCheckedChange={(value) =>
                          handleIsShownSwitch(photo.id, value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageGalleryCard;
