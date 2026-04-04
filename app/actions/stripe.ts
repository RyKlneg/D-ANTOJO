'use server'

import { stripe } from '@/lib/stripe';

export async function createPaymentIntent(amount: number) {
  try {
    // Determine the amount in cents (Stripe uses cents)
    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'mxn',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        integration_check: 'dantojo_checkout',
      },
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    return { error: error.message };
  }
}
