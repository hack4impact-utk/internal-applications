'use client';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// props for the list
interface ListProps {
  text: string;
  icon?: React.ReactNode;
  route: string;
}

export default function NavigationDrawerItem({ icon, text, route }: ListProps) {
  const pathname = usePathname();
  return (
    <ListItemButton component={Link} href={route} selected={pathname === route}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primary={text}
        primaryTypographyProps={{ variant: 'body1' }}
      />
    </ListItemButton>
  );
}
