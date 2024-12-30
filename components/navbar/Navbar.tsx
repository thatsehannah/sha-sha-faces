import React from 'react';
import Container from '../global/Container';
import Logo from './components/Logo';
import Links from './components/Links';
import { Button } from '../ui/button';

const Navbar = () => {
  return (
    <nav className='border-b-2'>
      <Container className='flex flex-col sm:flex-row sm:justify-between sm:items-center py-4'>
        <Logo />
        <Links />
        <Button>Book Now</Button>
      </Container>
    </nav>
  );
};

export default Navbar;
