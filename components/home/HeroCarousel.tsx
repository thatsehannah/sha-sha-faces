'use client';

import React, { useRef } from 'react';
import carousel0 from '@/public/images/photo0.jpeg';
import carousel1 from '@/public/images/photo1.jpeg';
import carousel2 from '@/public/images/photo2.jpeg';
import carousel3 from '@/public/images/photo3.jpeg';
import carousel4 from '@/public/images/photo4.jpeg';
import carousel5 from '@/public/images/photo5.jpeg';
import carousel6 from '@/public/images/photo6.jpeg';
import carousel7 from '@/public/images/photo7.jpeg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

const carouselImages = [
  carousel6,
  carousel0,
  carousel1,
  carousel2,
  carousel3,
  carousel4,
  carousel5,
  carousel7,
];

const HeroCarousel = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  return (
    <div className='hidden lg:flex'>
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {carouselImages.map((img, idx) => {
            return (
              <CarouselItem key={idx}>
                <Card>
                  <CardContent className='p-2'>
                    <Image
                      src={img}
                      alt='hero image'
                      className='w-full h-[44rem] rounded-md object-cover'
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

export default HeroCarousel;
