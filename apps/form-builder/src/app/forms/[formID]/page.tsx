import { getFormById } from '@/server/actions/forms';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormTabs from '@/components/FormTabs';

export default async function FormPage({
  params,
}: {
  params: { formId: string };
}) {
  const form = await getFormById('656ea21e70fac31f8c4aab54');

  if (form === null) {
    return;
  }

  return (
    <div>
      {/* display properties of a form */}
      <p>Title: {form.title}</p>
      <p>Description: {form.description}</p>
      <p>Responder Type: {form.responderType}</p>
      <p>Anonymous: {form.isAnonymous.toLocaleString()}</p>
      <p>Created At: {form.createdAt.toLocaleString()}</p>
      <p>Updated At: {form.updatedAt.toLocaleString()}</p>
      {/* //added tabs and a button */}
      <FormTabs></FormTabs>
    </div>
  );
}
