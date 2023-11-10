import CalendlyIntegrationSchema from '@/server/models/CalendlyIntegration';
import CalendlyService from '@/server/services/calendly';

export async function getCalendlyIntegration() {
  const data = await CalendlyIntegrationSchema.find({});

  if (data.length === 0) {
    return null;
  }

  const integration = data[0];
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  if (integration.updatedAt < weekAgo) {
    const webhook = await CalendlyService.get_webhook_subscription(
      integration.webhookUri
    );
    if (!webhook || !webhook.uri || !webhook.state) {
      // throw calendly error
      return null;
    }

    integration.webhookUri = webhook.uri;
    integration.status = webhook.state;

    await integration.save();
  }

  return integration;
}

export async function replaceOrCreateCalendlyIntegration() {
  const data = await CalendlyIntegrationSchema.find({});

  // if no integration exists, create one
  if (data.length === 0) {
    // create webhook in calendly
    const webhook = await CalendlyService.create_webhook_subscription([
      'invitee.canceled',
      'invitee.created',
    ]);
    console.log(webhook);
    if (!webhook || !webhook.uri || !webhook.state) {
      // throw calendly error
      return null;
    }

    const integration = CalendlyIntegrationSchema.create({
      webhookUri: webhook.uri,
      status: webhook.state,
    });

    return integration;
  } else {
    const integration = data[0];
    const newWebhook = await CalendlyService.create_webhook_subscription([
      'invitee.canceled',
      'invitee.created',
    ]);
    if (!newWebhook || !newWebhook.uri || !newWebhook.state) {
      // throw calendly error
      return null;
    }

    integration.webhookUri = newWebhook.uri;
    integration.status = newWebhook.state;

    await integration.save();
  }
}
