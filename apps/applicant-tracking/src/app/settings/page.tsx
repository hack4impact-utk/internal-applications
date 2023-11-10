import IntegrationCard from '@/components/IntegrationCard';
import { getCalendlyIntegration } from '@/server/actions/CalendlyIntegration';
import { Unstable_Grid2 as Grid2, Typography } from '@mui/material';

export default async function SettingsPage() {
  const integration = await getCalendlyIntegration();

  const status = integration?.status ?? 'disabled';

  return (
    <>
      <Grid2 container sx={{ display: 'flex' }}>
        <Grid2 xs={12}>
          <Typography variant="h4">Settings</Typography>
        </Grid2>
        <Grid2 xs={12}>
          <Typography variant="overline" color="text.secondary">
            Webhooks
          </Typography>
        </Grid2>
        <Grid2 xs={5}>
          <IntegrationCard name="Calendly" status={status} />
        </Grid2>
      </Grid2>
    </>
  );
}
