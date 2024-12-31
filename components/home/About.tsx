import React from 'react';
import Container from '../global/Container';
import Image from 'next/image';
import { Button } from '../ui/button';

const About = () => {
  return (
    <section className='my-8'>
      <Container className='grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-8 py-8'>
        <div className='relative w-[25rem] h-[25rem] lg:w-[30rem] lg:h-[30rem] mx-auto'>
          <Image
            fill
            src='/images/theartist.jpeg'
            alt='naisha'
            className='w-full rounded-md object-cover'
            sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw'
          />
        </div>
        <div className='mx-auto text-center lg:text-left'>
          <p className='text-6xl font-extrabold text-secondary mb-4'>
            About Naisha 💋
          </p>
          <p className='text-2xl font-light mb-16'>
            Hello Gorgeous! Welcome to my website where I have the pleasure of
            presenting my services. I am a self taught makeup artist who is
            passionate about what I do. Let me know what you desire as I am here
            to serve you.
          </p>
          <Button
            size='lg'
            className='bg-secondary text-xl font-medium'
          >
            Book Now
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default About;
