import { RATING_OPTIONS } from "@/utils/constants";
import { Review } from "@prisma/client";
import { Ban, SquareCheck } from "lucide-react";
import React from "react";
import { formatDistance } from "date-fns";

type ReviewCardProps = {
  review: Review;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const clientRating = RATING_OPTIONS.find(
    (rating) => rating.value === review.rating
  )!;

  const reviewCreatedDate = new Date(review.createdAt);
  const now = new Date();
  const timeAgo = formatDistance(reviewCreatedDate, now, { addSuffix: true });

  return (
    <div className='group odd:bg-secondary dark:odd:text-secondary-foreground even:bg-muted border border-primary p-3 rounded-lg'>
      <div className='mb-6'>
        <p className='text-2xl font-bold'>{review.reviewer}</p>
        <p className='text-gray-700 dark:text-white group-odd:text-gray-700 dark:group-odd:text-muted'>
          {timeAgo}
        </p>
      </div>
      <div className='flex mb-4 justify-between'>
        <div className='flex items-center gap-1'>
          <clientRating.icon
            className={`stroke-black stroke-1 w-8 h-8 ${clientRating.fillColor}`}
          />
          <p className='font-semibold'>{clientRating.label}</p>{" "}
        </div>
        <div className='flex items-center gap-1'>
          {review.wouldRecommend ? (
            <SquareCheck className='fill-green-500 stroke-black stroke-1' />
          ) : (
            <Ban className='fill-red-600 stroke-black stroke-1' />
          )}
          <p className='font-semibold'>
            {review.wouldRecommend ? "Would recommend" : "Not for me"}
          </p>
        </div>
      </div>
      <div>
        <p className='font-light'>{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
