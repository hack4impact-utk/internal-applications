export class CalendlyApiService {
  constructor(public token: string) {
    this.token = token;
  }

  private fetch(endpoint: string) {
    return fetch(`https://api.calendly.com/${endpoint}`, {
      headers: {
        authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });
  }
}
