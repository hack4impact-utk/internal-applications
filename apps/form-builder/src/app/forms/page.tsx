import FormsTable from '@/components/FormsTable';
import { getAllForms } from '@/server/actions/forms';
import { Box, Typography } from '@mui/material';

export default async function Forms() {
  const forms = JSON.parse(JSON.stringify(await getAllForms()));

  return (
    <Box>
      <Typography variant="h2">Forms</Typography>
      <Box minHeight={400} width={'80%'} pt={4}>
        <FormsTable forms={forms}></FormsTable>
      </Box>
    </Box>
  );
}
