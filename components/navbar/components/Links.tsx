import Container from '@/components/global/Container';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Links = () => {
  return (
    <Container className='flex justify-evenly gap-4'>
      <Button
        variant='ghost'
        asChild
      >
        <Link
          href='/about'
          className='text-lg'
        >
          About
        </Link>
      </Button>
      <Button
        variant='ghost'
        asChild
      >
        <Link
          href='/portfolio'
          className='text-lg'
        >
          Portfolio
        </Link>
      </Button>
      <Button
        variant='ghost'
        asChild
      >
        <Link
          href='/contact'
          className='text-lg'
        >
          Contact
        </Link>
      </Button>
    </Container>
  );
};

export default Links;
