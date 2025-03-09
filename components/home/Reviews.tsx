import React from "react";
import Container from "../global/Container";
import ReviewCarousel from "./components/ReviewCarousel";
import Link from "next/link";
import { LeftSectionTitle } from "../global/SectionTitles";

const Reviews = () => {
  return (
    <section
      id='reviews'
      className='bg-gradient-to-r from-primary to-tertiary relative'
    >
      <LeftSectionTitle
        title='Reviews'
        textClasses='text-tertiary'
        barClasses='bg-tertiary'
      />
      <Container className='flex flex-col justify-center items-center py-24'>
        <ReviewCarousel />
        <div className='w-full text-xl text-right mt-4 text-primary'>
          <p>
            Want to leave a review?{" "}
            <span>
              <Link
                href='/review'
                className='text-primary font-bold'
              >
                Click here
              </Link>
              .
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Reviews;
