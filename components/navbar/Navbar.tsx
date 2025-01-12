'use client';

import React from 'react';
import Logo from './components/Logo';
import Links from './components/Links';
import { Button } from '../ui/button';
import MobileLinks from './components/MobileLinks';
import Container from '../global/Container';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className='border-b-2 sticky top-0 z-10 w-full bg-background'>
      <Container className='flex flex-row justify-between items-center py-4'>
        <Logo />
        <Links />
        <Button
          className='relative bg-primary'
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          <Sun className='absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        </Button>
        <Button className='hidden lg:block bg-primary hover:bg-secondary'>
          Book Now
        </Button>
        <MobileLinks />
      </Container>
    </nav>
  );
};

export default Navbar;
