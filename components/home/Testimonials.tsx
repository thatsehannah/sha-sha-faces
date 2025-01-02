import React from 'react';
import Container from '../global/Container';
import TestimonyCarousel from './components/TestimonyCarousel';

const Testimonies = () => {
  return (
    <section className='my-8 bg-gradient-to-tl from-white to-secondary h-4/5 py-12'>
      <Container className='flex flex-col justify-center items-center'>
        <p className='text-4xl lg:text-5xl font-light mb-8'>
          My Customer
          <span className='font-bold bg-primary p-2 rounded-md ml-2'>
            Testimonials
          </span>{' '}
        </p>
        <TestimonyCarousel />
      </Container>
    </section>
  );
};

export default Testimonies;
