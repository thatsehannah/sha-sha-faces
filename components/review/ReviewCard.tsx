import { RATING_OPTIONS } from "@/utils/constants";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";
import { formatDistance } from "date-fns";
import { ReviewWithService, ServiceSvg } from "@/utils/types";
import ServiceIconSvg from "../services/ServiceIconSvg";

type ReviewCardProps = {
  review: ReviewWithService;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  const clientRating = RATING_OPTIONS.find(
    (rating) => rating.value === review.rating
  )!;

  const reviewCreatedDate = new Date(review.createdAt);
  const now = new Date();
  const timeAgo = formatDistance(reviewCreatedDate, now, { addSuffix: true });

  return (
    <div className='group odd:bg-secondary even:bg-muted border border-primary p-3 rounded-lg'>
      <div className='mb-8'>
        <p className='text-2xl font-bold'>{review.reviewer}</p>
        <div className='flex items-center gap-2 mt-2'>
          <ServiceIconSvg
            svg={review.service.svgData as ServiceSvg}
            className='w-10 h-10 lg:w-8 lg:h-8 fill-primary'
          />
          <p className='capitalize text-lg'>{review.service.name}</p>
        </div>
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
            <>
              <ThumbsUp className='fill-primary stroke-black stroke-1' />
              <p className='font-semibold'>Would recommend</p>
            </>
          ) : (
            <>
              <ThumbsDown className='fill-primary stroke-black stroke-1' />
              <p className='font-semibold'>Not for me</p>
            </>
          )}
        </div>
      </div>
      <div className='mb-4'>
        <p className='font-light'>{review.comment}</p>
      </div>
      <div className='flex justify-end'>
        <p className='text-gray-700 group-odd:text-gray-700 text-sm'>
          {timeAgo}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
