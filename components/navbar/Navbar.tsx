import React from 'react';
import Logo from './components/Logo';
import Links from './components/Links';
import { Button } from '../ui/button';
import MobileLinks from './components/MobileLinks';
import Container from '../global/Container';

const Navbar = () => {
  return (
    <nav className='border-b-2 sticky top-0 z-10 w-full bg-white'>
      <Container className='flex flex-row justify-between items-center py-4'>
        <Logo />
        <Links />
        <Button className='hidden lg:block hover:bg-secondary'>Book Now</Button>
        <MobileLinks />
      </Container>
    </nav>
  );
};

export default Navbar;
