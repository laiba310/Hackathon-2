// NewArrivalsServer.tsx (Server Component)
import { client } from "@/sanity/lib/client";
import NewArrivalsPage from "./newArrival";
 // Import the Client Component

// This will be a Server Component that fetches data
export default async function NewArrivalsServer() {
  const NEW_ARRIVALS_QUERY = '*[_type == "product"] | order(_createdAt desc)[5...9]'; // Modify the query as needed

  // Fetching data from Sanity (this is an async operation)
  const products = await client.fetch(NEW_ARRIVALS_QUERY);

  // Return the Client Component and pass the products as props
  return <NewArrivalsPage products={products} />;
}
