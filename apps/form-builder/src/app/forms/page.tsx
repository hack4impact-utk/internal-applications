import FormsTable from '@/components/FormsTable';
import { getAllForms } from '@/server/actions/forms';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link'; // Import the Link component from next/link

export default async function Forms() {
  const forms = JSON.parse(JSON.stringify(await getAllForms()));

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2">Forms</Typography>
        <Link href="/forms/create" passHref>
          {' '}
          <Button variant="contained" color="primary">
            New Form
          </Button>
        </Link>
      </Box>
      <Box minHeight={400} width={'80%'} pt={4}>
        <FormsTable forms={forms}></FormsTable>
      </Box>
    </Box>
  );
}
