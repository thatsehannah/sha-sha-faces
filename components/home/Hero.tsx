"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { parisienne } from "@/lib/fonts";
import Container from "../global/Container";

const Hero = () => {
  return (
    <section className='h-full bg-gradient-to-r from-primary to-background py-12'>
      <Container className='grid grid-cols-1 lg:grid-cols-2 lg:gap-24 justify-center items-center'>
        <motion.div
          initial={{ opacity: 0, x: 75 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className='flex flex-col justify-center items-center'
        >
          <Image
            src='/images/glam/photo6.jpeg'
            height={500}
            width={500}
            alt='hero image'
            priority
            className='block lg:hidden w-full lg:h-[26rem] h-[30rem] mb-8 rounded-xl object-contain xl:object-cover'
          />
          <Image
            src='/branding/logo-black.svg'
            priority
            alt='logo'
            width={400}
            height={400}
            className='h-[16rem] lg:h-[24rem]'
          />
          <p
            className={`${parisienne.className} text-3xl lg:text-4xl font-extrabold mt-4`}
          >
            Glam that soothes, beauty that shines
          </p>
          <Button
            variant='link'
            asChild
            className='mt-8 text-2xl text-foreground'
          >
            <Link href='/#portfolio'>View Portfolio &gt;</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -75 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src='/images/glam/photo6.jpeg'
            height={300}
            width={300}
            alt='hero image'
            priority
            className='hidden lg:block w-full h-[36rem] rounded-md object-cover'
          />
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
