import React from 'react';
import Container from '@/components/global/Container';
import { links } from '@/utils/links';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const LinkButton = ({ link }: { link: { label: string; path: string } }) => {
  return (
    <Button
      variant='ghost'
      asChild
    >
      <Link
        href={link.path}
        className='text-lg capitalize hover:scale-105 hover:bg-primary transition-all'
      >
        {link.label}
      </Link>
    </Button>
  );
};

const Links = () => {
  return (
    <Container className='hidden lg:flex items-start gap-1 lg:gap-4'>
      {links.map((link, idx) => (
        <LinkButton
          key={idx}
          link={link}
        />
      ))}
    </Container>
  );
};

export default Links;
