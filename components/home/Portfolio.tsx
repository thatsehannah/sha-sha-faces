import React from 'react';
import Container from '../global/Container';
import SectionTitle from '../global/SectionTitle';
import GalleryCarousel from './components/PortfolioCarousel';
import { Button } from '../ui/button';
import Link from 'next/link';
import photos from '@/lib/glamPhotos.json';

const Portfolio = () => {
  const featuredPhotos = photos.slice(0, 5);

  return (
    <section
      id='portfolio'
      className='relative'
    >
      <SectionTitle
        title='portfolio'
        alignment='right'
      />
      <Container className='flex flex-col justify-center items-center p-24 gap-16'>
        <GalleryCarousel photos={featuredPhotos} />
        <Button
          asChild
          size='lg'
        >
          <Link href='/gallery'>View More of My Work</Link>
        </Button>
      </Container>
    </section>
  );
};

export default Portfolio;
