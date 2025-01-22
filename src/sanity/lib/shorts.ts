import { client } from "./client";


export const shorts = async () => {
  const query =  `
*[_type == "product" && category == "short"] {
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
