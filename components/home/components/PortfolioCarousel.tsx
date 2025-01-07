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

type PortfolioCarouselProps = {
  photos: {
    url: string;
    alt: string;
  }[];
};

const PortfolioCarousel = ({ photos }: PortfolioCarouselProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<{
    url: string;
    alt: string;
  }>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handlePhotoClick = (photo: { url: string; alt: string }) => {
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
                className='flex lg:basis-1/3 justify-center'
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  width={500}
                  height={500}
                  className='w-auto h-[28rem] rounded-md object-cover hover:cursor-pointer'
                  onClick={() => handlePhotoClick(img)}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className='hover:bg-secondary' />
        <CarouselNext className='hover:bg-secondary' />
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

export default PortfolioCarousel;
