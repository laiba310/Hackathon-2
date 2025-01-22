// sanity/lib/product/getNewArrival.ts
import { sanityFetch } from "../live";
import { defineQuery } from "next-sanity";

// This function will be used in a server-side context
export const getNewArrivals = async () => {
  // Sanity query to fetch the 4 latest products
  const NEW_ARRIVALS_QUERY = defineQuery('*[_type == "product"] | order(_createdAt desc)[0...4]');
  
  try {
    // Fetching the product data
    const product = await sanityFetch({
      query: NEW_ARRIVALS_QUERY, // Use the defined query
    });
    
    return product.data || []; // Return the fetched data
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    return []; // Return an empty array in case of an error
  }
};
