// Vercel Edge Function for GoHighLevel webhook integration
// Environment variable: GHL_FORM_WEBHOOK (set in Vercel dashboard, NOT in code)

export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.phone) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate TCPA consent
    if (!body.tcpaConsent) {
      return new Response(JSON.stringify({ error: 'TCPA consent required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get webhook URL from environment variable (set in Vercel dashboard)
    const webhookUrl = process.env.GHL_FORM_WEBHOOK;
    
    if (!webhookUrl) {
      console.error('GHL_FORM_WEBHOOK environment variable not configured');
      throw new Error('Webhook not configured');
    }

    // Get location and widget IDs from environment (set in Vercel dashboard)
    const locationId = process.env.GHL_LOCATION_ID || '';
    const widgetId = process.env.GHL_WIDGET_ID || '';

    // Submit to GoHighLevel webhook
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        email: body.email,
        address: body.address || '',
        serviceNeeded: body.serviceNeeded,
        preferredContact: body.preferredContact,
        message: body.message || '',
        tcpaConsent: body.tcpaConsent,
        consentTimestamp: new Date().toISOString(),
        source: 'Desert Cool Air Website',
        locationId,
        widgetId,
      }),
    });

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error('GHL webhook error:', errorText);
      throw new Error('Webhook submission failed');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Form submission error:', error);
    return new Response(JSON.stringify({ error: 'Submission failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
