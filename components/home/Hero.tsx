import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { asap } from '@/lib/fonts';
import heroImg from '@/public/images/photo6.jpeg';

const Hero = () => {
  return (
    <section className='mx-auto h-screen grid grid-cols-1 lg:grid-cols-2 gap-24 px-10 lg:px-24 py-8 lg:py-12 bg-gradient-to-tl from-soft-pink to-white'>
      <div className='flex flex-col justify-center items-center'>
        <Image
          src={heroImg}
          height={300}
          width={500}
          alt='hero image'
          priority
          className='block lg:hidden w-full h-[23rem] mb-8 rounded-md object-cover'
        />
        <Image
          src='/logo/logo-color-2.svg'
          priority
          alt='logo'
          width={400}
          height={400}
          className='h-[10rem] lg:h-[24rem]'
        />
        <p
          className={`${asap.className} text-lg lg:text-2xl font-extrabold uppercase mt-4`}
        >
          Glam that soothes, beauty that shines
        </p>
        <Button
          variant='link'
          asChild
          className='mt-8 text-2xl text-muted-foreground'
        >
          <Link href='/#portfolio'>View Portfolio &gt;</Link>
        </Button>
      </div>
      <Image
        src={heroImg}
        height={300}
        width={300}
        alt='hero image'
        priority
        className='hidden lg:block w-full h-[36rem] rounded-md object-cover'
      />
    </section>
  );
};

export default Hero;
