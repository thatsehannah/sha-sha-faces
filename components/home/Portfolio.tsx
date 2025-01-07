import React from 'react';
import Container from '../global/Container';
import SectionTitle from '../global/SectionTitle';
import GalleryCarousel from './components/PortfolioCarousel';
import { Button } from '../ui/button';
import Link from 'next/link';

const featuredPhotos = [
  {
    url: '/images/photo0.jpeg',
    alt: 'glam photo 1',
  },
  {
    url: '/images/photo1.jpeg',
    alt: 'glam photo 2',
  },
  {
    url: '/images/photo2.jpeg',
    alt: 'glam photo 3',
  },
  {
    url: '/images/photo3.jpeg',
    alt: 'glam photo 4',
  },
  {
    url: '/images/photo4.jpeg',
    alt: 'glam photo 5',
  },
];

const Portfolio = () => {
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
