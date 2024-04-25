import FormSettings from '@/components/FormSettings';
import UpsertForm from '@/components/UpsertForm/UpsertForm';
import { Box } from '@mui/material';

export default async function NewFormPage() {
  return (
    <Box>
      <FormSettings></FormSettings>
      <UpsertForm></UpsertForm>
    </Box>
  );
}
