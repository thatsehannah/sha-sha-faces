import Container from '@/components/global/Container';
import SvgInstagram from '@/components/global/Instagram';
import { parisienne } from '@/lib/fonts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AboutPage = () => {
  return (
    <main className='relative'>
      <Container className='flex flex-col xl:flex-row items-center py-20 gap-8'>
        <div className='xl:w-1/2 xl:h-full'>
          <Image
            src='/images/theartist2.png'
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
      <div className='flex lg:flex-row flex-col-reverse items-center justify-center bg-gradient-to-r from-periwinkle to-background p-8'>
        <div className='flex flex-col'>
          <p className={`text-center mb-8 text-5xl font-black`}>
            Follow Me On Instagram!
          </p>

          <div className='lg:mb-32 mb-16 flex flex-col lg:flex-row lg:justify-around gap-8'>
            <div className='flex gap-4 items-center'>
              <div className=' lg:p-6 p-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-10'>
                <SvgInstagram className='h-16 w-16' />
              </div>
              <div className='rounded-xl lg:p-6 p-3 -ml-8 transition-all duration-300 ease-in-out hover:text-white hover:shadow-[inset_240px_0_0_0_background]'>
                <Link
                  href='https://www.instagram.com/wownaisha'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <p className='text-3xl font-bold text-foreground'>
                    @wownaisha
                  </p>
                </Link>
              </div>
            </div>
            <div className='flex gap-4 items-center'>
              <div className=' lg:p-6 p-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-10'>
                <SvgInstagram className='h-16 w-16' />
              </div>
              <div className='rounded-lg lg:p-6 p-3 -ml-8 transition-all duration-300 ease-in-out hover:text-white hover:shadow-[inset_240px_0_0_0_background]'>
                <Link
                  href='https://www.instagram.com/shashafaces'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <p className='text-3xl font-bold text-foreground'>
                    @shashafaces
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <p className='text-3xl font-medium'>
            Stay up to date on my latest posts, announcements, and much more!
          </p>
          <p>Dont forget to tag me in your posts.</p>
        </div>
        <div className='lg:-mt-40 -mt-32'>
          <Image
            src='/branding/instagram.png'
            priority
            alt='instagram on iphone'
            width={500}
            height={500}
          />
        </div>
      </div>
    </main>
  );
};

export default AboutPage;
