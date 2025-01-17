'use client';

import { ThemeProvider } from '@/components/themeProvider';
import { Toaster } from '@/components/ui/toaster';
import React, { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      <Toaster />
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
        themes={['light', 'dark']}
      >
        {children}
      </ThemeProvider>
    </>
  );
};

export default Providers;
