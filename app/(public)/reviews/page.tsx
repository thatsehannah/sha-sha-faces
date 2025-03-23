import { LeftSectionTitle } from "@/components/global/SectionTitles";
import ReviewContainer from "@/components/review/ReviewContainer";
import { fetchViewableReviews } from "@/utils/actions";
import React from "react";

const ReviewsPage = async () => {
  const reviews = await fetchViewableReviews();

  return (
    <main className='relative'>
      <LeftSectionTitle title={`client reviews (${reviews.length})`} />
      <ReviewContainer reviews={reviews} />
    </main>
  );
};

export default ReviewsPage;
