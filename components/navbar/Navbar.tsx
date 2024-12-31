import React from 'react';
import Logo from './components/Logo';
import Links from './components/Links';
import { Button } from '../ui/button';

const Navbar = () => {
  return (
    <nav className='border-b-2'>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 mx-auto max-w-6xl px-8'>
        <Logo />
        <Links />
        <Button className='hover:bg-secondary'>Book Now</Button>
      </div>
    </nav>
  );
};

export default Navbar;
