import PortfolioCard from "@/components/gallery/GalleryCard";
import Container from "@/components/global/Container";
import { LeftSectionTitle } from "@/components/global/SectionTitles";
import React from "react";

const GalleryPage = () => {
  return (
    <div className='relative py-20'>
      <LeftSectionTitle
        title='portfolio'
        textClasses='dark:text-tertiary'
        barClasses='dark:bg-tertiary'
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
