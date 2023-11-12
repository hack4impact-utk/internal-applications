import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Link from 'next/link';

// Not using usePathname(), waiting to add icon
interface ListProps {
   text: string;
   route: string;
}

export default function NavigationDrawerItem({ text, route }: ListProps) {
   return (
      <ListItemButton 
         component={Link} 
         href={route} 
      >
         <ListItemText
           primary={text}
           primaryTypographyProps={{ variant: 'body1' }}
         /> 
      </ListItemButton>
   );
}
