import Container from '@/components/global/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const LinkButton = ({ page }: { page: string }) => {
  return (
    <Button
      variant='ghost'
      asChild
      className='hover:bg-secondary'
    >
      <Link
        href={`/#${page}`}
        className='text-lg capitalize'
      >
        {page}
      </Link>
    </Button>
  );
};

const Links = () => {
  return (
    <Container className='flex justify-evenly gap-2 lg:gap-4'>
      <LinkButton page='about' />
      <LinkButton page='portfolio' />
      <LinkButton page='testimonials' />
      <LinkButton page='contact' />
      <LinkButton page='services' />
    </Container>
  );
};

export default Links;
