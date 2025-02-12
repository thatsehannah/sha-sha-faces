'use client';

import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../ui/carousel';
import Image from 'next/image';
import GalleryDialog from '../../global/PhotoDialog';
import { GalleryPhoto } from '@prisma/client';

type PortfolioCarouselProps = {
  photos: GalleryPhoto[];
};

const GalleryCarousel = ({ photos }: PortfolioCarouselProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handlePhotoClick = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Carousel
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {photos.map((img, idx) => {
            return (
              <CarouselItem
                key={idx}
                className='lg:basis-1/3 flex justify-center'
              >
                <div className='bg-gradient-to-r from-tertiary via-white to-tertiary flex justify-center items-center p-2 rounded-md'>
                  <Image
                    src={img.url}
                    alt={img.alt}
                    width={500}
                    height={500}
                    className='w-auto h-[28rem] rounded-md object-cover hover:cursor-pointer'
                    onClick={() => handlePhotoClick(img)}
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className='hover:bg-secondary lg:flex hidden' />
        <CarouselNext className='hover:bg-secondary lg:flex hidden' />
      </Carousel>

      {selectedPhoto && (
        <GalleryDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          photo={selectedPhoto}
        />
      )}
    </>
  );
};

export default GalleryCarousel;
