// NewArrivalsServer.tsx (Server Component)
import { client } from "@/sanity/lib/client";
import NewSalePage from "./newSale";

 // Import the Client Component

// This will be a Server Component that fetches data
export default async function NewSaleServer() {
  const NEW_SALE_QUERY = '*[_type == "product"] | order(_createdAt desc)[10...14]'; // Modify the query as needed

  // Fetching data from Sanity (this is an async operation)
  const products = await client.fetch(NEW_SALE_QUERY);

  return <NewSalePage products={products} />;

}
