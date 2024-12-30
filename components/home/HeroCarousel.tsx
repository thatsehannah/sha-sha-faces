import React from 'react';
import carousel0 from '@/public/images/photo0.jpeg';
import carousel1 from '@/public/images/photo1.jpeg';
import carousel2 from '@/public/images/photo2.jpeg';
import carousel3 from '@/public/images/photo3.jpeg';
import carousel4 from '@/public/images/photo4.jpeg';
import carousel5 from '@/public/images/photo5.jpeg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';

const carouselImages = [
  carousel0,
  carousel1,
  carousel2,
  carousel3,
  carousel4,
  carousel5,
];

const HeroCarousel = () => {
  return (
    <div className='hidden lg:flex'>
      <Carousel>
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
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
