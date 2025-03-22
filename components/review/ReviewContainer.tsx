"use client";

import React from "react";
import Container from "../global/Container";
import { Button } from "../ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import ReviewCard from "./ReviewCard";
import EmptyResults from "../global/EmptyResults";
import { ReviewWithService } from "@/utils/types";

type ReviewContainerProps = {
  reviews: ReviewWithService[];
};

const ReviewContainer = ({ reviews }: ReviewContainerProps) => {
  return (
    <Container className='py-20'>
      <div className='flex justify-between'>
        <p className='text-xl text-center'>
          See what my clients have to say about their experience.
        </p>
        <div>
          <Button
            className='flex text-xl relative px-4 py-2 overflow-hidden transition-all duration-300 group w-[48px] hover:w-[180px] hover:justify-start'
            asChild
          >
            <Link href='/reviews/new'>
              <Pencil className='transition-transform duration-300' />
              <span className='absolute left-11 opacity-0 transition-all duration-300 group-hover:left-12 group-hover:opacity-100 whitespace-nowrap font-bold'>
                Write a Review
              </span>
            </Link>
          </Button>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className='mt-6'>
          <EmptyResults text='No reviews quite yet!' />
        </div>
      ) : (
        <div className='grid xl:grid-cols-3 grid-cols-1 gap-4 mt-6'>
          {reviews.map((review, idx) => (
            <ReviewCard
              key={idx}
              review={review}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default ReviewContainer;
