import { client } from "./client";


export const fetchShirtProducts = async () => {
  const query =  `
  *[_type == "product" && category == "shirt"] {
    _id,
    name,
    price,
    description,
    image {
      asset-> {
        url
      }
    }
  }
`;
  return await client.fetch(query);
};
