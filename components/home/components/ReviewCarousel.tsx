"use client";

import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { ReviewWithService } from "@/utils/types";

type ReviewCarouselProps = {
  reviews: ReviewWithService[];
};

const ReviewCarousel = ({ reviews }: ReviewCarouselProps) => {
  const plugin = useRef(Autoplay({ delay: 6000, stopOnInteraction: true }));

  const emphasizeWords = (review: string) => {
    const emphasisWords = [
      "love",
      "loved",
      "great",
      "professional",
      "happy",
      "looking good",
    ];

    const regex = new RegExp(`\\b(${emphasisWords.join("|")})\\b`, "i");
    const matched = review.match(regex);

    if (matched) {
      const foundWord = matched[0];
      const splitIdx = matched.index;

      return {
        before: review.slice(0, splitIdx),
        emphasizedWord: foundWord,
        after: review.slice(splitIdx! + foundWord.length),
      };
    }

    return {
      before: review,
      emphasizeWord: null,
      after: "",
    };
  };

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={() => plugin.current.play(false)}
      className='w-[16rem] sm:w-[18rem] xl:w-full md:w-[36rem] lg:w-[56rem]'
    >
      <CarouselContent>
        {reviews.map((item, idx) => {
          const { before, emphasizedWord, after } = emphasizeWords(
            item.comment
          );

          return (
            <CarouselItem key={idx}>
              <Card className='bg-secondary shadow-inner border border-primary-foreground'>
                <CardContent className='flex flex-col justify-center items-center md:p-8 p-4 gap-6'>
                  <Quote
                    size={30}
                    className='fill-black stroke-black'
                  />
                  <p className='text-xl lg:text-2xl normal-case text-secondary-foreground'>
                    {before}{" "}
                    {emphasizedWord && (
                      <span className='text-secondary-foreground tracking-wide font-black uppercase text-2xl lg:text-3xl'>
                        {emphasizedWord}
                      </span>
                    )}{" "}
                    {after}
                  </p>
                  <p className='text-2xl font-bold shrink-2 text-secondary-foreground'>
                    -- {item.reviewer}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className='hover:bg-secondary flex' />
      <CarouselNext className='hover:bg-secondary flex' />
    </Carousel>
  );
};

export default ReviewCarousel;
