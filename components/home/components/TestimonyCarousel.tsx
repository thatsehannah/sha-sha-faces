'use client';

import React, { useRef } from 'react';
import testimonies from '@/lib/testimonials.json';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';
import Container from '@/components/global/Container';
import Autoplay from 'embla-carousel-autoplay';

const TestimonyCarousel = () => {
  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));

  return (
    <Container className='mt-2 w-full p-6'>
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={() => plugin.current.play(false)}
      >
        <CarouselContent>
          {testimonies.map((item, idx) => {
            return (
              <CarouselItem key={idx}>
                <Card>
                  <CardContent className='flex flex-col justify-center items-center p-8 gap-5'>
                    <div className='flex flex-row gap-4'>
                      {Array.from({ length: item.starCount }).map((_, idx) => (
                        <Star
                          key={idx}
                          size={40}
                          fill='gold'
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                    <Quote
                      fill='black'
                      size={30}
                    />
                    <p className='text-2xl shrink-2'>{item.testimony}</p>
                    <p className='text-2xl font-bold shrink-2'>
                      -- {item.reviewer}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </Container>
  );
};

export default TestimonyCarousel;
