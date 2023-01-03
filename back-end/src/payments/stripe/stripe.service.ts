import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-08-01',
    });
  }

  checkout() {
    return this.stripe.paymentIntents.create({
      amount: 10000, // cents
      currency: 'usd', // set currency
      payment_method_types: ['card'],
    });
  }
}
