import React from 'react';
import Logo from './components/Logo';
import Links from './components/Links';
import { Button } from '../ui/button';
import MobileLinks from './components/MobileLinks';

const Navbar = () => {
  return (
    <nav className='border-b-2 sticky top-0 z-10 w-full bg-white'>
      <div className='flex flex-row lg:flex-col justify-between items-center py-4 mx-auto max-w-6xl px-8'>
        <Logo />
        <Links />
        <Button className='hidden lg:block hover:bg-secondary'>Book Now</Button>
        <MobileLinks />
      </div>
    </nav>
  );
};

export default Navbar;
