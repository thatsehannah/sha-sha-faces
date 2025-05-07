"use client";

import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import Image from "next/image";
import PhotoDialog from "../../global/PhotoDialog";
import { PortfolioPhoto } from "@prisma/client";

type PortfolioCarouselProps = {
  photos: PortfolioPhoto[];
};

const PortfolioCarousel = ({ photos }: PortfolioCarouselProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioPhoto>();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handlePhotoClick = (photo: PortfolioPhoto) => {
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
        <CarouselPrevious className='hover:bg-secondary flex md:hidden' />
        <CarouselNext className='hover:bg-secondary flex md:hidden' />
      </Carousel>

      {selectedPhoto && (
        <PhotoDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          photo={selectedPhoto}
        />
      )}
    </>
  );
};

export default PortfolioCarousel;
