import PortfolioCard from '@/components/gallery/GalleryCard';
import Container from '@/components/global/Container';
import SectionTitle from '@/components/global/SectionTitle';
import React from 'react';

const GalleryPage = () => {
  return (
    <div className='relative py-20'>
      <SectionTitle
        title='gallery'
        alignment='left'
      />
      <Container className='flex flex-col lg:flex-row gap-8'>
        <div className='lg:w-1/2 lg:h-screen'>
          <PortfolioCard title='glam' />
        </div>
        <div className='lg:w-1/2 h-screen'>
          <PortfolioCard title='bridal' />
        </div>
      </Container>
    </div>
  );
};

export default GalleryPage;
