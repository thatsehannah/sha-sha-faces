import React from "react";
import Container from "../global/Container";
import PortfolioCarousel from "./components/PortfolioCarousel";
import { Button } from "../ui/button";
import Link from "next/link";
import { fetchFeaturedPhotos } from "@/utils/actions";
import { RightSectionTitle } from "../global/SectionTitles";

const Portfolio = async () => {
  const featuredPhotos = await fetchFeaturedPhotos();

  return (
    <section
      id='portfolio'
      className='relative'
    >
      <RightSectionTitle title='portfolio' />
      <Container className='flex flex-col justify-center items-center py-24 gap-16'>
        <PortfolioCarousel photos={featuredPhotos} />
        <Button
          asChild
          size='lg'
          className='bg-primary text-lg'
        >
          <Link href='/portfolio'>View More of My Work</Link>
        </Button>
      </Container>
    </section>
  );
};

export default Portfolio;
