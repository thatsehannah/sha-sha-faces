import React from 'react';
import Container from '../global/Container';
import TestimonyCarousel from './components/TestimonyCarousel';
import SectionTitle from '../global/SectionTitle';

const Testimonies = () => {
  return (
    <section className='my-8 bg-gradient-to-tl from-white to-secondary h-4/5 py-12'>
      <SectionTitle
        title='Testimonials'
        orientation='left'
      />
      <Container className='flex flex-col justify-center items-center py-20'>
        <TestimonyCarousel />
      </Container>
    </section>
  );
};

export default Testimonies;
