'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Container from '../global/Container';
import Image from 'next/image';
import { Button } from '../ui/button';
import SectionTitle from '../global/SectionTitle';
import Link from 'next/link';

const About = () => {
  return (
    <section
      id='about'
      className='relative'
    >
      <SectionTitle
        title='About Me'
        alignment='right'
      />
      <Container className='grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-8 relative py-24'>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false, amount: 0.5 }}
          exit={{ opacity: 0, y: -100 }}
          className='-z-10 hidden lg:block w-[420] h-[420] bg-soft-pink absolute rounded-sm'
        />
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false, amount: 0.5 }}
          exit={{ opacity: 0, y: 100 }}
          className='relative w-full h-[25rem] lg:w-[30rem] lg:h-[30rem] mx-auto'
        >
          <Image
            fill
            src='/images/theartist.jpeg'
            alt='naisha'
            className='w-full rounded-md object-cover'
            sizes='(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw'
          />
        </motion.div>
        <div className='flex flex-col mx-auto'>
          <p className='text-4xl lg:text-5xl font-semibold mb-6'>
            Meet Naisha{' '}
            <span className='text-muted-foreground text-lg text-center'>
              (she/her/hers)
            </span>
          </p>
          <p className='text-xl lg:text-2xl font-light'>
            Hello Gorgeous! Welcome to my website where I have the pleasure of
            presenting my services. I am a self taught makeup artist who is
            passionate about what I do. Let me know what you desire as I am here
            to serve you 💋.
          </p>
          <Button
            variant='outline'
            size='icon'
            className='w-10 mt-4'
            asChild
          >
            <a
              href='https://www.instagram.com/shashafaces'
              target='_blank'
            >
              <Image
                src='/icons/instagram.svg'
                alt='instagram icon'
                width={20}
                height={20}
              />
            </a>
          </Button>
          <Button
            size='lg'
            className='bg-secondary text-xl font-medium w-28 mt-16'
            asChild
          >
            <Link href='/about'>Learn More</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default About;
