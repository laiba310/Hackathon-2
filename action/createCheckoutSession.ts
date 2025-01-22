export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  try {
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
      customerId = customer.data[0].id;
    }

    // Debug logs
    console.log("Vercel URL:", process.env.VERCEL_URL);
    console.log("Base URL:", process.env.NEXT_PUBLIC_BASE_URL);
    console.log("Metadata:", metadata);

    const successUrl = `${
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_BASE_URL
    }/success?session_id={CHECKOUT_SESSION_ID}&ordernumber=${metadata.orderNumber}`;

    // Debugging the successUrl
    console.log("Constructed Success URL:", successUrl);

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
          currency: "PKR", 
          unit_amount: Math.round(item.Product.price! * 100), 
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
        allowed_countries: ['PK', 'US'],
      },
      phone_number_collection: {
        enabled: true,
      },
    });

    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}
