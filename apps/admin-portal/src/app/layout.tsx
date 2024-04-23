'use client';

import React from 'react';
import NavigationDrawer from '@/components/NavigationDrawer';
import HeaderBar from '@/components/Appbar';

export const metadata = {
  title: 'General Layout',
  description: 'Layout for entire Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavigationDrawer />
        <HeaderBar />
        {children}
      </body>
    </html>
  );
}
