import { client } from "./client";


export const ShirtProducts = async () => {
  const query =  `
*[_type == "product" && category == "tshirt"] {
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
