import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductId = async (id: string) => {
  const PRODUCT_BY_ID_QUERY = defineQuery(
    '*[_type=="product" && _id == $id] | order(name asc) [0]'  // Ensure it returns a single product
  );

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_ID_QUERY,
      params: { id },
    });
    return product.data || null;  // Return null if no product is found
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;  // Return null in case of error
  }
};
