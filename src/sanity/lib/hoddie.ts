import { client } from "./client";


export const hoodie = async () => {
  const query =  `
*[_type == "product" && category == "hoodie"] {
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
