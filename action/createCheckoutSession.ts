import stripe from "@/lib/strip";
import { BasketItem } from "../store/store";
import { urlFor } from "@/sanity/lib/image";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
};

export type GroupedBasketItem = {
  Product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  try {
    // Check if any grouped items don't have a price
    const itemsWithoutPrice = items.filter((item) => !item.Product.price);

    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items do not have a price");
    }

    // Find the customer by email
    const customer = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;
    if (customer.data.length > 0) {
      customerId = customer.data[0].id; // Corrected variable name to fetch customer ID
    }

    const successUrl = `${
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_BASE_URL
    }/success?session_id={CHECKOUT_SESSION_ID}&ordernumber=${metadata.orderNumber}`;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always",
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: `${"https://" + (process.env.VERCEL_URL || process.env.NEXT_PUBLIC_BASE_URL)}/basket`,
      line_items: items.map((item) => ({
        price_data: {
          currency: "PKR", // Use PKR for Pakistani Rupees
          unit_amount: Math.round(item.Product.price! * 100), // Price in cents (multiply by 100 for PKR)
          product_data: {
            name: item.Product.name || "Unnamed Product",
            description: `Product ID: ${item.Product._id}`,
            metadata: {
              id: item.Product._id,
              images: item.Product.image ? urlFor(item.Product.image).url() : null,
            },
          },
        },
        quantity: item.quantity,
      })),
      shipping_address_collection: {
        allowed_countries: ['PK', 'US'], // Allowed countries for address collection
      },
      phone_number_collection: {
        enabled: true, // Enabling phone number collection
      },
    });

    // Return the session URL for redirection to the Stripe checkout page
    return session.url;
  } catch (error) {
    // Log the error and throw it for further handling
    console.error("Error creating checkout session:", error);
    throw error;
  }
}
