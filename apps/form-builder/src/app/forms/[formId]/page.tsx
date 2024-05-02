import { getFormById } from '@/server/actions/forms';
import * as React from 'react';
import FormTabs from '@/components/FormTabs';
import { Typography } from '@mui/material';
export default async function FormPage({
  params,
}: {
  params: { formId: string };
}) {
  const form = JSON.parse(JSON.stringify(await getFormById(params.formId)));

  if (form === null) {
    return;
  }

  const updatedAtDate: Date = new Date(form.updatedAt);
  const createdAtDate: Date = new Date(form.createdAt);

  return (
    <div>
      {/* display properties of a form */}
      <Typography sx={{ pt: 2 }}>Title: {form.title}</Typography>
      <Typography sx={{ pt: 2 }}>Description: {form.description}</Typography>
      <Typography sx={{ pt: 2 }}>
        Responder Type: {form.responderType}
      </Typography>
      <Typography sx={{ pt: 2 }}>
        Anonymous: {form.isAnonymous.toLocaleString()}
      </Typography>
      <Typography sx={{ pt: 2 }}>
        Created At: {createdAtDate.toLocaleString()}
      </Typography>
      <Typography sx={{ pt: 2 }}>
        Updated At: {updatedAtDate.toLocaleString()}
      </Typography>
      {/* //added tabs and a button */}
      <FormTabs form={form}></FormTabs>
    </div>
  );
}
