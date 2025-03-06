"use client";

import EmptyResults from "@/components/global/EmptyResults";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { RATING_OPTIONS } from "@/utils/constants";
import { ReviewWithService } from "@/utils/types";
import React, { useState } from "react";

type ReviewDetail = {
  reviews: ReviewWithService;
};

const ReviewDetail = ({ reviews }: ReviewDetail) => {
  const ratingsReversed = RATING_OPTIONS.slice().reverse();
  const [activeRating, setActiveRating] = useState(ratingsReversed[0].value);

  const reviewsToShow = reviews.filter(
    (review) => review.rating === activeRating
  );
  const reviewsLength = reviews.length;

  return (
    <section>
      <div className='bg-muted p-12 rounded-lg w-full'>
        <p className='text-2xl font-medium'>Your Reviews</p>
        <p className='text-muted-foreground mt-2'>
          {reviewsLength} review{reviewsLength === 1 ? "" : "s"}
        </p>
        <Separator className='my-6 bg-primary' />
        <div className='flex xl:flex-row flex-col'>
          {/* Review Sidebar */}
          <aside className='xl:flex xl:flex-col grid grid-cols-2 xl:gap-6 gap-2 xl:w-1/4 w-full xl:rounded-l-lg rounded-none'>
            {ratingsReversed.map((rating, idx) => {
              return (
                <div
                  key={idx}
                  className={`flex items-center xl:gap-3 gap-1 whitespace-nowrap rounded-md xl:text-lg text-sm transition-colors disabled:opacity-50 hover:text-secondary h-9 xl:p-8 p-4  hover:cursor-pointer hover:bg-gray-500 xl:mb-0 mb-4 ${
                    activeRating === rating.value && "bg-gray-300"
                  }`}
                  onClick={() => setActiveRating(rating.value)}
                >
                  <rating.icon
                    className={`stroke-black stroke-1 w-8 h-8 ${rating.fillColor} xl:inline-block hidden`}
                  />
                  <p className=''>{rating.label}</p>
                </div>
              );
            })}
          </aside>

          {/* Review Window */}
          <div className='flex-1 xl:w-3/4 w-full bg-background p-4 h-[50rem]'>
            {reviewsToShow.length === 0 ? (
              <EmptyResults text='No reviews quite yet.' />
            ) : (
              <ScrollArea className='h-[50rem] w-full'>
                {reviewsToShow.map((review, idx) => {
                  return (
                    <div key={idx}>
                      <div className='mb-8 bg-muted p-6 rounded-md'>
                        <div className='font-bold text-xl mb-4'>
                          {review.reviewer}
                        </div>
                        <div className='flex flex-col xl:flex-row xl:justify-between gap-1 mb-4'>
                          <div>
                            <span className='inline-flex font-semibold'>
                              Created:
                            </span>{" "}
                            {review.createdAt.toLocaleDateString()}
                          </div>
                          <Separator orientation='vertical' />
                          <div>
                            <span className='inline-flex font-semibold'>
                              Service:
                            </span>{" "}
                            <p className='capitalize inline-flex'>
                              {review.service.name}
                            </p>
                          </div>
                          <Separator orientation='vertical' />
                          <div>
                            <span className='inline-flex font-semibold'>
                              Would recommend?
                            </span>{" "}
                            <p className='capitalize inline-flex'>
                              {review.wouldRecommend ? "Yes" : "No"}
                            </p>
                          </div>
                        </div>
                        <div className='font-light italic'>
                          {review.comment}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ScrollArea>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewDetail;
