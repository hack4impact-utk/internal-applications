import { getAllForms, getFormById } from '@/server/actions/forms';
import * as React from 'react';
import FormTabs from '@/components/FormTabs';

export default async function FormPage({
  params,
}: {
  params: { formId: string };
}) {
  const form = JSON.parse(JSON.stringify(await getFormById(params.formId)));

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
      <FormTabs form={form}></FormTabs>
    </div>
  );
}
