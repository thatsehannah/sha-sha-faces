import Container from '@/components/global/Container';
import SectionTitle from '@/components/global/SectionTitle';
import ReviewForm from '@/components/review/ReviewForm';
import { fetchServiceInfo } from '@/utils/actions';
import React from 'react';

const ReviewPage = async () => {
  const serviceNamesId = await fetchServiceInfo();
  const serviceNames = serviceNamesId.map((s) => s.name);

  return (
    <main className='relative'>
      <SectionTitle
        title='leave a review'
        alignment='left'
      />
      <Container className='py-20'>
        <ReviewForm serviceNames={serviceNames} />
      </Container>
    </main>
  );
};

export default ReviewPage;
