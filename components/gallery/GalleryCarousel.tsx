'use client';

import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';

type GalleryCarouselProps = {
  photos: {
    url: string;
    alt: string;
  }[];
};

const GalleryCarousel = ({ photos }: GalleryCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  console.log(`Current: ${current}`);

  return (
    <div className='flex justify-center items-center'>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {photos.map((img, idx) => {
            return (
              <CarouselItem key={idx}>
                <Card>
                  <CardContent className='p-2'>
                    <Image
                      src={img.url}
                      alt={img.alt}
                      width={500}
                      height={500}
                      className='w-auto h-[44rem] rounded-md object-cover'
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className='hover:bg-secondary' />
        <CarouselNext className='hover:bg-secondary' />
      </Carousel>
    </div>
  );
};

export default GalleryCarousel;
