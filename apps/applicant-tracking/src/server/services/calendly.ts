type WebhookEvent = 'invitee.created' | 'invitee.canceled';

class CalendlyApiService {
  constructor(private readonly token: string) {
    this.token = token;
  }

  async create_webhook_subscription(events: WebhookEvent[]) {
    console.log({
      url: `${process.env.APP_URL}/api/calendly/webhook`,
      events,
      user: process.env.CALENDLY_USER_URI,
      scope: 'user',
    });
    const response = await this.post('webhook_subscriptions', {
      url: `${process.env.APP_URL}/api/calendly/webhook`,
      events,
      user: process.env.CALENDLY_USER_URI,
      organization: process.env.CALENDLY_ORG_URI,
      scope: 'user',
    });
    const data = await response.json();
    return data;
  }

  async get_webhook_subscription(uri: string) {
    const response = await this.get(`webhook_subscriptions/${uri}`);
    const data = await response.json();
    return data;
  }

  private fetch(endpoint: string, options?: RequestInit) {
    return fetch(`https://api.calendly.com/${endpoint}`, {
      headers: {
        authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      ...options,
    });
  }

  private get(endpoint: string) {
    return this.fetch(endpoint);
  }

  private post(endpoint: string, body: any) {
    return this.fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
}

const CalendlyService = new CalendlyApiService(process.env.CALENDLY_PAT);

export default CalendlyService;
