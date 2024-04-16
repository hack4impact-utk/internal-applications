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
      <body style={{ padding: 0, margin: 0 }}>
        <Box
          component="section"
          className="layout"
          sx={{ display: 'flex', py: 0, px: 0 }}
        >
          <NavigationDrawer />
          <Box component="main" sx={{ flexGrow: 1 }}>
            {children}
          </Box>
        </Box>
      </body>
    </html>
  );
}
