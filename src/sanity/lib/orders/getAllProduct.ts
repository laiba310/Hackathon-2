import { sanityFetch } from "../live";

export function getMyOrders() {
  return sanityFetch({
    query: `
      *[_type == "order"] | order(orderDate desc)
    `,
    params: {}, // No parameters needed
  })
    .then((orders) => {
      console.log("Sanity Fetch Response:", orders); // Debugging response
      return orders || []; // Return orders or an empty array
    })
    .catch((error) => {
      console.error("Error fetching orders:", error);
      throw new Error("Error fetching orders");
    });
}
