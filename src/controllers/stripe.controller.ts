import { Request, Response } from "express";
import { Stripe } from "stripe";
import { sendFacebookConversion } from '../services/meta.services'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-04-30.basil',
});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;


export const stripeWebhookController = async (request: Request, response: Response): Promise<void> => {
  try {

    console.log("stripeWebhookController Started:");
    const sig = request.headers['stripe-signature'];

    if (!sig) {
      response.status(400).send('Missing Stripe signature');
    }

    let event: Stripe.Event = {} as Stripe.Event;
    let session: Stripe.Checkout.Session | null = null;

    try {
      event = stripe.webhooks.constructEvent(request?.body, sig ?? "", endpointSecret);
    } catch (err:any) {
      console.log(`⚠️ Webhook signature verification failed.`, err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event?.type === 'checkout.session.completed') {
      session = event.data.object as Stripe.Checkout.Session;

      console.log('✅ Payment Completed!', JSON.stringify(session));
      console.log('Customer Email:', session.customer_email);
      console.log('Amount Paid:', session.amount_total);
      console.log('Currency:', session.currency);
      console.log('Payment Status:', session.payment_status);


      // Inside the webhook after payment is completed:
      await sendFacebookConversion(
        session.customer_email || '',     // fallback to empty string if null
        (session.amount_total || 0) / 100, // Stripe amount is in cents
        session.currency || 'usd'
      );

      // saveUserPurchase(session.customer_email, session.amount_total);
    }
    response.json({ received: true, response: JSON.stringify(session) });

  } catch (error) {
    console.log("Error in stripeWebhookController:", error);
    response.status(500).json({ error: 'Internal Server Error' });

  }
}