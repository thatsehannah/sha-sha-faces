import React from 'react';
import glamPhotos from '@/lib/glamPhotos.json';
import Image from 'next/image';
import Container from '@/components/global/Container';
import SectionTitle from '@/components/global/SectionTitle';

const GlamGallery = () => {
  return (
    <div className='relative py-20'>
      <SectionTitle
        title='glam photos'
        alignment='right'
      />
      <Container className='columns-2 lg:columns-5'>
        {glamPhotos.map((img, idx) => {
          return (
            <Image
              src={img.url}
              alt={img.alt}
              key={idx}
              width={500}
              height={500}
              sizes='100vw'
              className='rounded-md object-cover mb-4'
            />
          );
        })}
      </Container>
    </div>
  );
};

export default GlamGallery;
