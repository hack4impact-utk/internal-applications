'use client';
import { urls } from '@/utils/constants';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';

interface IntegrationCardProps {
  name: string;
  status: string;
}

async function upsert(): Promise<boolean> {
  const response = await fetch(urls.api.upsertCalendlyIntegration, {
    method: 'POST',
  });

  if (response.status === 200) {
    return true;
  }
  return false;
}

export default function IntegrationCard({
  name,
  status,
}: IntegrationCardProps) {
  const theme = useTheme();

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography
          variant="overline"
          component="span"
          sx={{ ml: 1 }}
          color={
            status === 'active'
              ? theme.palette.success.light
              : theme.palette.error.light
          }
        >
          {status === 'active' ? 'Active' : 'Inactive'}
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }} />

        {status !== 'active' && (
          <Button size="small" variant="outlined" onClick={() => upsert()}>
            Fix it
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
