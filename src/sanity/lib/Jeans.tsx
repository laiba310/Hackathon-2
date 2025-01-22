import { client } from "./client";


export const Jeans = async () => {
  const query =  `
*[_type == "product" && category == "jeans"] {
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
