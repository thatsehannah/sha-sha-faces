import React from 'react';
import Container from '../global/Container';
import Logo from './components/Logo';
import Links from './components/Links';
import { Button } from '../ui/button';

const Navbar = () => {
  return (
    <nav className='border-b-2'>
      <Container className='flex justify-between items-center py-4'>
        <Logo />
        <Links />
        <Button>Book Now</Button>
      </Container>
    </nav>
  );
};

export default Navbar;
