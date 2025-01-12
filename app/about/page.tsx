import Container from '@/components/global/Container';
import { parisienne } from '@/lib/fonts';
import Image from 'next/image';
import React from 'react';

const AboutPage = () => {
  return (
    <main className='relative'>
      <Container className='flex flex-col xl:flex-row items-center py-20 gap-8'>
        <div className='xl:w-1/2 xl:h-full'>
          <Image
            src='/images/theartist2.jpg'
            alt='naisha'
            width={500}
            height={500}
            priority
            className='object-cover rounded-lg'
          />
        </div>
        <div className='xl:w-1/2 xl:h-full flex flex-col justify-center items-center gap-8 text-xl font-light'>
          <p>
            <span className='text-4xl font-bold text-primary'>
              Hey! I’m <span className={parisienne.className}>Naisha</span>
            </span>
            , your go-to makeup artist based in sunny Los Angeles (but my
            brushes are always ready for an adventure—whether it’s domestic or
            international). With over 8 years of experience, I specialize in
            creating classic, elevated glam that makes you look like
            yourself—just with a little extra wow. People will definitely ask,
            “Who did your makeup?” (Spoiler: it’s me).
          </p>
          <p>
            I prioritize working with diverse skin tones and enhancing{' '}
            <span className={`text-[23px] ${parisienne.className}`}>
              natural beauty.
            </span>{' '}
            While bridal makeup is one of my specialties, I’m also venturing
            into the editorial world, blending art and beauty in fresh, creative
            ways—because why not explore a little drama? So, whether you’re
            walking down the aisle, prepping for a big shoot, or just want to
            feel like the main character on a Tuesday, I’m your girl.
          </p>
          <p>
            When I’m not making people feel their most beautiful, you can find
            me perfecting that glow that says “I woke up like this” (but we all
            know it takes a village), keeping things fun, fresh, and most
            importantly—flawless.{' '}
            <span className={`text-[23px] ${parisienne.className}`}>
              Let’s glam it up!
            </span>
          </p>
        </div>
      </Container>
    </main>
  );
};

export default AboutPage;
