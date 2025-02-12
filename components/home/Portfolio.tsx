import React from 'react';
import Container from '../global/Container';
import SectionTitle from '../global/SectionTitle';
import GalleryCarousel from './components/GalleryCarousel';
import { Button } from '../ui/button';
import Link from 'next/link';
import { fetchFeaturedPhotos } from '@/utils/actions';

const Portfolio = async () => {
  const featuredPhotos = await fetchFeaturedPhotos();

  return (
    <section
      id='portfolio'
      className='relative'
    >
      <SectionTitle
        title='portfolio'
        alignment='right'
      />
      <Container className='flex flex-col justify-center items-center py-24 gap-16'>
        <GalleryCarousel photos={featuredPhotos} />
        <Button
          asChild
          size='lg'
          className='bg-primary text-lg'
        >
          <Link href='/gallery'>View More of My Work</Link>
        </Button>
      </Container>
    </section>
  );
};

export default Portfolio;
