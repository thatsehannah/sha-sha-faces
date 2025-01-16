'use client';

import React, { useRef } from 'react';
import testimonials from '@/utils/testimonials.json';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import Container from '@/components/global/Container';
import Autoplay from 'embla-carousel-autoplay';

const TestimonyCarousel = () => {
  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));

  const emphasizeWords = (testimonial: string) => {
    const emphasisWords = [
      'love',
      'loved',
      'great',
      'professional',
      'happy',
      'looking good',
    ];

    const regex = new RegExp(`\\b(${emphasisWords.join('|')})\\b`, 'i');
    const matched = testimonial.match(regex);

    if (matched) {
      const foundWord = matched[0];
      const splitIdx = matched.index;

      return {
        before: testimonial.slice(0, splitIdx),
        emphasizedWord: foundWord,
        after: testimonial.slice(splitIdx! + foundWord.length),
      };
    }

    return {
      before: testimonial,
      emphasizeWord: null,
      after: '',
    };
  };

  return (
    <Container className='w-full lg:p-6'>
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={() => plugin.current.play(false)}
      >
        <CarouselContent>
          {testimonials.map((item, idx) => {
            const { before, emphasizedWord, after } = emphasizeWords(
              item.testimony
            );

            return (
              <CarouselItem key={idx}>
                <Card>
                  <CardContent className='flex flex-col justify-center items-center p-8 gap-5'>
                    {/* <div className='flex flex-row gap-4'>
                      {Array.from({ length: item.starCount }).map((_, idx) => (
                        <Star
                          key={idx}
                          size={40}
                          fill='gold'
                          strokeWidth={0}
                        />
                      ))}
                    </div> */}
                    <Quote
                      fill='black'
                      size={30}
                    />
                    <p className='text-xl lg:text-2xl normal-case'>
                      {before}{' '}
                      {emphasizedWord && (
                        <span className='text-primary tracking-wide font-black uppercase text-2xl lg:text-3xl'>
                          {emphasizedWord}
                        </span>
                      )}{' '}
                      {after}
                    </p>
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
