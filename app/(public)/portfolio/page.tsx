import PortfolioCard from "@/components/portfolio/PortfolioCard";
import Container from "@/components/global/Container";
import { LeftSectionTitle } from "@/components/global/SectionTitles";
import React from "react";

const PortfolioPage = () => {
  return (
    <div className='relative py-20'>
      <LeftSectionTitle title='portfolio' />
      <Container className='flex flex-col lg:flex-row gap-8'>
        <div className='lg:w-1/2'>
          <PortfolioCard title='glam' />
        </div>
        <div className='lg:w-1/2'>
          <PortfolioCard title='bridal' />
        </div>
      </Container>
    </div>
  );
};

export default PortfolioPage;
