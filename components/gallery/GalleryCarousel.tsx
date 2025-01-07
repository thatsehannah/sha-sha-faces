import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import Image from 'next/image';

type GalleryCarouselProps = {
  photos: {
    url: string;
    alt: string;
  }[];
};

const GalleryCarousel = ({ photos }: GalleryCarouselProps) => {
  return (
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
                className='w-auto h-[28rem] rounded-md object-cover'
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className='hover:bg-secondary' />
      <CarouselNext className='hover:bg-secondary' />
    </Carousel>
  );
};

export default GalleryCarousel;
