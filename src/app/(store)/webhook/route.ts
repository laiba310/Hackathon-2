import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/lib/strip'; // Ensure the Stripe instance is imported correctly
import { BakendClient } from '@/sanity/lib/backendClient'; // Your backend client for Sanity

export async function POST(req: NextRequest) {
  // Get the raw body and signature header from the request
  const body = await req.text();  // Raw body
  const headerList = await headers();
  const sig = headerList.get('stripe-signature'); // Stripe signature header

  

  // Ensure the signature is present
  if (!sig) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET; // Retrieve the webhook secret from the environment

  // Ensure the webhook secret is present
  if (!webhookSecret) {
    console.error("Stripe webhook secret is not set");
    return NextResponse.json(
      { error: 'Stripe webhook secret is not set' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    // Verify the event signature
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: `Webhook Error: ${err}` },
      { status: 400 }
    );
  }

  // Handle the event based on its type
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      // Create an order in Sanity based on the session
      const order = await createOrderInSanity(session);
      console.log('Order Created in Sanity:', order);
    } catch (err) {
      console.error('Error creating order:', err);
      return NextResponse.json(
        { error: 'Error creating order' },
        { status: 400 }
      );
    }
  }

  return NextResponse.json({ received: true });
}

// Function to create an order in Sanity
async function createOrderInSanity(session: Stripe.Checkout.Session) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    customer,
    total_details,
  } = session;

  const { orderNumber, customerName, customerEmail, clerkUserId } = metadata as { orderNumber: string; customerName: string; customerEmail: string; clerkUserId: string };

  // Get line items for the session, including product details
  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, {
    expand: ['data.price.product'],
  });

  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: 'reference',
      _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    quantity: item.quantity || 0,
  }));

  // Create the order in Sanity
  const order = await BakendClient.create({
    _type: 'order',
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePaymentIntentId: payment_intent,
    customerName,
    stripeCustomerId: customer,
    clerkUserId,
    email: customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: 'paid',
    orderDate: new Date().toISOString(),
  });

  return order;
}
