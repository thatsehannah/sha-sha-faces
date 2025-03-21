"use client";

import EmptyResults from "@/components/global/EmptyResults";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { updateReviewVisibility } from "@/utils/actions";
import { RATING_OPTIONS } from "@/utils/constants";
import { ReviewWithService } from "@/utils/types";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

type ReviewDetail = {
  reviews: ReviewWithService[];
};

const ReviewDetail = ({ reviews }: ReviewDetail) => {
  const ratingsReversed = RATING_OPTIONS.slice().reverse();
  const [activeRating, setActiveRating] = useState(ratingsReversed[0].value);

  const reviewsToShow = reviews.filter(
    (review) => review.rating === activeRating
  );
  const reviewsLength = reviews.length;

  const { toast } = useToast();

  const showToast = (message: string) => {
    toast({
      variant: "success",
      description: message,
    });
  };

  const handleReviewVisibility = useDebouncedCallback(
    async (id: string, value: boolean) => {
      await updateReviewVisibility(id, value);
    },
    2000
  );

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
                  className={`flex items-center xl:gap-3 gap-1 whitespace-nowrap rounded-md xl:text-lg text-sm transition-colors disabled:opacity-50 hover:text-secondary-foreground h-9 xl:p-8 p-4 hover:cursor-pointer hover:bg-secondary xl:mb-0 mb-4 ${
                    activeRating === rating.value &&
                    "bg-secondary text-secondary-foreground"
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
                    <div
                      key={idx}
                      className='relative transition-all ease-in-out'
                    >
                      <div className='mb-8 bg-muted p-6 rounded-md border'>
                        <div className='flex justify-between items-start'>
                          <p className='font-bold text-xl mb-4'>
                            {review.reviewer}
                          </p>
                          <div className='flex gap-2 items-center'>
                            <Label htmlFor='isShown'>Display review</Label>
                            <Switch
                              id='isShown'
                              defaultChecked={review.isShown}
                              onCheckedChange={(value) => {
                                showToast("Review visibility updated!");
                                handleReviewVisibility(review.id, value);
                              }}
                            />
                          </div>
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
