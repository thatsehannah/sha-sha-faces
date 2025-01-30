import Container from '@/components/global/Container';
import SectionTitle from '@/components/global/SectionTitle';
import ReviewForm from '@/components/review/ReviewForm';
import React from 'react';

const ReviewPage = () => {
  return (
    <main className='relative'>
      <SectionTitle
        title='leave a review'
        alignment='left'
      />
      <Container className='py-20'>
        <ReviewForm />
      </Container>
    </main>
  );
};

export default ReviewPage;
