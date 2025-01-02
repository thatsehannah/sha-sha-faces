import React from 'react';
import Container from '../global/Container';
import TestimonyCarousel from './components/TestimonyCarousel';
import SectionTitle from '../global/SectionTitle';

const Testimonies = () => {
  return (
    <section className='bg-gradient-to-tl from-white to-secondary py-8 relative'>
      <SectionTitle
        title='Testimonials'
        alignment='left'
      />
      <Container className='flex flex-col justify-center items-center py-20'>
        <TestimonyCarousel />
      </Container>
    </section>
  );
};

export default Testimonies;
