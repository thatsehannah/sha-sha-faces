"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { italianno } from "@/lib/fonts";
import Container from "../global/Container";

const Hero = () => {
  return (
    <section className='h-[90vh] lg:h-full flex items-center bg-hero-bg bg-cover bg-no-repeat py-12'>
      <Container className='flex justify-center items-center'>
        <motion.div
          initial={{ opacity: 0, x: 75 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className='flex flex-col justify-center items-center'
        >
          <Image
            src='/branding/logo-color.svg'
            priority
            alt='logo'
            width={400}
            height={400}
            className='h-[16rem] md:h-[24rem]'
          />
          <p
            className={`${italianno.className} text-3xl lg:text-5xl font-extrabold mt-4 text-primary-foreground`}
          >
            Glam that soothes, beauty that shines
          </p>
          <Button
            variant='link'
            asChild
            className='mt-8 text-2xl text-primary-foreground'
          >
            <Link href='/#portfolio'>View Portfolio &gt;</Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
