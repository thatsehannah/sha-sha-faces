import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { asap } from '@/lib/fonts';

const Hero = () => {
  return (
    <section className='bg-gradient-to-tl from-white to-soft-pink'>
      <div className='flex flex-col justify-center items-center p-20'>
        <Image
          src='/logo/logo-color-2.svg'
          alt='logo'
          width={512}
          height={512}
        />
        <p
          className={`${asap.className} text-5xl font-extrabold uppercase mt-4`}
        >
          Makeup Artist
        </p>
        <Button
          variant='link'
          asChild
          className='mt-8 text-2xl'
        >
          <Link href='/book'>View Portfolio 💋</Link>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
