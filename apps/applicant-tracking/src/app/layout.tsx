import NavigationDrawer from '@/components/NavigationDrawer';
import { Box } from '@mui/material';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Box component="section" sx={{ display: 'flex' }}>
          <NavigationDrawer />
          <Box component="main" sx={{ flexGrow: 1 }}>
            {children}
          </Box>
        </Box>
      </body>
    </html>
  );
}
