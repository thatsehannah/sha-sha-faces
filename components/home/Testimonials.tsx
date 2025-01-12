import React from 'react';
import Container from '../global/Container';
import TestimonyCarousel from './components/TestimonyCarousel';
import SectionTitle from '../global/SectionTitle';

const Testimonies = () => {
  return (
    <section
      id='testimonials'
      className='bg-gradient-to-tl from-background to-secondary relative'
    >
      <SectionTitle
        title='Testimonials'
        alignment='left'
      />
      <Container className='flex flex-col justify-center items-center py-24'>
        <TestimonyCarousel />
      </Container>
    </section>
  );
};

export default Testimonies;
