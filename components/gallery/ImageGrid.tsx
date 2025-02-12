'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../global/Container';
import GalleryDialog from '../global/PhotoDialog';
import { GalleryPhoto } from '@prisma/client';

type ImageGridProps = {
  photos: GalleryPhoto[];
};

const ImageGrid = ({ photos }: ImageGridProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto>();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handlePhotoClick = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
    setIsDialogOpen(true);
  };

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
    <>
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
                  className='rounded-md object-cover mb-4 hover:cursor-pointer'
                  onClick={() => handlePhotoClick(img)}
                  priority
                />
              </motion.div>
            );
          })}
        </motion.div>
      </Container>

      {selectedPhoto && (
        <GalleryDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          photo={selectedPhoto}
        />
      )}
    </>
  );
};

export default ImageGrid;
