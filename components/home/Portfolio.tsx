import React from 'react';
import Container from '../global/Container';
import SectionTitle from '../global/SectionTitle';
import PortfolioCard from './components/PortfolioCard';

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
      <Container className='grid grid-cols-1 lg:grid-cols-2 gap-12 py-24'>
        <PortfolioCard title='glam' />
        <PortfolioCard title='bridal' />
      </Container>
    </section>
  );
};

export default Portfolio;
