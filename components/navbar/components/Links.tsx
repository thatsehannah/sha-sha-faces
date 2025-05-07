import React from "react";
import Container from "@/components/global/Container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LinkButton = ({ link }: { link: { label: string; path: string } }) => {
  return (
    <Button
      variant='ghost'
      asChild
    >
      <Link
        href={link.path}
        className='lg:text-xl md:text-lg capitalize hover:scale-105 hover:bg-primary hover:text-primary-foreground transition-all'
      >
        {link.label}
      </Link>
    </Button>
  );
};

type LinksProps = {
  links: {
    label: string;
    path: string;
  }[];
};

const Links = ({ links }: LinksProps) => {
  return (
    <Container className='hidden md:flex gap-1 lg:gap-4'>
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
