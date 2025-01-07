import Image from 'next/image';
import React from 'react';
import Container from '../global/Container';

type ImageGridProps = {
  photos: {
    url: string;
    alt: string;
  }[];
};

const ImageGrid = ({ photos }: ImageGridProps) => {
  return (
    <Container className='columns-2 lg:columns-5'>
      {photos.map((img, idx) => {
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
  );
};

export default ImageGrid;
