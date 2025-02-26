'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const DarkModeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className='relative bg-primary'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className='absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
    </Button>
  );
};

export default DarkModeButton;
