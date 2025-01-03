import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import logo from '../../../public/logo/logo-color-2.svg';
import Image from 'next/image';

const Logo = () => {
  return (
    <Button
      size='lg'
      asChild
      variant='link'
    >
      <Link href='/'>
        <Image
          priority
          src={logo}
          alt='logo'
          width={64}
          height={64}
        />
      </Link>
    </Button>
  );
};

export default Logo;
