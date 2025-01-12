'use client';

import { ThemeProvider } from '@/components/themeProvider';
import React, { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
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
