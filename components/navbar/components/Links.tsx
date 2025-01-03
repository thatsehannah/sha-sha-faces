'use client';

import React from 'react';
import Container from '@/components/global/Container';
import { links } from '@/lib/links';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LinkButton = ({ link }: { link: { label: string; path: string } }) => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <Button
      variant='ghost'
      asChild
      className={`${link.path === pathname && 'bg-secondary'} `}
    >
      <Link
        href={link.path}
        className={`text-lg capitalize hover:scale-105 hover:bg-muted transition-all`}
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
