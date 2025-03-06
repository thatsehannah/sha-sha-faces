"use client";

import Container from "@/components/global/Container";
import { parisienne } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

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
            <span className='text-4xl font-bold'>
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
            I prioritize working with diverse skin tones and enhancing{" "}
            <span className={`text-[23px] ${parisienne.className}`}>
              natural beauty.
            </span>{" "}
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
            importantly—flawless.{" "}
            <span className={`text-[23px] ${parisienne.className}`}>
              Let’s glam it up!
            </span>
          </p>
        </div>
      </Container>
      <div className='flex lg:flex-row flex-col-reverse items-center justify-center bg-primary p-8'>
        <div className='flex flex-col'>
          <p
            className={`text-center mb-8 lg:text-5xl text-4xl font-black text-black`}
          >
            Follow Me On Instagram!
          </p>

          <div className='lg:mb-32 mb-16 flex flex-row lg:justify-around gap-8'>
            <div className='rounded-xl lg:p-6 p-3 transition-all duration-300 ease-in-out hover:text-white hover:shadow-[inset_240px_0_0_0_#7070FF] border-2 border-black hover:cursor-pointer'>
              <Link
                href='https://www.instagram.com/wownaisha'
                target='_blank'
                rel='noopener noreferrer'
              >
                <p className='lg:text-3xl text-2xl font-bold text-black'>
                  @wownaisha
                </p>
              </Link>
            </div>
            <div className='rounded-xl lg:p-6 p-3 transition-all duration-300 ease-in-out hover:text-white hover:shadow-[inset_240px_0_0_0_#7070FF] border-2 border-black hover:cursor-pointer'>
              <Link
                href='https://www.instagram.com/shashafaces'
                target='_blank'
                rel='noopener noreferrer'
              >
                <p className='lg:text-3xl text-2xl font-bold text-black'>
                  @shashafaces
                </p>
              </Link>
            </div>
          </div>
          <p className='text-3xl font-medium text-black mb-2'>
            Stay up to date on my latest posts, announcements, and much more!
          </p>
          <p className='text-black font-light text-lg'>
            Don&apos;t forget to tag me in your posts.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className='xl:-mt-40 -mt-28'
        >
          <Image
            src='/branding/instagram.png'
            priority
            alt='instagram on iphone'
            width={500}
            height={500}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </motion.div>
      </div>
    </main>
  );
};

export default AboutPage;
