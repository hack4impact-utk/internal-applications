import FormsTable from '@/components/FormsTable';
import { getAllForms } from '@/server/actions/forms';
import { Box, Typography, Button, Divider } from '@mui/material';
import Link from 'next/link';

export default async function Forms() {
  const forms = JSON.parse(JSON.stringify(await getAllForms()));

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={4}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        position="relative"
      >
        <Box position="absolute" left={10} top={-32.5} ml={2} mt={0}>
          <Box width={100} height={100} bgcolor="lightgray">
            {' '}
            {/* Placeholder for Image */}{' '}
          </Box>
        </Box>
        <Typography variant="h2" textAlign="center">
          Forms
        </Typography>
      </Box>
      <Divider
        sx={{ width: '100%', borderColor: 'lightgray', borderWidth: 2, my: 0 }}
      />
      <Box position="absolute" left={1000} top={170} ml={5} mt={-2}>
        <Box display="flex" justifyContent="flex-end" width="80%" pb={2}>
          <Link href="/forms/create" passHref>
            <Button
              variant="contained"
              color="primary"
              sx={{ whiteSpace: 'nowrap' }}
            >
              New Form
            </Button>
          </Link>
        </Box>
      </Box>{' '}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Box minHeight={400} width={800} pt={2}>
          <FormsTable forms={forms} />
        </Box>
      </Box>
    </Box>
  );
}
