import React from 'react';
import Container from '../global/Container';
import ReviewCarousel from './components/ReviewCarousel';
import SectionTitle from '../global/SectionTitle';
import Link from 'next/link';

const Reviews = () => {
  return (
    <section
      id='reviews'
      className='bg-gradient-to-tl from-background to-secondary relative'
    >
      <SectionTitle
        title='Reviews'
        alignment='left'
      />
      <Container className='flex flex-col justify-center items-center py-24'>
        <ReviewCarousel />
        <div className='w-full text-xl text-right mt-4'>
          <p>
            Want to leave a review?{' '}
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
