'use client';

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import Container from '../global/Container';

type ImageGridProps = {
  photos: {
    url: string;
    alt: string;
  }[];
};

const ImageGrid = ({ photos }: ImageGridProps) => {
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const imageVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container className='columns-2 lg:columns-5'>
      <motion.div
        variants={gridVariants}
        initial='hidden'
        animate='visible'
      >
        {photos.map((img, idx) => {
          return (
            <motion.div
              key={idx}
              variants={imageVariant}
            >
              <Image
                src={img.url}
                alt={img.alt}
                key={idx}
                width={500}
                height={500}
                sizes='100vw'
                className='rounded-md object-cover mb-4'
              />
            </motion.div>
          );
        })}
      </motion.div>
    </Container>
  );
};

export default ImageGrid;
